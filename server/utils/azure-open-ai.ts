import { Configuration, OpenAIApi } from "azure-openai";

export const initializeOpenAi = () => {
  const { AZURE_API_KEY } = useRuntimeConfig()
  
  const configuration = new Configuration({
    apiKey: AZURE_API_KEY,
    azure: {
      apiKey: AZURE_API_KEY,
      endpoint: "https://hakatonopenai.openai.azure.com/"
    }
  });
  
  const openai = new OpenAIApi(configuration);
  const model = 'CumulusPK_Test_GPT35'

  return {
    openai,
    model
  }
}