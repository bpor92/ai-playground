<template>
  <div :class="classes">

    <div v-if="user?.avatar" class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img :src="user.avatar" />
      </div>
    </div>
    <div class="chat-header">
      {{ user?.name }}
      <time class="text-xs opacity-50">{{ useTimeAgo(createdAt).value}}</time>
    </div>
    <div class="chat-bubble"><slot /></div>
  </div>
</template>

<script setup lang="ts">
import { User } from '~~/types/chat'
type Mode = 'start' | 'end';

const props = defineProps({ 
  mode: {
    type: String as PropType<Mode>,
    default: 'button',
    validator: (prop: Mode) => ['start', 'end'].includes(prop)
  },
  user: {
    type: Object as PropType<User | null>,
    default: () => ({})
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const classes = computed(() => {
  return [
    'chat',
    props.mode === 'end' ? 'chat-end' : 'chat-start'
  ]
})
</script>
