import { useGenerateJobDescriptionService } from '../services/job-description-generator'

export const useJob = () => {
  return {
    ...useGenerateJobDescriptionService
  }
}
