<template>
  <div>
    <UiToast
      horizontal="right"
      vertical="top"
    >
      <UiAlert
        v-for="item in toastList"
        :key="item.id"
        :mode="item.mode"
      >
        <div>{{ item.title }}</div>
        <div>{{ item.content }}</div>
      </UiAlert>
    </UiToast>
  </div>
</template>

<script setup lang="ts">
const { toastList } = useToast()
</script>
