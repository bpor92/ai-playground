import { Configuration, OpenAIApi } from "azure-openai";

export const initializeAzureOpenAi = () => {
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
  // const model = 'gpt4deploy'

  return {
    openai,
    model
  }
}