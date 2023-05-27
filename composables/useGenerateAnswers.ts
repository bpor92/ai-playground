import { AiResponse } from '~/server/utils/open-ai-response-handler'

interface GenerateAnswer {
  answerLevel: string,
  question: string
}

export const useGenerateAnswers = () => {
  const generateAnswer = (payload: GenerateAnswer): Promise<AiResponse> => {
    return new Promise((resolve, reject) =>
      $fetch('/api/generate-answers', {
        method: 'POST',
        body: {
          answerLevel: payload.answerLevel,
          question: payload.question
        }
      })
        .then(res => resolve(res as AiResponse))
        .catch(err => reject(err.data.message))
    )
  }

  return {
    generateAnswer
  }
}
