<template>
  <div>
    <VToast
      horizontal="right"
      vertical="top"
    >
      <VAlert
        v-for="item in toastList"
        :key="item.id"
        :mode="item.mode"
      >
        <div>{{ item.title }}</div>
        <div>{{ item.content }}</div>
      </VAlert>
    </VToast>
  </div>
</template>

<script setup lang="ts">
const { toastList } = useToast()
</script>
