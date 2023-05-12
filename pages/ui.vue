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

  <br>
  <br>
  <UiSteps @click="value => step = value" :currentStep="step" :items="[{title: 'First'}, {title: 'Second'}, {title: 'Third'}, {title: 'Four'}]"/>

  <br>
  <br>

  <div @click="addToast">
    Add Toast
  </div>

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

const step = ref<Number>(3)
</script>
