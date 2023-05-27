<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text">{{ label }}</span>
    </label>
    <el-select
      :filterable="filterable"
      :label="label"
      :model-value="modelValue"
      size="large"
      :placeholder="placeholder"
      @update:model-value="value => emit('update:model-value', value)"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script lang="ts" setup>
interface IElSelect {
  value: string | number,
  label: string,
}

withDefaults(defineProps<{
  modelValue: any,
  options: IElSelect[],
  label: string,
  filterable?: boolean,
  placeholder?: string
}>(), {
  filterable: false,
  placeholder: ''
})

const emit = defineEmits(['update:model-value'])

</script>
