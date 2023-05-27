import { CreateChatCompletionResponse } from 'openai'

export interface AiResponse {
  data: null | string,
  id: null | string,
  error: null | string
}

export const openAiResponseHandler = (data: CreateChatCompletionResponse): AiResponse => {
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
