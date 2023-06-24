import { nanoid } from 'nanoid'

export const interviewService = useCustomFetch('/api/interview', { method: 'POST' }, { globalError: true, globalLoader: true })
export const interviewMlService = useCustomFetch('/api/interview-ml', { method: 'POST' }, { globalError: true, globalLoader: true })
export const interviewRate = useCustomFetch('/api/rate-interview', { method: 'POST' }, { globalError: true, cache: false })
export const interviewSummary = useCustomFetch('/api/summary-interview', { method: 'POST' }, { globalError: true, globalLoader: true })
export const interviewQuestion = useCustomFetch('/api/question-generator', { method: 'POST' }, { globalError: true })
export const interviewAnswers = useCustomFetch('/api/generate-answers', { method: 'POST' }, { globalError: true })
