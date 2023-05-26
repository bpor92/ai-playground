<template>
  <div
    class="alert shadow-lg"
    :class="classes"
  >
    <div>
      <component :is="alertIcon" />
      <slot />
    </div>
    <div class="flex-none">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import IconsInfo from '~~/components/icons/Info.vue'
import IconsSuccess from '~~/components/icons/Success.vue'
import IconsWarning from '~~/components/icons/Warning.vue'
import IconsError from '~~/components/icons/Error.vue'
import { type Mode } from '~~/types/alert'

interface Props {
  mode?: Mode
}

const props = defineProps<Props>()

const classes = computed(() => {
  return {
    [`alert-${props.mode}`]: props.mode
  }
})

const alertIcon = computed(() => {
  switch (props.mode) {
    case 'success':
      return IconsSuccess
    case 'warning':
      return IconsWarning
    case 'error':
      return IconsError
    default:
      return IconsInfo
  }
})
</script>
