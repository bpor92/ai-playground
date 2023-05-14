<script setup>
const { locale } = useI18n()
</script>

<template>
  <div>
    <form>
      <select v-model="locale">
        <option value="en">en</option>
        <option value="pl">pl</option>
      </select>
      <p>{{ $t('hello') }}</p>
    </form>
  </div>
</template>