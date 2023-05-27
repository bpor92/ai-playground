<template>
  <div class="fixed bottom-2 right-2">
    <button v-if="!open" class="btn btn-md" @click="open = true">
      <IconsChat />
    </button>
    <div v-else class="card bg-base-300 w-[450px] rounded-lg">
      <header
        class="bg-base-200 overflow-hidden flex justify-end items-center p-4 rounded-tr-lg rounded-tl-lg"
      >
        <IconsClose class="cursor-pointer" @click="open = false" />
      </header>
      <div class="d-flex min-h-[100px]">
        <div ref="messageBox" class="pt-2 pb-2 max-h-[80vh] overflow-y-scroll">
          <div v-for="item in messages" :key="item.id">
            <VChatBubble
              :mode="messageMode(item)"
              :created-at="item.createdAt"
              :user="getUser(item.userId)"
            >
              <Markdown :source="item?.text" class="w-full break-words" />
            </VChatBubble>
          </div>
          <div v-for="userTyping in usersTypings" :key="userTyping.id">
            <VChatBubble mode="start">
              ...
            </VChatBubble>
          </div>
        </div>
        <footer class="relative bottom-0 left-0 right-0 p-2">
          <textarea
            placeholder="Ask question"
            type="text"
            class="textarea w-full"
            :value="message"
            @input="changeMessage"
            @keypress.prevent.enter="onSendMessage"
          />
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid'
import Markdown from 'vue3-markdown-it'
import { Message, User } from '~/types/chat'

const props = withDefaults(
  defineProps<{
    messages: Message[];
    users: User[];
    currentUser: User;
    usersTypings?: User[];
  }>(),
  {
    usersTypings: () => []
  }
)

const emit = defineEmits<{(e: 'newMessage', payload: Message): void}>()

const getUser = (id: string) => {
  const user = props.users.find(user => user.id === id)
  if (user) { return user }
  return null
}

const open = ref(false)

const message = ref('')
const changeMessage = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  message.value = target.value
}

const onSendMessage = () => {
  emit('newMessage', {
    userId: props.currentUser.id,
    id: nanoid(),
    createdAt: new Date(),
    text: message.value
  })
  message.value = ''
}

const messageMode = (message: Message) => {
  if (message.userId === props.currentUser.id) { return 'end' }
  return 'start'
}

const messageBox = ref()
watch(
  () => [open, props.messages],
  async () => {
    if (!open.value) { return }
    await nextTick()
    messageBox.value.scrollTop = messageBox.value.scrollHeight
  },
  {
    deep: true
  }
)
</script>
