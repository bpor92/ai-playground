<template>
  <div class="form-control">
    <label class="label" >{{ label }}</label>
    <el-input
      v-loading="loading"
      :model-value="modelValue"
      @update:model-value="value => emit('update:model-value', value)"
      :rows="5"
      type="textarea"
      :placeholder="placeholder"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: string,
  label: string,
  loading?: boolean
  placeholder?: string
}>()

const emit = defineEmits(['update:model-value'])

</script>