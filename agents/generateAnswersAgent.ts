import  createAgent  from '.'

export const generateAnswersAgent = createAgent((context) => {


  return {
    messages: [
      {
        role: "system",
        content: `Przesle Ci pytanie. Odpowiedz musi byc ${context.answerLevel}. Odpowiedz powinna byc w jezyku polskim.`,
      },
      {
        role: "user",
        content: context.question
      }
    ],
    max_tokens: 1000,
  }
})