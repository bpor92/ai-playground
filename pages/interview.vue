<template>
  <div>
    <UiForm>
      <div class="divider">Candidate</div>
      
      <div class="w-full  p-2 md:max-w-sm md:mx-auto">
        <UiElText
          label="Name and surname"
          v-model="form.candidate"
        />
        <UiElText
          label="Position"
          v-model="form.position"
        />
        <UiElSelect 
          v-model="form.level"
          :label="$t('Level')"
          :options="[{ label: 'Junior', value: 'Junior'}, {value: 'Mid', label: 'Mid'}, {value: 'Senior', label: 'Senior'}]"
        />
        <br>
  
        <div>
          <input type="file" ref="fileInput" @change="readFile" />
        </div>
        <br>
        <div class="flex justify-center">
          <UiElButton  mode="success" @click="onSendFile">Send</UiElButton>
        </div>
      </div>

      <br>

      <div v-if="questions.length" class="divider">Interview</div>
      
      <div class="grid grid-cols-2 gap-5">
        <div v-for="(question, index) in questions"  :key="index" class="flex flex-col">
          <UiElTextarea 
            :label="question.question"
            v-model="question.answer"
            v-loading="question.loader"
          />
          <div v-if="question.rate">{{ question.rate }}</div>
          <br>
          <UiElButton mode="primary" v-if="questions.length && !question.rate" :loading="question.loader" @click="onRateInterview(index)">Rate</UiElButton>
        </div>
      </div>
  
    </UiForm>
  </div>
</template>

<script lang="ts" setup>
const form = reactive({
  candidate: 'Base, Patryk',
  position: 'Frontend developer',
  level: 'Junior'
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

const questions = ref<{question: string, answer: string, rate: string, loader: boolean}[]>([])
const onSendFile = async () => {
  const loading = ElLoading.service({ fullscreen: true })

  const { interviewJsonGenerator } = useInterview()
  const res = await interviewJsonGenerator({ file: fileContent.value, candidate: form.candidate })
  loading.close()
  const data =  JSON.parse(res.data)
  questions.value = data.map((item: { value: string, label: string }) => ({ ...item, rate: '', loader: false}))
}

const onRateInterview = async (index: number) => {
  const { rateInterview, rateLoading } = useInterview()
  // TODO
  questions.value[index].loader = rateLoading

  const res = await rateInterview({ 
    question: questions.value[index].question,
    answer: questions.value[index].answer, 
    level: form.level, 
    position: form.position
  })

  questions.value[index].rate = res.data
}
</script>
