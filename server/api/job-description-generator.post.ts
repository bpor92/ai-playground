import { jobDescriptionAgent } from "~/agents/jobDescriptionAgent";
import { initializeOpenAi } from "../utils/open-ai";
import { openAiResponseHandler } from "../utils/open-ai-response-handler";

const { openai } = initializeOpenAi()

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
      model: "gpt-3.5-turbo",
      messages: [],
      temperature: 1,
      ...jobDescriptionAgent(body)
    });
  
    return openAiResponseHandler(completion.data)
  } catch (error) {
    return (error as Error).message
  }
})
