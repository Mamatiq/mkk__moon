import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { INote } from '~/types';

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<INote[]>([]);

  const saveToStorage = () => {
    if (import.meta.client) {
      localStorage.setItem('notes_app_data', JSON.stringify(notes.value));
    }
  };

  const loadNotes = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('notes_app_data');
      if (saved) {
        try {
          notes.value = JSON.parse(saved);
        } catch (e) {
          console.error('Ошибка парсинга заметок', e);
          notes.value = [];
        }
      }
    }
  };

  const addNote = (note: INote) => {
    notes.value.push(JSON.parse(JSON.stringify(note)));
    saveToStorage();
  };

  const updateNote = (updatedNote: INote) => {
    const index = notes.value.findIndex(n => n.id === updatedNote.id);
    if (index !== -1) {
      notes.value[index] = JSON.parse(JSON.stringify(updatedNote));
      saveToStorage();
    }
  };

  const deleteNote = (id: string) => {
    notes.value = notes.value.filter(n => n.id !== id);
    saveToStorage();
  };

  const getNoteById = (id: string) => {
    return notes.value.find(n => n.id === id);
  };

  return {
    notes,
    loadNotes,
    addNote,
    updateNote,
    deleteNote,
    getNoteById
  };
});