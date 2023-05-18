<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text">{{ label }}</span>
    </label>
    <input type="text" :value="modelValue" @input="onInput" :placeholder="placeholder" class="input input-bordered w-full max-w-xs" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string,
  placeholder?: string,
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const onInput = (event: Event) => {
  const target = event.target as HTMLButtonElement;
  emit('update:modelValue', target.value)
}
</script>