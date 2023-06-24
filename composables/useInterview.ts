import { 
  interviewService,
  interviewMlService,
  interviewRate,
  interviewSummary,
  interviewQuestion,
  interviewAnswers 
  } from '../services/interview-service'

export type ResponseML = {
  id: string,
  answer: string,
  question: string
}

export const useInterview = () => {
  return {
    ...interviewService
  }
}

export const useInterviewMl = () => {
  return {
    ...interviewMlService
  }
}

export const useInterviewRate = () => {
  return {
    ...interviewRate
  }
}

export const useInterviewSummary = () => {
  return {
    ...interviewSummary
  }
}

export const useInterviewQuestion = () => {
  return {
    ...interviewQuestion
  }
}

export const useInterviewAnswers = () => {
  return {
    ...interviewAnswers
  }
}