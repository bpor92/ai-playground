import  createAgent  from '.'

export const preparePositionAgent = createAgent((context) => {
  return {
    messages: [
      {
        role: "system",
        content:
          "YOU ARE A HUMAN RESOURCES SPECIALIST, YOU HELP CREATE JOB DESCRIPTIONS BASED ON THE TASKS THEY PERFORM. YOUR ANSWERS MUST BE IN POLISH!",
      },
      {
        role: "user",
        content: `CREATE A 10 TASKS FOR ${context.position} WORK. ONLY POINTS`
      }
    ],
    max_tokens: 1000,
  }
})