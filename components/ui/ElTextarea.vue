<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text">{{ label }}</span>
    </label>
    <el-input
      v-loading="loading"
      :model-value="modelValue"
      @update:model-value="value => emit('update:model-value', value)"
      :rows="rows"
      type="textarea"
      :placeholder="placeholder"
    />
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  modelValue: string,
  label: string,
  loading?: boolean,
  rows?: number,
  placeholder?: string
}>(),
 {
  rows: 5
 }
)

const emit = defineEmits(['update:model-value'])

</script>