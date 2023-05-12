<template>
  <ThemeSwitcher/>

  <UiSwap label="perdasdasd" v-model="swap">
    <IconsMoon/>
    <IconsSun />
  </UiSwap>
  <br>

  <UiAlert>
    Info - default
    <template #actions>
      <button class="btn btn-sm">See</button>
    </template>
  </UiAlert>
  <br>

  <UiAlert mode="info">info</UiAlert>
  <br>

  <UiAlert mode="success">success</UiAlert>
  <br>

  <UiAlert mode="warning">warning</UiAlert>
  <br>

  <UiAlert mode="error">error</UiAlert>

  <br />

  <span @click="addToast">
    Add Toast
  </span>

</template>

<script setup lang="ts">
const { add } = useToast()
const swap = ref(false)

const addToast = () => {
  add({
    id: Math.random().toString(),
    title: Math.random().toString(),
    content: Math.random().toString(),
    mode: 'success'
  })
}
</script>
