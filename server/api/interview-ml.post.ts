import { initOpenAi } from '../utils/initialize-open-ai'
import { openAiResponseHandler } from "../utils/open-ai-response-handler";
import { interviewMlAgent } from '~/agents/interviewMlAgent'

const { openai, model } = initOpenAi()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const completion = await openai.createChatCompletion({
      model,
      messages: [],
      temperature: 0.2,
      ...interviewMlAgent(body)
    });

    return openAiResponseHandler(completion.data);
  } catch (error) {
    return (error as Error).message
  }
})
