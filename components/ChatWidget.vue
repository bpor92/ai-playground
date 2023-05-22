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
import { nanoid } from "nanoid"

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
    .map((item) => ({
      role: item.userId,
      content: item.text,
    }))
    .splice(-2)
)

const messages = ref<Message[]>([])
const typings = ref<User[]>([])

const onSendMessage = async (message: Message) => {
  typings.value.push(bot.value)
  messages.value.push(message)
  try {
    const { chat } = useChatGpt()
    const { id, data, error } = await chat(messagesToApi.value)
    if(error) throw new Error(error);
    
    typings.value = []

    const msg = {
      id,
      userId: bot.value.id,
      createdAt: new Date(),
      text: data,
    }

    messages.value.push(msg)
  } catch (error) {
    typings.value = []
    const { add } = useToast()
    add({
      id: nanoid(),
      title: '',
      content: error as string,
      mode: 'error'
    })
  }
}
</script>
