<template>
  <div :class="classes">
    <div class="chat-bubble">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
type Mode = 'start' | 'end';

const props = defineProps({ 
  mode: {
    type: String as PropType<Mode>,
    default: 'button',
    validator: (prop: Mode) => ['start', 'end'].includes(prop)
  }
})

const classes = computed(() => {
  return [
    'chat',
    props.mode === 'end' ? 'chat-end' : 'chat-start'
  ]
})
</script>
