<template>
  <VForm>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
      <div v-for="item in form.questions" :key="item.id" class="mb-5 self-end">
        <VInputTextarea
          v-model="item.value"
          :label="item.text"
        />
        <VInputSelect
          v-model="item.score"
          label="Score"
          :options="scoreModel()"
        />
      </div>
    </div>
    <div class="flex justify-center">
      <VButton mode="success" @click="onSend">
        Learn
      </VButton>
    </div>
  </VForm>
</template>

<script setup lang="ts">
import { Parser } from '@json2csv/plainjs'
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
    scoreOptions.push({ value: index, label: index })
  }
  return scoreOptions
}

const route = useRoute()
// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id)

const onSend = () => {
  const parser = new Parser({ header: false })

  const jsonData = form.questions.map(item => ({
    id: item.id,
    text: item.text,
    value: item.value,
    score: item.score
  }))

  const csv = parser.parse(jsonData)

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const pom = document.createElement('a')
  pom.href = url
  pom.setAttribute('download', 'ai-batch.csv')
  pom.click()
}

</script>
