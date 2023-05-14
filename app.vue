<template>
  <div :style="elementThemeGlobalStyles">
    <Navbar/>
    <UiToastContainer />
  
    <div class="container mx-auto mt-10 p-5">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>

  </div>
</template>

<script setup lang="ts">
import { elementThemeGlobalStyles } from "./utils/element-theme-global-styles";
</script>
