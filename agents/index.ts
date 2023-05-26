import { CreateChatCompletionRequest } from 'openai'

const createAgent = (agent: (context: Record<string, any>) => Partial<CreateChatCompletionRequest>) => agent

export default createAgent
