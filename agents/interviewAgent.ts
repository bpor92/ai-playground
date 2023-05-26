import createAgent from '.'

export const interviewAgent = createAgent((context) => {
  return {
    messages: [
      {
        role: 'system',
        content:
          `Przesle ci tekst we formacie vtt. Stworz tablice ktora bedzie zawierala pytania rekrutera i odpowiedzi kandydata we formacie json. Kandydatem jest osoba ${context.candidate} Odpowiedz powinna byc tylko tekstem we formacie json, bez zbednych dodatkowych prefixow. Json nie powinien byc w markdown i zawierac dodatkowego formatowania ani białych znaków. nie powinien zawierac \r oraz \n. Zwrocony json powinnien byc juz sparsowany. ### Format { question: pytanie, answer: odpowiedz kandydata }`
      },
      {
        role: 'user',
        content: context.file
      }
    ],
    max_tokens: 4000
  }
})

export const rateInterviewAgent = createAgent((context) => {
  return {
    messages: [
      {
        role: 'system',
        content:
          `Na podstawie wprowadzonego pytania, oceń krytycznie odpowiedz, badz wymagający. Jesli pytanie dotyczy doświadczenia - wymagaj opisu. Wez pod uwagę poziom odpowiedzi: ${context.level}. Odpowiedz we formacie JSON we formacie: { result, rate }, result - Twoja pisemna ocena kandydata, rate Twoja ocena od 0 do 5. Odpowiedz powinna byc tylko tekstem we formacie json, bez zbednych dodatkowych prefixow. JSON nie powinien byc w markdown i zawierac dodatkowego formatowania.`
        // `Przesle ci rozmowe rekrutacyjna na stanowisko ${context.level} ${context.position}. Rozmowa sklada sie z pytan i odpowiedzi. Ocen krytycznie czy kandydat poprawnie odpowiedzial na zadane mu pytanie. Przy ocenie kandydata wez pod uwage jego poziom ${context.level}. Odpowiedz we formacie JSON we formacie: { result, rate }, result - Twoja pisemna ocena kandydata, rate Twoja ocena od 0 do 5. Odpowiedz powinna byc tylko tekstem we formacie json, bez zbednych dodatkowych prefixow. JSON nie powinien byc w markdown i zawierac dodatkowego formatowania.`,
      },
      {
        role: 'user',
        content: `Pytanie: ${context.question}. Odpowiedz: ${context.answer}`
      }
    ],
    max_tokens: 1000
  }
})

export const summaryInterviewAgent = createAgent((context) => {
  const positiveFeedback = `Napisz w imieniu firmy pozytywny feedback na stanowisko ${context.level} ${context.position}. Kandydatem jest: ${context.candidate}. Zredaguj swoja wypowiedz na podstawie oceny rekrutera ${context.feedback}. Odpowiedz w jezyku polskim`
  const negativeFeedback = `Napisz w imieniu firmy negatywny feedback na stanowisko ${context.level} ${context.position}. Kandydatem jest: ${context.candidate}. Zachec do nauki i ponownej proby rekrutacji - do monitorowania naszych ofert pracy. Zredaguj swoja wypowiedz na podstawie oceny rekrutera ${context.feedback}. Odpowiedz w jezyku polskim`
  return {
    messages: [
      {
        role: 'system',
        content: context.positiveFeedback ? positiveFeedback : negativeFeedback
      }
    ],
    max_tokens: 1000
  }
})
