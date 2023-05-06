import type { ApiMessage, AsyncState } from "@/types/api";

export const useChatGpt = () => {
  const state = ref<AsyncState>(null)
  const result = ref()
  const response = computed(() => result.value)

  async function chat(messages: ApiMessage[]){
    try {
      state.value = 'loading'
      const data = await $fetch('/api/ai', {
        method: "POST",
        body: {
          messages
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
    chat,
    response
  }
}
