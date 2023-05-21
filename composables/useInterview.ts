import type { ApiMessage, AsyncState } from "@/types/api";

interface InterviewJsonGenerator {
  file: string,
  candidate: string
}

export const useInterview = () => {
  const state = ref<AsyncState>(null)
  const result = ref()
  const response = computed(() => result.value)

  const interviewJsonGenerator = async (payload: InterviewJsonGenerator) => {
    try {
      state.value = 'loading'
      const data = await $fetch('/api/interview', {
        method: "POST",
        body: {
          file: payload.file,
          candidate: payload.candidate
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

  const rateState = ref<AsyncState>(null)
  const rateResult = ref()
  const rateLoading = computed(() => rateState.value === 'loading')
  const rateInterview = async (payload: any) => {
    try {
      rateState.value = 'loading'
      const data = await $fetch('/api/rate-interview', {
        method: "POST",
        body: {
          answer: payload.answer,
          question: payload.question,
          position: payload.position,
          level: payload.level,
        },
      })
      rateState.value = 'complete'
      rateResult.value = data
      return rateResult.value
    } catch (error: any) {
      rateState.value = 'error'
      throw error.data.message
    }
  }

  return {
    interviewJsonGenerator,
    rateInterview,
    state,
    response,
    rateLoading,
    rateResult
  }
}
