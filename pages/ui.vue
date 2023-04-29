<template>
  <ThemeSwitcher/>

  <UiSwap label="perdasdasd" v-model="swap">
    <IconsMoon/>
    <IconsSun />
  </UiSwap>
</template>

<script setup lang="ts">
const swap = ref(false)
</script>
