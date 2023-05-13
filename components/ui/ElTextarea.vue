<template>
  <div class="form-control">
    <label class="label" >{{ label }}:</label>
    <el-input
      :model-value="modelValue"
      @update:model-value="value => emit('update:model-value', value)"
      :rows="10"
      type="textarea"
      :placeholder="placeholder"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: string,
  label: string,
  placeholder?: string
}>()

const emit = defineEmits(['update:model-value'])

</script>