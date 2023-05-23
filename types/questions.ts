export const QUESTIONS = {
  REST_VS_SOAP: 'REST_VS_SOAP',
  SQL_INJECTION: 'SQL_INJECTION',
  DATABASE_INDEXING: 'DATABASE_INDEXING',
  ORM_BENEFITS: 'ORM_BENEFITS',
  DATABASE_PERFORMANCE_OPTIMIZATION: 'DATABASE_PERFORMANCE_OPTIMIZATION'
}

const questionsModel = {
  [QUESTIONS.REST_VS_SOAP]: {
    text: 'Jaka jest różnica między REST a SOAP?',
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
    text: 'Jakich technik można użyć do optymalizacji wydajności bazy danych?'
  },
}

export const questionOptions = () => {
  return Object.entries(questionsModel)
    .map(([id, { text }]) => ({ id, text }))
}

