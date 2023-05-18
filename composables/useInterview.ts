import type { ApiMessage, AsyncState } from "@/types/api";

export const useInterview = () => {
  const state = ref<AsyncState>(null)
  const result = ref()
  const response = computed(() => result.value)

  async function interviewJsonGenerator(file: string){
    try {
      state.value = 'loading'
      const data = await $fetch('/api/interview', {
        method: "POST",
        body: {
          file
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
    interviewJsonGenerator,
    state,
    response
  }
}
