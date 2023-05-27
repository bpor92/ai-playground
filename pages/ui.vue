<template>
  <ThemeSwitcher />

  <VSwap v-model="swap" label="perdasdasd">
    <IconsMoon />
    <IconsSun />
  </VSwap>
  <br>

  <VAlert>
    Info - default
    <template #actions>
      <button class="btn btn-sm">
        See
      </button>
    </template>
  </VAlert>
  <br>

  <VAlert mode="info">
    info
  </VAlert>
  <br>

  <VAlert mode="success">
    success
  </VAlert>
  <br>

  <VAlert mode="warning">
    warning
  </VAlert>
  <br>

  <VAlert mode="error">
    error
  </VAlert>

  <br>
  <br>

  <VSteps :current-step="step" :items="items" @click="value => step = value" />

  <br>
  <br>

  <pre>{{ tab }}</pre>

  <VTabs :active-item="tab" :items="items" @click="value => tab = value" />

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
