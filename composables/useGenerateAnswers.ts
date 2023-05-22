import type { AsyncState } from "@/types/api";

interface GenerateAnswer {
  answerLevel: string,
  question: string
}

export const useGenerateAnswers = () => {
  const state = ref<AsyncState>(null)
  const result = ref({})
  const response = computed(() => result.value)
  const loader = computed(() => state.value === 'loading')

  const generateAnswer = async (payload: GenerateAnswer) => {
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
    } catch (error: any) {
      state.value = 'error'
      throw error.data.message
    }
  }

  return {
    generateAnswer,
    response,
    state,
    loader
  }
}
