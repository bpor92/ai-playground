import { Configuration, OpenAIApi } from "openai";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { OPENAI_API_KEY } = useRuntimeConfig()

  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: body.messages || [],
      temperature: body.temperature || 1,
      // ...customerSupportAgent(body),
    });
  
    return completion.data;
  } catch (error) {
    return (error as Error).message
  }
})
