import  createAgent  from '.'

export const generateAnswersAgent = createAgent((context) => {
  return {
    messages: [
      {
        role: "system",
        content: `I WILL SEND YOU A QUESTION. THE ANSWER MUST BE ${context.answerLevel}. THE ANSWER SHOULD BE IN POLISH.`,
      },
      {
        role: "user",
        content: context.question
      }
    ],
    max_tokens: 1000,
  }
})
