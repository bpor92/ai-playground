import { jobTasksService } from '../services/job-tasks-service'

const useJobTasks = () => {
  return {
    ...jobTasksService
  }
}

export default useJobTasks
