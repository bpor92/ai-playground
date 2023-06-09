import { initOpenAi } from '../utils/initialize-open-ai'
import { openAiResponseHandler } from '../utils/open-ai-response-handler'

const { openai, model } = initOpenAi()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const completion = await openai.createChatCompletion({
      model,
      messages: body.messages || [],
      temperature: body.temperature || 1
    })

    return openAiResponseHandler(completion.data)
  } catch (error) {
    return (error as Error).message
  }
})
