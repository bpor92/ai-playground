import type { AsyncState } from '@/types/api'
import { QuestionGenerator } from '~/types/question-generator'

export const useQuestionGenerator = () => {
  const state = ref<AsyncState>(null)
  const result = ref()
  const response = computed(() => result.value)

  const api = async (payload: QuestionGenerator) => {
    try {
      state.value = 'loading'
      const data = await $fetch('/api/question-generator', {
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
