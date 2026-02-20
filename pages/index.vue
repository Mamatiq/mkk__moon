<template>
  <div class="page-home container">
    <header class="page-header">
      <h1>Мои заметки</h1>
      <AppButton @click="navigateTo('/edit/new')">
        + Создать заметку
      </AppButton>
    </header>

    <div v-if="notesStore.notes.length > 0" class="notes-grid">
      <NoteCard 
        v-for="note in notesStore.notes" 
        :key="note.id" 
        :note="note"
        @edit="(id:string) => navigateTo(`/edit/${id}`)"
        @delete="openDeleteModal"
      />
    </div>

    <div v-else class="empty-state">
      <p>Заметок пока нет. Создайте первую!</p>
    </div>

    <AppModal
      :show="isOpen"
      :title="confirmOptions.title"
      confirm-variant="danger"
      confirm-text="Удалить"
      @close="cancel"
      @confirm="confirm"
    >
      {{ confirmOptions.message }}
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useNotesStore } from '~/stores/useNotesStore';
import { useConfirm } from '~/composables/useConfirm';
import NoteCard from '~/components/notes/NoteCard.vue';
import AppButton from '~/components/ui/AppButton.vue';
import AppModal from '~/components/ui/AppModal.vue';

const notesStore = useNotesStore();
const { notes } = storeToRefs(notesStore);

const { isOpen, confirmOptions, ask, confirm, cancel } = useConfirm();

onMounted(() => {
  notesStore.loadNotes();
});

const openDeleteModal = (id: string) => {
  ask({
    title: 'Удаление заметки',
    message: 'Вы уверены, что хотите удалить эту заметку? Это действие нельзя отменить.',
    onConfirm: () => notesStore.deleteNote(id),
    variant: 'danger'
  });
};
</script>

<style lang="scss" scoped>
.page-home { padding: 40px 20px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
.notes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
.empty-state { text-align: center; padding: 100px 0; color: #94a3b8; font-size: 1.2rem; }
</style>
