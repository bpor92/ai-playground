<template>
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">{{ label }}</span>
    </label>
    <input type="file" :value="modelValue" @input="onInput" class="file-input file-input-bordered w-full max-w-xs" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string,
  placeholder?: string,
  modelValue: File | null
}>()

const emit = defineEmits(['update:modelValue'])

const onInput = (event: Event) => {
  const target = event.target as HTMLButtonElement;
  emit('update:modelValue', target.value)
}
</script>