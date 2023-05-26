<template>
  <ThemeSwitcher />

  <UiSwap v-model="swap" label="perdasdasd">
    <IconsMoon />
    <IconsSun />
  </UiSwap>
  <br>

  <UiAlert>
    Info - default
    <template #actions>
      <button class="btn btn-sm">
        See
      </button>
    </template>
  </UiAlert>
  <br>

  <UiAlert mode="info">
    info
  </UiAlert>
  <br>

  <UiAlert mode="success">
    success
  </UiAlert>
  <br>

  <UiAlert mode="warning">
    warning
  </UiAlert>
  <br>

  <UiAlert mode="error">
    error
  </UiAlert>

  <br>
  <br>

  <UiSteps :current-step="step" :items="items" @click="value => step = value" />

  <br>
  <br>

  <pre>{{ tab }}</pre>

  <UiTabs :active-item="tab" :items="items" @click="value => tab = value" />

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

const items = [{ title: 'First', id: 'FIRST' }, { title: 'Second', id: 'SECOND' }, { title: 'Third', id: 'THIRD' }, { title: 'Four', id: 'FOUR' }]

const step = ref<Number>(3)

const tab = ref<string>('FIRST')

</script>
