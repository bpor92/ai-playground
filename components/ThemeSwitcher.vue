<template>
  <div>
    <UiRadio 
      name="test"
      :value="Theme.DARK"
      label="dark"
      v-model="model"
    />
    <UiRadio 
      name="test"
      :value="Theme.CUPCAKE"
      label="cupcake"
      v-model="model"
    />
    <UiRadio 
      name="test"
      :value="Theme.AQUA"
      label="aqua"
      v-model="model"
    />
    <UiRadio 
      name="test"
      :value="Theme.SYMFONIA"
      label="symfonia"
      v-model="model"
    />


    
  </div>
</template>

<script setup lang="ts">
import { Theme } from '~~/types/theme'

const model = ref('dark')

watch(model , (val) => {
  document.querySelector('html')!.setAttribute('data-theme',val);
})
</script>
