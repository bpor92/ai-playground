<template>
  <div>
    <!-- <div :style="elementThemeGlobalStyles"> -->
    <TheNavbar />
    <VToastContainer />

    <div class="container mx-auto mt-10 p-5">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line
import { elementThemeGlobalStyles } from './utils/element-theme-global-styles'
</script>
