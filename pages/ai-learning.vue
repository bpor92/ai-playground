<template>
  <UiForm class="grid grid-cols-2 gap-5">
    <div v-for="(item, index) in questionsModel" :key="item.id">
      <UiElTextarea 
        :label="item.text"
        v-model="form.questions[index].value"
      />
      <UiElSelect 
        label="Score"
        v-model="form.questions[index].score"
        :options="scoreModel()"
      />
      <br>
      <br>
    </div>
  </UiForm>
</template>

<script setup lang="ts">
import { questionOptions } from '~/types/questions'

type Score = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

interface Question{
  id: string,
  text: string,
  value: string,
  score: Score
}

const form = reactive<{
  questions: Question[]
}>({
  questions: []
})

onMounted(() => {
  form.questions = questionsModel.map(item => ({
    id: item.id,
    text: item.text,
    value: '',
    score: 0
  }))
})

const questionsModel = questionOptions()
const scoreModel = () => {
  const scoreOptions = []
  for (let index = 0; index <= 10; index++) {
    scoreOptions.push({ value: index, label: index});
  }
  return scoreOptions
}

</script>