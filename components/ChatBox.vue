<template>
  <div class="fixed bottom-2 right-2">
    <button v-if="!open" @click="open = true" class="btn btn-md ">
      <IconsChat />
    </button>
    <div v-else class="card bg-base-300 w-[450px] rounded-lg">
      <header class="bg-base-200 overflow-hidden flex justify-end items-center p-4 rounded-tr-lg rounded-tl-lg">
        <IconsClose  @click="open = false" class="cursor-pointer" />
      </header>
      <div class="h-[250px]">
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