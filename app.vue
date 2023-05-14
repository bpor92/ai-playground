<template>
  <div :style="elementThemeGlobalStyles">
    <Navbar/>
    <UiToastContainer />
  
    <div class="md:container md:mx-auto mt-10">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>

  </div>
</template>

<script setup lang="ts">
import { elementThemeGlobalStyles } from "./utils/element-theme-global-styles";
</script>
