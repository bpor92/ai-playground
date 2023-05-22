<template>
  <UiForm class="grid grid-cols-2 gap-5">
    <div v-for="item in form.questions" :key="item.id">
      <UiElTextarea 
        :label="item.text"
        v-model="item.value"
      />
      <br>
    </div>
  </UiForm>
</template>

<script setup lang="ts">
import { questionOptions } from '~/types/questions'

interface Question{
  id: string,
  text: string,
  value: string,
}

const form = reactive<{
  questions: Question[]
}>({
  questions: []
})

const questionsModel = [...questionOptions()]
onMounted(() => {
  form.questions = questionsModel.map(item => ({
    id: item.id,
    text: item.text,
    value: ''
  }))
})
</script>