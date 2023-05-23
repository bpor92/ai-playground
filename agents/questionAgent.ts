import  createAgent  from '.'

export const questionAgent = createAgent((context) => {
  return {
    messages: [
      {
        role: "system",
        content:
          `STWORZ PYTANIA REKRUTACYJNE NA STANOWISKO ${context.level} ${context.position}. PYTANIA MUSZA BYC ODPOWIENDNIE DO POZIOMU: ${context.level}.`,
      },
    ],
    max_tokens: 1000,
  }
})