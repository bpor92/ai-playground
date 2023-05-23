<template>
  <div>
    <UiForm  class="w-full  p-2 md:max-w-sm md:mx-auto">
      <UiElSelect 
        v-model="locale"
        label="'lang'"
        :options="[{ label: 'pl', value: 'pl'}, {value: 'en', label: 'en'}]"
      />
    </UiForm>
  </div>
</template>

<script setup>
const { locale } = useI18n()
</script>

