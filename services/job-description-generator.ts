import { AiResponse } from '~/server/utils/open-ai-response-handler'

export const useGenerateJobDescriptionService = useCustomFetch<AiResponse>('/api/prepare-position-tasks')
