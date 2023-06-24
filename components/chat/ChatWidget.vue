<template>
  <ChatBox
    :current-user="user"
    :messages="messages"
    :users-typings="typings"
    :users="users"
    @new-message="onSendMessage"
  />
</template>

<script setup lang="ts">
import { Message, User } from '~~/types/chat'
import { AiResponse } from "~/server/utils/open-ai-response-handler";

const user = ref<User>({
  id: 'user',
  name: 'Ja',
  avatar: ''
})

const bot = ref<User>({
  id: 'system',
  name: 'ChatGPT',
  avatar: ''
})

const users = computed(() => [user.value, bot.value])

const messagesToApi = computed(() =>
  messages.value
    .map(item => ({
      role: item.userId,
      content: item.text
    }))
    .splice(-2)
)

const messages = ref<Message[]>([])
const typings = ref<User[]>([])

const { request } = useChat()
const onSendMessage = async (message: Message) => {
  typings.value.push(bot.value)
  messages.value.push(message)
  const response = await request<AiResponse>({ body: { messages: messagesToApi.value } })

  typings.value = []
  if(response.data.value?.data) { 
    const msg: Message = {
      id: response.data.value?.id,
      userId: bot.value.id,
      createdAt: new Date(),
      text: response.data.value?.data
    }
    messages.value.push(msg)
  }
}
</script>
