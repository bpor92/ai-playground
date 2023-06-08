import { AiResponse } from '~/server/utils/open-ai-response-handler'

export const jobTasksService = useCustomFetch<AiResponse>('/api/prepare-position-tasks', { method: 'POST' })
