interface ConfirmOptions {
  title: string;
  message: string;
  onConfirm: () => void;
  variant?: 'primary' | 'danger';
}

export function useConfirm() {
  const isOpen = ref(false);
  const options = ref<ConfirmOptions>({
    title: '',
    message: '',
    onConfirm: () => {},
    variant: 'primary'
  });

  const ask = (config: ConfirmOptions) => {
    options.value = { 
      variant: 'primary', 
      ...config 
    };
    isOpen.value = true;
  };

  const confirm = () => {
    options.value.onConfirm();
    isOpen.value = false;
  };

  const cancel = () => {
    isOpen.value = false;
  };

  return {
    isOpen,
    confirmOptions: options,
    ask,
    confirm,
    cancel
  };
}