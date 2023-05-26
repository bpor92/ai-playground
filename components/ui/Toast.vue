<template>
  <div class="toast" :class="classes">
    <slot />
  </div>
</template>

<script setup lang="ts">
type HorizontalAlign = 'left' | 'center' | 'right'
type VerticalAlign = 'top' | 'middle' | 'bottom'

interface Props {
  horizontal?: HorizontalAlign,
  vertical?: VerticalAlign
}

const props = defineProps<Props>()

const classes = computed(() => {
  return {
    [`toast-${props.horizontal}`]: props.horizontal,
    [`toast-${props.vertical}`]: props.vertical
  }
})
</script>
