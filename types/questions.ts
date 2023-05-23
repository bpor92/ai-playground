export const QUESTIONS = {
  REST_VS_SOAP: 'REST_VS_SOAP',
  SQL_INJECTION: 'SQL_INJECTION',
  DATABASE_INDEXING: 'DATABASE_INDEXING',
  ORM_BENEFITS: 'ORM_BENEFITS',
  DATABASE_PERFORMANCE_OPTIMIZATION: 'DATABASE_PERFORMANCE_OPTIMIZATION',
  SESSIONS_VS_COOKIES: 'SESSIONS_VS_COOKIES',
  CACHING_MECHANISM: 'CACHING_MECHANISM',
  LOAD_BALANCING: 'LOAD_BALANCING',
  SERVER_SECURITY: 'SERVER_SECURITY',
  HTTP_PROTOCOL: 'HTTP_PROTOCOL'
}

const questionsModel = {
  [QUESTIONS.REST_VS_SOAP]: {
    text: 'Jaka jest różnica między REST a SOAP',
  },
  [QUESTIONS.SQL_INJECTION]: {
    text: 'Co to jest SQL Injection i jak można temu zapobiec?'
  },
  [QUESTIONS.DATABASE_INDEXING]: {
    text: 'Jakie są zalety i wady indeksowania baz danych?'
  },
  [QUESTIONS.ORM_BENEFITS]: {
    text: 'Co to jest ORM (Object-Relational Mapping) i jakie są jego zalety?'
  },
  [QUESTIONS.DATABASE_PERFORMANCE_OPTIMIZATION]: {
    text: 'Co to jest ORM (Object-Relational Mapping) i jakie są jego zalety?'
  },
  [QUESTIONS.SESSIONS_VS_COOKIES]: {
    text: 'Jakie są różnice między sesjami a plikami cookie?'
  },
  [QUESTIONS.CACHING_MECHANISM]: {
    text: 'Jak działa mechanizm buforowania i jakie są jego zalety?'
  },
  [QUESTIONS.LOAD_BALANCING]: {
    text: 'Co to jest równoważenie obciążenia i jak wpływa na skalowalność aplikacji?'
  },
  [QUESTIONS.SERVER_SECURITY]: {
    text: 'Jakie podstawowe środki bezpieczeństwa należy wdrożyć na serwerze?'
  },
  [QUESTIONS.HTTP_PROTOCOL]: {
    text: 'Jak działa protokół HTTP i jakie są różnice między metodami GET i POST?'
  }
}

export const questionOptions = () => {
  return Object.entries(questionsModel)
    .map(([id, { text }]) => ({ id, text }))
}
