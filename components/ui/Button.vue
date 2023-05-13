<template>
  <button class="btn" ><slot/></button>
</template>

<script setup lang="ts">
import { Mode } from "~/types/button";

interface Props {
  mode?: Mode
}

const props = defineProps<Props>()
</script>
