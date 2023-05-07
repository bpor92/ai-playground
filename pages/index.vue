<template>

  <div>
   dasdasdasdas
   <span @click="addToast">
    Add Toast
  </span>
  </div>
</template>

<script setup lang="ts">
const { add } = useToast()

const addToast = () => {
  add({
    id: Math.random().toString(),
    title: Math.random().toString(),
    content: Math.random().toString(),
    mode: 'warning'
  })
}
</script>



