<template>
  <label class="swap swap-rotate">
    <input
      v-model="model"
      type="checkbox"
      :value="value"
    >
    <div class="on">
      <slot name="on" />
    </div>

    <div class="off">
      <slot name="off" />
    </div>
  </label>
</template>

<script setup lang="ts">

const props = defineProps({
  modelValue: { type: [Array, Boolean] },
  value: { type: [Boolean, Object] },
  label: { type: String }
})

const emit = defineEmits([
  'update:modelValue'
])

const model = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})
</script>

<style scoped>
.on :slotted(svg) {
  @apply swap-on fill-current w-10 h-10
}

.off :slotted(svg) {
  @apply swap-off fill-current w-10 h-10
}

</style>
