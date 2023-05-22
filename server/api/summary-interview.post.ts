import { openAiResponseHandler } from "../utils/open-ai-response-handler";
import { summaryInterviewAgent } from '~/agents/interviewAgent'
import { initOpenAi } from '../utils/initialize-open-ai'

const { openai, model } = initOpenAi()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const completion = await openai.createChatCompletion({
      model,
      messages: [],
      temperature: 0,
      ...summaryInterviewAgent(body)
    });
    return openAiResponseHandler(completion.data);
  } catch (error) {
    return (error as Error).message
  }
})
