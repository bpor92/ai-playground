<template>
  <div>
    <label class="label">
      <span class="label-text">{{ label }}</span>
    </label>
    <el-input :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string,
  placeholder?: string,
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

</script>
