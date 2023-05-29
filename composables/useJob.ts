import { generateJobDescriptionService } from '../services/job-description-generator'
import { AiResponse } from '~/server/utils/open-ai-response-handler'
import type { AsyncState } from '@/types/api'

export const useJob = () => {
  const generateState = reactive<{
    state: AsyncState,
    data: AiResponse,
    loader: boolean
  }>({
    state: null,
    data: { id: null, error: null, data: null },
    loader: false
  })
  const generateDescription = async (body: { position: string }) => {
    generateState.loader = true
    const { data, error } = await generateJobDescriptionService(body)
    if (data) { generateState.data = data }
    if (error) { generateState.error = error }
    generateState.loader = false
  }

  return {
    generateDescription,
    generateState
  }
}
