<template>
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
      <input type="file" ref="fileInput" @change="readFile" />
      <br>
      <br>

      <div class="flex justify-center">
        <UiElButton  mode="success" @click="onSendFile">Send</UiElButton>
      </div>
    </div>

    <br>

    <div v-if="questions.length" class="divider">Interview</div>
    
    <div class="grid grid-cols-2 gap-5">
      <div v-for="(question, index) in questions" :key="index" class="flex flex-col">
        <UiElTextarea 
          :label="question.question"
          v-model="question.answer"
          v-loading="question.loader"
        />
        <div v-if="question.rateDescription">
          <div class="flex flex-row items-center">
            Recruiter assessment: &nbsp; <UiElRate v-model="question.rate"/>
          </div>
          <div>
            {{ question.rateDescription }}
          </div>
        </div>
        <br>
        <UiElButton 
          mode="primary" 
          v-if="questions.length && !question.rateDescription"
          :loading="question.loader" 
          @click="onRateInterview(index)"
        >
          Rate
        </UiElButton>
      </div>
    </div>

    <div v-if="questions.length">
      <div class="divider">Summary</div>
      <div class="w-full  p-2 md:max-w-sm md:mx-auto">
        <div>
          Score: {{  summaryRate }} / {{ questions.length * 5 }}
        </div>

        <el-radio-group v-model="form.positiveFeedback">
          <el-radio :label="FEEDBACK.POSITIVE" size="large">Positive</el-radio>
          <el-radio :label="FEEDBACK.NEGATIVE" size="large">Negative</el-radio>
        </el-radio-group>
        
        <UiElTextarea
          label="Feedback"
          v-model="form.feedback"
        />
        <br>
        <div class="flex justify-center">
          <UiElButton  mode="success" @click="onCreateSummary">Create summary</UiElButton>
        </div>
      </div>
      <UiMockupWindow
        v-show="feedbackResult" 
      >
        <Markdown :source="feedbackResult" class="p-5 break-words" />
      </UiMockupWindow>
    </div>

  </UiForm>
</template>

<script lang="ts" setup>
import Markdown from "vue3-markdown-it"

const FEEDBACK = {
  POSITIVE: 'POSITIVE',
  NEGATIVE: 'NEGATIVE'
}

const form = reactive({
  candidate: 'Base, Patryk',
  position: 'Frontend developer',
  level: 'Junior',
  feedback: '',
  positiveFeedback: FEEDBACK.POSITIVE
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

const questions = ref<{question: string, answer: string, rateDescription: string, rate: number, loader: boolean}[]>([])
const onSendFile = async () => {
  const loading = ElLoading.service({ fullscreen: true })

  const { interviewJsonGenerator } = useInterview()
  const res = await interviewJsonGenerator({ file: fileContent.value, candidate: form.candidate })
  loading.close()
  const data =  JSON.parse(res.data)
  questions.value = data.map((item: { value: string, label: string }) => ({ ...item, rateDescription: '', rate: 0, loader: false}))
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
  const data = JSON.parse(res.data)
  questions.value[index].rateDescription = data.result
  questions.value[index].rate = data.rate
}

const summaryRate = computed(() => questions.value.reduce((a, b) => a + b.rate, 0))

const feedbackResult = ref('')
const onCreateSummary = async () => {
  const loading = ElLoading.service({ fullscreen: true })
  const { summarizeInterview } = useInterview()
  const res = await summarizeInterview({ 
    questions: questions.value,
    position: form.position,
    level: form.level,
    candidate: form.candidate,
    positiveFeedback: form.positiveFeedback === FEEDBACK.POSITIVE,
    feedback: form.feedback
  })
  feedbackResult.value = res.data
  loading.close()
}
</script>
