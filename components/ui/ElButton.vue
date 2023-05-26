<template>
  <el-button :type="props.mode" :disabled="disabled" :loading="loading">
    <slot />
  </el-button>
</template>

<script setup lang="ts">
import { ElMode } from '~/types/button'

interface Props {
  mode?: ElMode,
  disabled?: boolean,
  loading?: boolean
}

const props = defineProps<Props>()

</script>
