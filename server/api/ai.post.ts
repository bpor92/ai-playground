import { Configuration, OpenAIApi } from "openai";
import { twitterAgent } from "~/agents";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { OPENAI_API_KEY } = useRuntimeConfig()

  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  if (!body.url) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Need body url paramater',
    })
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: body.messages || [],
      temperature: body.temperature || 1,
      ...twitterAgent(body)
      // ...customerSupportAgent(body),
    });
  
    return completion.data;
  } catch (error) {
    return (error as Error).message
  }
})
