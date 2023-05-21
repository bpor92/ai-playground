<template>
  <el-rate
    :modelValue="modelValue"
    clearable
    @update:model-value="val => emit('update:modelValue', val)"
  />
</template>


<script setup lang="ts">
defineProps<{
  modelValue: number
}>()

const emit = defineEmits(['update:modelValue'])

</script>