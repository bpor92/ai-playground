export const QUESTIONS = {
  REST_VS_SOAP: 'REST_vs_SOAP',
  SQL_INJECTION: 'SQL_Injection',
  DATABASE_INDEXING: 'DATABASE_INDEXING',
  ORM_BENEFITS: 'ORM_BENEFITS',
  DATABASE_PERFORMANCE_OPTIMIZATION: 'DATABASE_PERFORMANCE_OPTIMIZATION',
  SESSIONS_VS_COOKIES: 'SESSIONS_VS_COOKIES',
  CACHING_MECHANISM: 'CACHING_MECHANISM',
  LOAD_BALANCING: 'LOAD_BALANCING',
  SERVER_SECURITY: 'SERVER_SECURITY',
  HTTP_PROTOCOL: 'HTTP_PROTOCOL',
}

const questionsModel = {
  [QUESTIONS.REST_VS_SOAP]: {
    text: 'What is the difference between REST and SOAP?'
  },
  [QUESTIONS.SQL_INJECTION]: {
    text: 'What is SQL Injection and how can it be prevented?'
  },
  [QUESTIONS.DATABASE_INDEXING]: {
    text: 'What are the advantages and disadvantages of database indexing?'
  },
  [QUESTIONS.ORM_BENEFITS]: {
    text: 'What is ORM (Object-Relational Mapping) and what are its benefits?'
  },
  [QUESTIONS.DATABASE_PERFORMANCE_OPTIMIZATION]: {
    text: 'What techniques can be used to optimize database performance?'
  },
  [QUESTIONS.SESSIONS_VS_COOKIES]: {
    text: 'What are the differences between sessions and cookies?'
  },
  [QUESTIONS.CACHING_MECHANISM]: {
    text: 'How does caching mechanism work and what are its advantages?'
  },
  [QUESTIONS.LOAD_BALANCING]: {
    text: 'What is load balancing and how does it impact application scalability?'
  },
  [QUESTIONS.SERVER_SECURITY]: {
    text: 'What are the basic security measures that should be implemented on a server?'
  },
  [QUESTIONS.HTTP_PROTOCOL]: {
    text: 'How does the HTTP protocol work and what are the differences between GET and POST methods?'
  }
}

export const questionOptions = () => {
  return Object.entries(questionsModel)
    .map(([id, { text }]) => ({ id, text }))
}
