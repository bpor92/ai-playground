<template>
  <button class="btn" :class="classes" :disabled="disabled"><slot/></button>
</template>

<script setup lang="ts">
import { Mode } from "~/types/button";

interface Props {
  mode?: Mode,
  disabled?: boolean
}

const props = defineProps<Props>()

const classes = computed(() => {
  return {
    [`btn-${props.mode}`]: props.mode
  }
})

</script>
