import { jobDescriptionService } from '../services/job-description-service'

const useJobDescription = () => {
  return {
    ...jobDescriptionService
  }
}

export default useJobDescription
