import { CreateChatCompletionResponse } from 'openai'

export const openAiResponseHandler = (data: CreateChatCompletionResponse) => {
  if (!data.choices || !data.usage) {
    return {
      data: null,
      id: null,
      error: 'Invalid AI response'
    }
  }

  return {
    id: data.id,
    data: data.choices[0].message?.content || '',
    error: null
  }
}
