import  createAgent  from '.'

export const generateAnswersAgent = createAgent((context) => {
  return {
    messages: [
      {
        role: "system",
        content: `I WILL SEND YOU A QUESTION. YOUR ANSWER MUST BE ${context.answerLevel}.`,
      },
      {
        role: "user",
        content: context.question
      }
    ],
    max_tokens: 1000,
  }
})
