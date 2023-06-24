import { chatService } from '../services/chat-service'

export const useChat = () => {
  return {
    ...chatService
  }
}
