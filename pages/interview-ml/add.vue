<template>
  <UiForm>
    <div class="divider">Helper</div>
    <div class="w-full p-2 md:max-w-sm md:mx-auto">

      <UiElSelect 
        :options="[
          { label: ANSWER_LEVEL.BAD, value: ANSWER_LEVEL.BAD },
          { label: ANSWER_LEVEL.NEUTRAL, value: ANSWER_LEVEL.NEUTRAL },
          { label: ANSWER_LEVEL.GOOD, value: ANSWER_LEVEL.GOOD }
        ]"
        label="Answer level"
        v-model="form.answerLevel"
      />

      <div class="flex justify-center mt-5">
        <UiElButton  mode="success" @click="onGenerateAnswers">Generate</UiElButton>
      </div>
    </div>
    
    <div class="divider">Candidate</div>
    <div class="w-full p-2 md:max-w-sm md:mx-auto">
      <UiElText
        label="Surname and name"
        v-model="form.candidate"
      />
      <UiElText
        label="Position"
        v-model="form.position"
      />
      <UiElSelect 
        v-model="form.level"
        :label="'Level'"
        :options="[{ label: 'Junior', value: 'Junior'}, {value: 'Mid', label: 'Mid'}, {value: 'Senior', label: 'Senior'}]"
      />

      <br>
      <input type="file" ref="fileInput" @change="readFile" />
      <br>
      <br>

      <div class="flex justify-center">
        <UiElButton  mode="success" @click="onSendFile">Send</UiElButton>
      </div>
    </div>
    <div class="divider"></div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div v-for="item in form.questions" :key="item.id" class="mb-5 self-end">
        <UiElTextarea 
          :label="item.text"
          v-model="item.value"
          :loading="item.loader"
        />
        <br>
      </div>
    </div>

    

    <div class="flex justify-center">
      <UiElButton  mode="success" @click="onSend">Send</UiElButton>
    </div>
  </UiForm>
</template>

<script setup lang="ts">
import { questionOptions } from '~/types/questions'

enum ANSWER_LEVEL {
  GOOD = 'zły',
  BAD = 'średni',
  NEUTRAL = 'dobry'
}

interface Question{
  id: string,
  text: string,
  value: string,
  loader: boolean
}

const form = reactive<{
  answerLevel: string,
  questions: Question[],
  candidate: string,
  position: string,
  level: string,
}>({
  answerLevel: ANSWER_LEVEL.GOOD,
  questions: [],
  candidate: 'Base, Patryk',
  position: 'Frontend developer',
  level: 'Junior',
})


const questionsModel = [...questionOptions()]
onMounted(() => {
  form.questions = questionsModel.map(item => ({
    id: item.id,
    text: item.text,
    value: '',
    loader: false
  }))
})

const onSend = () => {

}

const fileInput = ref()
const fileContent = ref('')
const readFile = () =>  {
  const file = fileInput.value.files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = async (res: any) => {
    fileContent.value = res.target.result
  }
}

const onGenerateAnswers = () => {
  form.questions.forEach(async (item, index) => {
    const { generateAnswer, response } = useGenerateAnswers()
    form.questions[index].loader = true
    await generateAnswer({ answerLevel: form.answerLevel, question: item.text })
    form.questions[index].loader = false
    form.questions[index].value = response.value.data
  })
}

const onSendFile = async () => {
  const loading = ElLoading.service({ fullscreen: true })

  const { interviewMlJsonGenerator } = useInterview()
  const res = await interviewMlJsonGenerator({ file: fileContent.value, candidate: form.candidate })
  loading.close()
  const data = JSON.parse(res.data)

  data.forEach(question => {
    const questionIndex = form.questions.findIndex(item => item.id === question.id)
    form.questions[questionIndex].value = question.answer
  })
}

</script>