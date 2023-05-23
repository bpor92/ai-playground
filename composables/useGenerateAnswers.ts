interface GenerateAnswer {
  answerLevel: string,
  question: string
}

export const useGenerateAnswers = () => {
  const generateAnswer = async (payload: GenerateAnswer) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch('/api/generate-answers', {
          method: "POST",
          body: {
            answerLevel: payload.answerLevel,
            question: payload.question
          },
        })
        return resolve(data)

      } catch (error: any) {
        reject(error.data.message)
      }
    })
  }

  return {
    generateAnswer
  }
}
