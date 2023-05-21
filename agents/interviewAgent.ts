import  createAgent  from '.'

export const interviewAgent = createAgent((context) => {
  return {
    messages: [
      {
        role: "system",
        content:
          `Przesle ci tekst we formacie vtt. Stworz tablice ktora bedzie zawierala pytania rekrutera i odpowiedzi kandydata we formacie json. Kandydatem jest osoba ${context.candidate} Odpowiedz powinna byc tylko tekstem we formacie json, bez zbednych dodatkowych prefixow. Json nie powinien byc w markdown i zawierac dodatkowego formatowania ani białych znaków. nie powinien zawierac \r oraz \n. Zwrocony json powinnien byc juz sparsowany. ### Format { question: pytanie, answer: odpowiedz kandydata }`,
      },
      {
        role: "user",
        content: context.file
      }
    ],
    max_tokens: 2000,
  }
})

export const rateInterviewAgent = createAgent((context) => {
  return {
    messages: [
      {
        role: "system",
        content:
          `Przesle ci rozmowe rekrutacyjna na stanowisko ${context.level} ${context.position}. Rozmowa sklada sie z pytan i odpowiedzi. Ocen czy kandydat poprawnie odpowiedzial na zadane mu pytanie. Wez pod uwage poziom kandydata.`,
      },
      {
        role: "user",
        content: `Pytanie: ${context.question}. Odpowiedz: ${context.answer}`
      }
    ],
    max_tokens: 1000,
  }
})


