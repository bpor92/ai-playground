<template>
  <div>
    <UiSwap v-model="swap">
      <template v-slot:on>
        <IconsMoon />
      </template>
      <template v-slot:off>
        <IconsSun />
      </template>
    </UiSwap>

    <div class="max-w-full w-[900px] m-auto p-5">
      <ChatBox/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Theme } from '~~/types/theme'
const swap = ref(true)

watch(swap , (value: Boolean) => {
  const theme = value ? Theme.DARK : Theme.CUPCAKE 
  document.querySelector('html')!.setAttribute('data-theme', theme);
})

</script>



