<template>
  <div class="tabs">
    <a v-for="tab in props.items" :key="tab.id"
      class="tab tab-bordered" 
      :class="{'tab-active': isActive(tab.id)}"
      @click="emit('click', tab.id)"
    >
      {{ tab.title }}
    </a>
  </div>
</template>

<script setup lang="ts">
interface Tab {
  title: String,
  id: string
}

const props = defineProps<{
  items: Tab[],
  activeItem: string
}>()

const emit = defineEmits<{
  (e: "click", index: string): void;
}>()


const isActive = ((id: string) => {
  return props.activeItem === id
})

</script>