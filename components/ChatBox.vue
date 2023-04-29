<template>
  <div class="fixed bottom-2 right-2">
    <button v-if="!open" @click="open = true" class="bg-white p-4 rounded cursor-pointer">
      <IconsChat />
    </button>
    <div v-else class="box bg-gray-300 dark:bg-gray-800 rounded w-[450px] overflow-hidden">
      <header class="h-10 bg-black overflow-hidden flex justify-end items-center p-4">
        <span @click="open = false" class="cursor-pointer">V</span>
      </header>
      <div class="block h-[250px]">
        sss
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
const open = ref(false)
</script>

<style scoped>

</style>