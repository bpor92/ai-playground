<template>
  <ul class="steps lg:steps-horizontal">
    <li v-for="(step, index) in props.items" 
      class="step cursor-pointer" 
      :class="{'step-primary': isDone(index)}"
      @click="emit('click', index + 1)"
    >
      {{ step.title }}
    </li>
  </ul>
</template>

<script setup lang="ts">
interface Step {
  title: String
}

const props = defineProps<{
  items: Step[],
  currentStep: Number
}>()

const emit = defineEmits<{
  (e: "click", index: Number): void;
}>()


const isDone = ((index: Number) => {
  return props.currentStep > index
})

</script>