<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-container">
          <header class="modal-header">
            <h3>{{ title }}</h3>
            <button class="close-btn" @click="$emit('close')">&times;</button>
          </header>
          
          <section class="modal-body">
            <slot />
          </section>

          <footer class="modal-footer">
            <AppButton variant="secondary" @click="$emit('close')">
              {{ cancelText }}
            </AppButton>
            <AppButton :variant="confirmVariant" @click="$emit('confirm')">
              {{ confirmText }}
            </AppButton>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import AppButton from './AppButton.vue';

interface Props {
  show: boolean;
  title: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'danger';
}

withDefaults(defineProps<Props>(), {
  confirmText: 'Подтвердить',
  cancelText: 'Отмена',
  confirmVariant: 'primary'
});

defineEmits(['close', 'confirm']);
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-container {
  background: white;
  width: 90%;
  max-width: 450px;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  h3 { margin: 0; font-size: 1.25rem; }
  .close-btn { 
    background: none; border: none; font-size: 24px; cursor: pointer; color: #999;
    &:hover { color: #333; }
  }
}

.modal-body {
  margin-bottom: 24px;
  color: #666;
  line-height: 1.5;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>