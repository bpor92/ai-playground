import { jobDescriptionAgent } from "~/agents";
import { initializeOpenAi } from "../utils/openAi";

const { openai } = initializeOpenAi()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.position || !body.tasks) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Wrong body paramaters',
    })
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: body.messages || [],
      temperature: body.temperature || 1,
      ...jobDescriptionAgent(body)
    });
  
    return completion.data;
  } catch (error) {
    return (error as Error).message
  }
})
