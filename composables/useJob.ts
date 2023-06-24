import { jobTasksService, jobDescriptionService } from '../services/job-service'

export const useJobDescription = () => {
  return {
    ...jobDescriptionService
  }
}

export const useJobTasks = () => {
  return {
    ...jobTasksService
  }
}

