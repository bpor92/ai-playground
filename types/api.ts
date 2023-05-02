export type AsyncState = null | 'loading' | 'error' | 'complete'

export interface ApiMessage {
  role: string,
  content: string
}