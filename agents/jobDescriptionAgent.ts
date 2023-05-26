import createAgent from '.'

export const jobDescriptionAgent = createAgent((context) => {
  const userContent = context.tasks
    ? `CREATE A JOB DESCRIPTION FOR ${context.position}. THE JOB DESCRIPTION SHOULD INCLUDE THE TASKS PERFORMED IN THIS POSITION, SUCH AS: ${context.tasks}.`
    : `CREATE A JOB DESCRIPTION FOR ${context.position}.`

  return {
    messages: [
      {
        role: 'system',
        content:
          'YOU ARE A HUMAN RESOURCES SPECIALIST, YOU HELP CREATE JOB DESCRIPTIONS BASED ON THE TASKS THEY PERFORM. YOUR ANSWERS MUST BE IN POLISH'
      },
      {
        role: 'user',
        content: userContent
      }
    ],
    max_tokens: 1000
  }
})
