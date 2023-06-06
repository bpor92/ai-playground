import { ApiService } from './api-service'
import { AiResponse } from '~/server/utils/open-ai-response-handler'

export const generateJobDescriptionService = async (body: { position: string }) => {
  return await useCustomFetch<AiResponse>('/api/prepare-position-tasks', { body }).post()
}

export const useGenerateJobDescriptionService = () => ApiService<AiResponse>('/api/prepare-position-tasks')
