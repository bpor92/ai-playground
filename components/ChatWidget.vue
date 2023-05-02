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
import { nanoid } from "nanoid"
import { Message, User } from '~~/types/chat'

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

const mockMesssages = [
  {
    id: nanoid(),
    userId: 'user',
    createdAt: new Date(),
    text: '12345'
  },
  {
    id: nanoid(),
    userId: 'user',
    createdAt: new Date(),
    text: '1234'
  },
  {
    id: nanoid(),
    userId: 'user',
    createdAt: new Date(),
    text: '1234'
  },
  {
    id: nanoid(),
    userId: 'user',
    createdAt: new Date(),
    text: '1234'
  },
  {
    id: nanoid(),
    userId: 'user',
    createdAt: new Date(),
    text: '1234'
  },
  {
    id: nanoid(),
    userId: 'user',
    createdAt: new Date(),
    text: '1234'
  },
  {
    id: nanoid(),
    userId: 'user',
    createdAt: new Date(),
    text: '1234'
  },
  {
    id: nanoid(),
    userId: 'user',
    createdAt: new Date(),
    text: '1234'
  },
  {
    id: nanoid(),
    userId: 'user',
    createdAt: new Date(),
    text: '1234'
  },
  {
    id: nanoid(),
    userId: 'system',
    createdAt: new Date(),
    text: '1234'
  },
  {
    id: nanoid(),
    userId: 'system',
    createdAt: new Date(),
    text: '1234'
  },
  {
    id: nanoid(),
    userId: 'system',
    createdAt: new Date(),
    text: '1234'
  },
  {
    id: nanoid(),
    userId: 'system',
    createdAt: new Date(),
    text: '1234'
  },
  {
    id: nanoid(),
    userId: 'system',
    createdAt: new Date(),
    text: '1234'
  },
  {
    id: nanoid(),
    userId: 'user',
    createdAt: new Date(),
    text: '1234'
  },
  {
    id: nanoid(),
    userId: 'user',
    createdAt: new Date(),
    text: '1234'
  },
  {
    id: nanoid(),
    userId: 'user',
    createdAt: new Date(),
    text: '1234'
  }, {
    id: nanoid(),
    userId: 'user',
    createdAt: new Date(),
    text: '1234'
  }
]

const users = computed(() => [user.value, bot.value])

const { chat } = useChatGpt()

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

async function onSendMessage(message: Message) {
  typings.value.push(bot.value)
  messages.value.push(message)

  try {
    const response = await chat(messagesToApi.value)
    typings.value = []
    if (!response.choices[0].message?.content) return

    const msg = {
      id: response.id,
      userId: bot.value.id,
      createdAt: new Date(),
      text: response.choices[0].message?.content,
    }

    messages.value.push(msg)
  } catch (error) {
    console.log(error)
  }
}
</script>
