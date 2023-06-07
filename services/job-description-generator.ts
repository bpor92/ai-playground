import { AiResponse } from '~/server/utils/open-ai-response-handler'

export const useGenerateJobDescriptionService = () => useService<AiResponse>('/api/prepare-position-tasks')
