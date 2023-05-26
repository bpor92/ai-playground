<template>
  <div>
    <UiRadio
      v-model="model"
      name="test"
      :value="Theme.DARK"
      label="dark"
    />
    <UiRadio
      v-model="model"
      name="test"
      :value="Theme.CUPCAKE"
      label="cupcake"
    />
    <UiRadio
      v-model="model"
      name="test"
      :value="Theme.AQUA"
      label="aqua"
    />
    <UiRadio
      v-model="model"
      name="test"
      :value="Theme.SYMFONIA"
      label="symfonia"
    />
  </div>
</template>

<script setup lang="ts">
import { Theme } from '~~/types/theme'

const model = ref('dark')

watch(model, (val) => {
  document.querySelector('html')!.setAttribute('data-theme', val)
})
</script>
