import  createAgent  from '.'

export const preparePositionAgent = createAgent((context) => {
  return {
    messages: [
      {
        role: "system",
        content:
          "You are a human resources specialist, you help create job descriptions based on the tasks they perform.",
      },
      {
        role: "user",
        content:  `Create a 10 tasks for ${context.position} work. Only points`
      }
    ],
    max_tokens: 1000,
  }
})