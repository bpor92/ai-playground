<template>
  <div>
    <UiForm>
      <div class="divider">Form</div>

      <UiElText
        label="Name and surname of candidate"
        v-model="form.candidate"
      />
      <br>

      <div>
        <input type="file" ref="fileInput" @change="readFile" />
      </div>

      <br>

      <UiElButton mode="success" @click="onSendFile">Send</UiElButton>

      <br>

      <div v-if="questions" class="divider">Interview</div>
      
      <div class="grid grid-cols-2 gap-5">
        <div v-for="(question, index) in questions"  :key="index" class="flex flex-col">
          <UiElTextarea 
            :label="question.question"
            :model-value="question.answer"
            v-loading="question.loader"
          />
          <div v-if="question.rate">{{ question.rate }}</div>
          <br>
          <UiElButton mode="primary" v-if="questions && !question.rate" :loading="question.loader" @click="onRateInterview(index)">Rate</UiElButton>
        </div>
      </div>
  
    </UiForm>
  </div>
</template>

<script lang="ts" setup>
const form = reactive({
  candidate: 'Base, Patryk',
})

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

const questions = ref()
const onSendFile = async () => {
  const loading = ElLoading.service({ fullscreen: true })

  const { interviewJsonGenerator } = useInterview()
  const res = await interviewJsonGenerator({ file: fileContent.value, candidate: form.candidate })
  loading.close()
  const data =  JSON.parse(res.data)
  questions.value = data.map((item: { value: string, label: string }) => ({ ...item, rate: ''}))
}

const onRateInterview = async (index: number) => {
  const { rateInterview, rateLoading } = useInterview()
  questions.value[index].loader = rateLoading
  const res = await rateInterview({ question: questions.value[index].question, answer: questions.value[index].answer, position: "Frontend developer" })
  questions.value[index].rate = res.data
}
</script>
