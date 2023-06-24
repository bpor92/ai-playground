export const interviewService = useCustomFetch('/api/interview', { method: 'POST' }, { globalError: true, globalLoader: true })
export const interviewMlService = useCustomFetch('/api/interview-ml', { method: 'POST' }, { globalError: true, globalLoader: true })
export const interviewRate = useCustomFetch('/api/rate-interview', { method: 'POST' }, { globalError: true })
export const interviewSummary = useCustomFetch('/api/summary-interview', { method: 'POST' }, { globalError: true, globalLoader: true })

