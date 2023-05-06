import { CreateChatCompletionRequest } from "openai"

export * from "./twitterAgent"
 
export default function createAgent(
  agent: (context: Record<string, any>) => Partial<CreateChatCompletionRequest>
) {
  return agent;
}
