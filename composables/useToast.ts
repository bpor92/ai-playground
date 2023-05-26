import { Toast } from '~/types/toast'

const toasts = ref<Toast[]>([])

export const useToast = () => {
  const add = (item: Toast) => {
    toasts.value.push(item)
    setTimeout(() => {
      remove(item.id)
    }, 5000)
  }

  const remove = (id: string) => {
    toasts.value = toasts.value.filter(item => item.id !== id)
  }

  const toastList = computed(() => toasts.value)

  return {
    add,
    toastList
  }
}
