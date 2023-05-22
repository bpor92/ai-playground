// import { initializeOpenAi } from "../utils/open-ai";
import { openAiResponseHandler } from "../utils/open-ai-response-handler";
import { generateAnswersAgent } from '~/agents/generateAnswersAgent'
import { initializeOpenAi } from "../utils/azure-open-ai";

const { openai, model } = initializeOpenAi()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    console.log(body)
    const completion = await openai.createChatCompletion({
      model,
      messages: [],
      temperature: 0,
      ...generateAnswersAgent(body)
    });

    return openAiResponseHandler(completion.data);
  } catch (error) {
    return (error as Error).message
  }
})
