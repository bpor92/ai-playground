<template>
  <div class="form-control mb-2 p-2">
    <label class="flex items-center cursor-pointer">
      <input 
        :checked="isChecked" 
        :value="value"
        @change="onChange"
        type="radio" 
        :name="name" 
        class="radio" 
      />
      <span class="ml-3 label-text">{{ label }}</span> 
    </label>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  value: string,
  modelValue: string,
  name: string,
  label: string
}>();

const emit = defineEmits(['change', 'update:modelValue'])

const onChange = (event: Event) => {
  const target = event.target as HTMLButtonElement;
  emit('update:modelValue', target.value)
}

const isChecked = computed(() => props.value === props.modelValue)
</script>
