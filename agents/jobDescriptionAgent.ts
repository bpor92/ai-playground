import  createAgent  from '.'

export const jobDescriptionAgent = createAgent((context) => {
  const userContent = context.tasks ?
    `Create a job description for ${context.position}. The job description should include the tasks performed in this position, such as: ${context.tasks}. Only points` :
    `Create a job description for ${context.position}. Only points`
  
  return {
    messages: [
      {
        role: "system",
        content:
          "You are a human resources specialist, you help create job descriptions based on the tasks they perform.",
      },
      {
        role: "user",
        content: userContent
      }
    ],
    max_tokens: 1000,
  }
})