<template>
  <div class="todo-item" :class="{ '--completed': modelValue.completed, '--readonly': readOnly }">
    <input 
      type="checkbox" 
      :checked="modelValue.completed" 
      :disabled="readOnly"
      @change="toggleItem"
    />
    
    <input 
      v-if="!readOnly"
      type="text" 
      :value="modelValue.text" 
      placeholder="Название задачи..."
      @input="updateText"
    />
    <span v-else>{{ modelValue.text }}</span>

    <button 
      v-if="!readOnly" 
      class="btn-remove" 
      @click="$emit('remove')"
      title="Удалить задачу"
    >
      &times;
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ITodo } from '~/types';

const props = defineProps<{
  modelValue: ITodo;
  readOnly?: boolean;
}>();

const emit = defineEmits(['update:modelValue', 'remove', 'change']);

const toggleItem = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const updated = { ...props.modelValue, completed: target.checked };
  emit('update:modelValue', updated);
  emit('change');
};

const updateText = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const updated = { ...props.modelValue, text: target.value };
  emit('update:modelValue', updated);
  emit('change');
};
</script>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;

  &.--completed span {
    text-decoration: line-through;
    color: #888;
  }

  input[type="text"] {
    flex: 1;
    border: none;
    border-bottom: 1px solid #ddd;
    padding: 4px;
    &:focus { outline: none; border-color: #42b883; }
  }

  .btn-remove {
    background: none;
    border: none;
    color: #ff4d4f;
    cursor: pointer;
    font-size: 20px;
    line-height: 1;
  }
}
</style>