import  createAgent  from '.'
import { QUESTIONS } from '~/types/questions'

export const interviewMlAgent = createAgent((context) => {
  return {
    messages: [
      {
        role: "system",
        content:
          `Przesle ci tekst we formacie vtt. Stworz tablice ktora bedzie zawierala pytania rekrutera i odpowiedzi kandydata we formacie json. Kandydatem jest osoba ${context.candidate} Odpowiedz powinna byc tylko tekstem we formacie json, bez zbednych dodatkowych prefixow. Json nie powinien byc w markdown i zawierac dodatkowego formatowania ani białych znaków. nie powinien zawierac \r oraz \n. Zwrocony json powinnien byc juz sparsowany. Dopasuj ENUM do pytania: ${Object.values(QUESTIONS).join(' ### ')}.  ### Format { id: dopasowany ENUM, question: pytanie, answer: odpowiedz kandydata }`,
      },
      {
        role: "user",
        content: context.file
      }
    ],
    max_tokens: 4000,
  }
})
Object.values(QUESTIONS).join(' ### ')