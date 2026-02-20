<template>
  <button 
    class="app-btn" 
    :class="[`--variant-${variant}`, { '--disabled': disabled }]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'danger' | 'secondary' | 'ghost';
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false
});

defineEmits(['click']);
</script>

<style lang="scss" scoped>
.app-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  font-size: 14px;

  &.--variant-primary {
    background-color: #42b883;
    color: white;
    &:hover:not(:disabled) { background-color: #3aa876; }
  }

  &.--variant-danger {
    background-color: #ff4d4f;
    color: white;
    &:hover:not(:disabled) { background-color: #ff7875; }
  }

  &.--variant-secondary {
    background-color: #f0f0f0;
    color: #333;
    &:hover:not(:disabled) { background-color: #e6e6e6; }
  }

  &.--variant-ghost {
    background: transparent;
    border: 1px solid #ddd;
    color: #666;
    &:hover:not(:disabled) { background: #f9f9f9; }
  }

  &.--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>