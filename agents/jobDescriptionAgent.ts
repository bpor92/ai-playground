import  createAgent  from '.'

export const jobDescriptionAgent = createAgent((context) => {
  let tasksPrompt = {}

  if(context.tasks) {
    tasksPrompt = {
      role: "user",
      content: `Create a job description for ${context.position}. The job description should include the tasks performed in this position, such as: ${context.tasks}`,
    }
  }else {
    tasksPrompt = {}
  }

  return {
    messages: [
      {
        role: "system",
        content:
          "You are a human resources specialist, you help create job descriptions based on the tasks they perform.",
      },
      tasksPrompt
    ],
    max_tokens: 1000,
  }
})