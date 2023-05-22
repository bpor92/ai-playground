import { Configuration, OpenAIApi } from "openai";

export const initializeOpenAi = () => {
  const { OPENAI_API_KEY } = useRuntimeConfig()

  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  
  const openai = new OpenAIApi(configuration);
  const model = 'gpt-3.5-turbo'

  return {
    openai,
    model
  }
}