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
      <UiElButton  mode="success" @click="onSend">send</UiElButton>
      <UiElButton  mode="success" @click="onCsv">to CSV</UiElButton>
    </div>
  </UiForm>
</template>

<script setup lang="ts">
import { questionOptions } from '~/types/questions'
import { Parser } from '@json2csv/plainjs'

enum ANSWER_LEVEL {
  GOOD = 'dobry',
  BAD = 'zły',
  NEUTRAL = 'średni'
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

const onSend = async () => {

  const { data } = await useFetch(() => `http://localhost:8001/mark-response`,  {
        method: "POST",
        body: [
            {
                "id": "TEST",
                "question": "dff",
                "answer": "Co to ?"
            }
          ]
      })

}


const onCsv = () => {
  let parser = new Parser({header: false})
  let answerLevel = () => {
    switch(form.answerLevel) {
      case ANSWER_LEVEL.GOOD :
        return 10;
      case ANSWER_LEVEL.NEUTRAL:
        return 5;
      default:
        return 0;
    }
  }
  let jsonData = form.questions.map(item => ({
    id: item.id,
    text: item.text,
    value: item.value,
    score: answerLevel()
  }))

  let csv = parser.parse(jsonData);

  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  var url = URL.createObjectURL(blob);

  var pom = document.createElement('a');
  pom.href = url;
  pom.setAttribute('download', 'ai-batch.csv');
  pom.click();
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

const onGenerateAnswers = async () => {
  const { generateAnswer } = useGenerateAnswers()

  for (let index = 0; index <= form.questions.length; index++) {
    form.questions[index].loader = true
    const response = await generateAnswer({ answerLevel: form.answerLevel, question: form.questions[index].text })
    form.questions[index].loader = false
    form.questions[index].value = response.data
  }
}

const onSendFile = async () => {
  const loading = ElLoading.service({ fullscreen: true })

  const { interviewMlJsonGenerator } = useInterview()
  const res = await interviewMlJsonGenerator({ file: fileContent.value, candidate: form.candidate })
  res.forEach((question: { id: string, answer: string, question: string }) => {
    const questionIndex = form.questions.findIndex(item => item.id === question.id)
    form.questions[questionIndex].value = question.answer
  })

  loading.close()
}

</script>