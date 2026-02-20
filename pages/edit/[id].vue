<template>
  <div class="page-edit container">
    <div v-if="localNote" class="editor-wrapper">
      
      <div class="toolbar">
        <AppButton variant="ghost" @click="handleCancel">← Назад</AppButton>
        <div class="history-controls">
          <AppButton 
            variant="ghost" 
            :disabled="!canUndo" 
            title="Ctrl+Z"
            @click="undo"
          >
            ↩
          </AppButton>
          <AppButton 
            variant="ghost" 
            :disabled="!canRedo" 
            title="Ctrl+Shift+Z"
            @click="redo"
          >
            ↪
          </AppButton>
        </div>
      </div>

      <TodoEditor 
        :title="localNote.title"
        :todos="localNote.todos"
        @update:title="val => localNote!.title = val"
        @update:todos="val => localNote!.todos = val"
        @change="commit"
      />

      <footer class="footer-actions">
        <AppButton variant="danger" @click="handleDelete">Удалить</AppButton>
        <div class="right">
          <AppButton variant="secondary" @click="handleCancel">Отмена</AppButton>
          <AppButton variant="primary" @click="saveNote">Сохранить</AppButton>
        </div>
      </footer>
    </div>

    <AppModal
      :show="isOpen"
      :title="confirmOptions.title"
      :confirm-variant="confirmOptions.variant"
      @close="cancel"
      @confirm="confirm"
    >
      {{ confirmOptions.message }}
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import type { INote } from '~/types';
import { useNotesStore } from '~/stores/useNotesStore';
import { useHistory } from '~/composables/useHistory';
import { useConfirm } from '~/composables/useConfirm';
import TodoEditor from '~/components/notes/TodoEditor.vue';
import AppButton from '~/components/ui/AppButton.vue';
import AppModal from '~/components/ui/AppModal.vue';

const route = useRoute();
const router = useRouter();
const notesStore = useNotesStore();
const { isOpen, confirmOptions, ask, confirm, cancel } = useConfirm();

const localNote = ref<INote | null>(null);

const { commit, undo, redo, canUndo, canRedo } = useHistory(localNote);

onMounted(() => {
  notesStore.loadNotes();
  const id = route.params.id as string;
  
  if (id === 'new') {
    localNote.value = { id: uuidv4(), title: '', todos: [] };
  } else {
    const existing = notesStore.getNoteById(id);
    if (existing) {
      localNote.value = JSON.parse(JSON.stringify(existing));
    } else {
      router.push('/');
    }
  }
});

const saveNote = () => {
  if (!localNote.value) return;
  if (route.params.id === 'new') {
    notesStore.addNote(localNote.value);
  } else {
    notesStore.updateNote(localNote.value);
  }
  router.push('/');
};

const handleCancel = () => {
  ask({
    title: 'Отмена',
    message: 'Выйти без сохранения?',
    onConfirm: () => router.push('/'),
    variant: 'primary'
  });
};

const handleDelete = () => {
  ask({
    title: 'Удалить?',
    message: 'Это действие необратимо.',
    variant: 'danger',
    onConfirm: () => {
      if (localNote.value) notesStore.deleteNote(localNote.value.id);
      router.push('/');
    }
  });
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.shiftKey && e.code === 'KeyZ') {
    e.preventDefault();
    redo();
  } else if (e.ctrlKey && e.code === 'KeyZ') {
    e.preventDefault();
    undo();
  }
};
onMounted(() => window.addEventListener('keydown', handleKeydown));
onUnmounted(() => window.removeEventListener('keydown', handleKeydown));
</script>

<style lang="scss" scoped>
.page-edit {
  padding: 20px 0 80px;
}
.toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.history-controls {
  display: flex;
  gap: 8px;
}
.footer-actions {
  position: fixed; bottom: 0; left: 0; width: 100%;
  background: white; padding: 15px 20px;
  display: flex; justify-content: space-between;
  border-top: 1px solid #eee;
  .right { display: flex; gap: 10px; }
}
</style>