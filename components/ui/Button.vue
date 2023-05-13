<template>
  <button class="btn" :class="classes"><slot/></button>
</template>

<script setup lang="ts">
import { Mode } from "~/types/button";

interface Props {
  mode?: Mode
}

const props = defineProps<Props>()

const classes = computed(() => {
  return {
    [`btn-${props.mode}`]: props.mode
  }
})

</script>
