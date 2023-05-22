import { Configuration, OpenAIApi } from "azure-openai";

export const initializeOpenAi = () => {
  const apiKey = "ea188ad92d2d42efb0189e0e8bd82389"
  const configuration = new Configuration({
    apiKey: apiKey,
    azure: {
      apiKey: apiKey,
      endpoint: "https://hakatonopenai.openai.azure.com/"
    }
  });
  
  const openai = new OpenAIApi(configuration);

  return {
    openai
  }
}