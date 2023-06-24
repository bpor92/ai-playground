export const jobDescriptionService = useCustomFetch('/api/job-description-generator', { method: 'POST' }, { globalError: true })
export const jobTasksService = useCustomFetch('/api/prepare-position-tasks', { method: 'POST' }, { globalError: true })
