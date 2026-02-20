<template>
  <div class="todo-editor">
    <div class="todo-editor__header">
      <AppInput
        :model-value="title"
        placeholder="Заголовок заметки"
        class="title-input"
        @update:model-value="onTitleChange"
      />
    </div>

    <div class="todo-editor__list">
      <TodoItem 
        v-for="(todo, index) in todos" 
        :key="todo.id"
        :model-value="todo"
        @update:model-value="(val) => updateTodo(index, val)"
        @remove="removeTodo(index)"
        @change="emitChange"
      />
    </div>

    <AppButton variant="secondary" @click="addTodo">
      + Добавить пункт
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import type { ITodo } from '~/types';
import TodoItem from './TodoItem.vue';
import AppButton from '~/components/ui/AppButton.vue';
import AppInput from '~/components/ui/AppInput.vue';

const props = defineProps<{
  title: string;
  todos: ITodo[];
}>();

const emit = defineEmits(['update:title', 'update:todos', 'change']);

const emitChange = () => {
  emit('change');
};

const onTitleChange = (val: string) => {
  emit('update:title', val);
  emitChange();
};

const updateTodo = (index: number, val: ITodo) => {
  const newTodos = [...props.todos];
  newTodos[index] = val;
  emit('update:todos', newTodos);
};

const addTodo = () => {
  const newTodo: ITodo = { id: uuidv4(), text: '', completed: false };
  emit('update:todos', [...props.todos, newTodo]);
  emitChange();
};

const removeTodo = (index: number) => {
  const newTodos = [...props.todos];
  newTodos.splice(index, 1);
  emit('update:todos', newTodos);
  emitChange();
};
</script>

<style lang="scss" scoped>
.todo-editor {
  .title-input {
    margin-bottom: 20px;
    :deep(.app-input__field) {
      font-size: 1.5rem;
      font-weight: bold;
      border: none;
      border-bottom: 2px solid #eee;
      border-radius: 0;
      padding-left: 0;
      &:focus { box-shadow: none; border-color: #42b883; }
    }
  }
}
</style>