import { openAiResponseHandler } from '../utils/open-ai-response-handler'
import { initOpenAi } from '../utils/initialize-open-ai'
import { rateInterviewAgent } from '~/agents/interviewAgent'

const { openai, model } = initOpenAi()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const completion = await openai.createChatCompletion({
      model,
      messages: [],
      temperature: 0,
      ...rateInterviewAgent(body)
    })

    return openAiResponseHandler(completion.data)
  } catch (error) {
    return (error as Error).message
  }
})
