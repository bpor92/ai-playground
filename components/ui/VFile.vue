<template>
  <el-upload
    class="upload-demo mt-5 mb-5"
    drag
    multiple
    :auto-upload="false"
    @change="onChange"
  >
    <el-icon class="el-icon--upload">
      <upload-filled />
    </el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
  </el-upload>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'

const emit = defineEmits(['on-file'])

const onChange = (val: Record<string, any>) => readFile(val)

const readFile = (val: Record<string, any>) => {
  const file = val.raw as File
  const reader = new FileReader()
  reader.readAsText(file)
  reader.onload = res => emit('on-file', res?.target?.result)
}
</script>
