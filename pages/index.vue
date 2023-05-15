<template>
  <div>
    <form>
      <UiElSelect 
        v-model="locale"
        :label="$t('lang')"
        :options="[{ label: 'pl', value: 'pl'}, {value: 'en', label: 'en'}]"
      />
    </form>
  </div>
</template>

<script setup>
const { locale } = useI18n()
</script>

