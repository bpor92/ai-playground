import  createAgent  from '.'

export const interviewAgent = createAgent((context) => {
  return {
    messages: [
      {
        role: "system",
        content:
          "Przesle ci tekst we formacie vtt. Stworz tablice ktora bedzie zawierala pytania rekrutera i odpowiedzi kandydata we formacie json. Odpowiedz powinna byc tylko tekestem we formacie json, bez zbednych dodatkowych prefixow. Json nie powinien byc w markdown i zawierac dodatkowego formatowania",
      },
      {
        role: "user",
        content: context.file
      }
    ],
    max_tokens: 1000,
  }
})