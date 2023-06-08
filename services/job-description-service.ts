import { AiResponse } from '~/server/utils/open-ai-response-handler'

export const jobDescriptionService = useCustomFetch<AiResponse>('/api/job-description-generator', { method: 'POST' })
