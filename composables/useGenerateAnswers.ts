import type { AsyncState } from "@/types/api";

export const useGenerateAnswers = () => {
  const state = ref<AsyncState>(null)
  const result = ref()
  const response = computed(() => result.value)

  async function api(payload: any){
    try {
      state.value = 'loading'
      const data = await $fetch('/api/generate-answers', {
        method: "POST",
        body: {
          answerLevel: payload.answerLevel,
          question: payload.question
        },
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
