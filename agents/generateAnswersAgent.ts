import  createAgent  from '.'

export const generateAnswersAgent = createAgent((context) => {
  return {
    messages: [
      {
        role: "system",
        // content: `I WILL SEND YOU A QUESTION. YOUR ANSWER MUST BE ${context.answerLevel}. MAXIMUM ANSWER SENTENCE: 20`,
        content: `Przesle Ci pytania. Twoja odpowiedz musi byc na poziomie ${context.answerLevel}. Maksymalna ilosc zdan w Twojej odpowiedzi nie powinna przekraczac 20. Opdowiedz musi byc w jezyku polskim!`,
      },
      {
        role: "user",
        content: context.question
      }
    ],
    max_tokens: 1000,
  }
})
