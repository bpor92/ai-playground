import { preparePositionAgent } from "~/agents/preparePositionAgent";
// import { initializeOpenAi } from "../utils/open-ai";
import { openAiResponseHandler } from "../utils/open-ai-response-handler";
import { initializeOpenAi } from "../utils/azure-open-ai";

const { openai, model } = initializeOpenAi()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.position) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Wrong body paramaters',
    })
  }

  try {
    const completion = await openai.createChatCompletion({
      model,
      messages: [],
      temperature: 1,
      ...preparePositionAgent(body)
    });
  
    return openAiResponseHandler(completion.data)
  } catch (error) {
    return (error as Error).message
  }
})
