import { initializeOpenAi } from "../utils/open-ai";
import { openAiResponseHandler } from "../utils/open-ai-response-handler";

const { openai } = initializeOpenAi()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: body.messages || [],
      temperature: body.temperature || 1,
    });

    return openAiResponseHandler(completion.data);
  } catch (error) {
    return (error as Error).message
  }
})
