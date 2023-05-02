<template>
  <div class="fixed bottom-2 right-2">
    <button v-if="!open" @click="open = true" class="btn btn-md ">
      <IconsChat />
    </button>
    <div v-else class="card bg-base-300 w-[450px] rounded-lg">
      <header class="bg-base-200 overflow-hidden flex justify-end items-center p-4 rounded-tr-lg rounded-tl-lg">
        <IconsClose  @click="open = false" class="cursor-pointer" />
      </header>
      <div class="d-flex min-h-[100px]">
        <div  class="pt-2 pb-2 max-h-[80vh]">
          <div v-for="message in messages" :key="message.id">
            <UiChatBubble :mode="messageMode(message)">
              <Markdown :source="message?.text" class="w-full" />
            </UiChatBubble>
          </div>
          <div v-for="userTyping in usersTypings" :key="userTyping.id">
            <UiChatBubble mode="start">
              ...
            </UiChatBubble>
          </div>
        </div>
        <footer class="relative bottom-0 left-0 right-0 p-2">
          <textarea 
            type="text"
            :value="message"
            @input="changeMessage"
            @keypress.prevent.enter="
              $emit('newMessage', {
                userId: currentUser.id,
                id: nanoid(),
                createdAt: new Date(),
                text: ($event.target as HTMLTextAreaElement).value,
              });
              message = ''
            "
            class="textarea w-full"/>
        </footer>
      </div>   
    </div>
  </div>
</template>

<script setup lang="ts">
import { nanoid } from "nanoid"
import { Message, User } from "~/types/chat"
import Markdown from "vue3-markdown-it";

const props = withDefaults(
  defineProps<{
    messages: Message[],
    users: User[],
    currentUser: User
    usersTypings?: User[],
  }>(),
  {
    usersTypings: () => [],
  }
)

defineEmits<{
  (e: "newMessage", payload: Message): void;
}>()

function getUser(id: string) {
  return props.users.find((user) => user.id === id);
}

const open = ref(false)
const message = ref('')

const changeMessage = (event: Event) => {
  const target = event.target as HTMLButtonElement;
  message.value = target.value
}

const messageMode = (message: Message) => {
  if(message.userId === 'user') return 'end'
  return 'start'
}
</script>