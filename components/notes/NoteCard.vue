<template>
  <div class="note-card">
    <h3 class="note-card__title">{{ note.title }}</h3>
    
    <div class="note-card__preview">
      <div 
        v-for="todo in previewTodos" 
        :key="todo.id" 
        class="preview-item"
      >
        <span class="dot"></span>
        <span class="text">{{ todo.text || 'Без названия' }}</span>
      </div>
      <div v-if="note.todos.length > 3" class="more-count">
        ... и еще {{ note.todos.length - 3 }}
      </div>
    </div>

    <div class="note-card__actions">
      <button class="btn-edit" @click="$emit('edit', note.id)">Редактировать</button>
      <button class="btn-delete" @click="$emit('delete', note.id)">Удалить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { INote } from '~/types';

const props = defineProps<{
  note: INote;
}>();

defineEmits(['edit', 'delete']);

const previewTodos = computed(() => props.note.todos.slice(0, 3));
</script>

<style lang="scss" scoped>
.note-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;

  &:hover { transform: translateY(-4px); }

  &__title { margin-bottom: 15px; font-size: 1.2rem; color: #2c3e50; }

  &__preview {
    flex: 1;
    margin-bottom: 20px;
    .preview-item {
      display: flex; align-items: center; gap: 8px; font-size: 0.9rem; color: #666; margin-bottom: 4px;
      .dot { width: 6px; height: 6px; background: #ddd; border-radius: 50%; }
      .text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    }
    .more-count { font-size: 0.8rem; color: #999; margin-top: 5px; }
  }

  &__actions {
    display: flex; gap: 10px;
    button { flex: 1; padding: 8px; border-radius: 6px; cursor: pointer; border: none; font-weight: 500; }
    .btn-edit { background: #e3f2fd; color: #1976d2; }
    .btn-delete { background: #fff1f0; color: #f5222d; }
  }
}
</style>