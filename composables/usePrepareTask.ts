import type { AsyncState } from '@/types/api'

export const usePrepareTask = () => {
  const state = ref<AsyncState>(null)
  const result = ref()
  const response = computed(() => result.value)

  const api = async (payload: any) => {
    try {
      state.value = 'loading'
      const data = await $fetch('/api/prepare-position-tasks', {
        method: 'POST',
        body: payload
      })
      state.value = 'complete'
      result.value = data
      return result.value
    } catch (error: any) {
      state.value = 'error'
      throw error.data.message
    }
  }

  return {
    api,
    response,
    state
  }
}
