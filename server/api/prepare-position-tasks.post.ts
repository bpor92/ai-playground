import { preparePositionAgent } from "~/agents";
import { initializeOpenAi } from "../utils/openAi";

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
      ...preparePositionAgent(body)
    });
  
    return completion.data;
  } catch (error) {
    return (error as Error).message
  }
})
