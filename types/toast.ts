import { type Mode } from '~~/types/alert'

export interface Toast {
  id: string,
  title: string,
  content: string,
  mode: Mode
}
