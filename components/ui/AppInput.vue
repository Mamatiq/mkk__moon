<template>
  <div class="app-input" :class="{ '--has-error': !!error }">
    <label v-if="label" class="app-input__label">{{ label }}</label>
    
    <div class="app-input__wrapper">
      <input
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        class="app-input__field"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur')"
        @keyup.enter="$emit('enter')"
      />
    </div>

    <span v-if="error" class="app-input__error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number;
  label?: string;
  placeholder?: string;
  type?: string;
  error?: string;
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  label: ''
});

defineEmits(['update:modelValue', 'blur', 'enter']);
</script>

<style lang="scss" scoped>
.app-input {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  &__label {
    font-size: 14px;
    font-weight: 500;
    color: #4a5568;
  }

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__field {
    width: 100%;
    padding: 10px 14px;
    font-size: 16px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background-color: white;
    transition: all 0.2s ease;
    color: #2d3748;

    &::placeholder {
      color: #a0aec0;
    }

    &:focus {
      outline: none;
      border-color: #42b883;
      box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.1);
    }
  }

  &.--has-error {
    .app-input__field {
      border-color: #ff4d4f;
      &:focus {
        box-shadow: 0 0 0 3px rgba(255, 77, 79, 0.1);
      }
    }
  }

  &__error {
    font-size: 12px;
    color: #ff4d4f;
  }
}
</style>