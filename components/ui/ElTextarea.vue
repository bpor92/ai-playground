<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text">{{ label }}</span>
    </label>
    <el-input
      v-loading="loading"
      :model-value="modelValue"
      :rows="rows"
      type="textarea"
      :placeholder="placeholder"
      @update:model-value="value => emit('update:model-value', value)"
    />
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  modelValue: string,
  label: string,
  loading?: boolean,
  rows?: number,
  placeholder?: string
}>(),
{
  rows: 5,
  placeholder: ''
})

const emit = defineEmits(['update:model-value'])

</script>
