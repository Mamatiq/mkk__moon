import { ref, computed, watch } from 'vue';
import type { INote } from '~/types';

export function useHistory(stateRef: Ref<INote | null>) {
  const history = ref<string[]>([]);
  const currentIndex = ref(-1);

  const commit = () => {
    if (!stateRef.value) return;
    const snapshot = JSON.stringify(stateRef.value);

    if (currentIndex.value >= 0 && history.value[currentIndex.value] === snapshot) return;

    if (currentIndex.value < history.value.length - 1) {
      history.value = history.value.slice(0, currentIndex.value + 1);
    }

    history.value.push(snapshot);
    currentIndex.value++;
  };

  const undo = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--;
      const snapshot = history.value[currentIndex.value];
      if (snapshot) stateRef.value = JSON.parse(snapshot);
    }
  };

  const redo = () => {
    if (currentIndex.value < history.value.length - 1) {
      currentIndex.value++;
      const snapshot = history.value[currentIndex.value];
      if (snapshot) stateRef.value = JSON.parse(snapshot);
    }
  };

  watch(stateRef, (newVal, oldVal) => {
    if (!oldVal && newVal && history.value.length === 0) {
      history.value.push(JSON.stringify(newVal));
      currentIndex.value = 0;
    }
  }, { immediate: true });

  return { 
    commit,
    undo, 
    redo, 
    canUndo: computed(() => currentIndex.value > 0), 
    canRedo: computed(() => currentIndex.value < history.value.length - 1) 
  };
}