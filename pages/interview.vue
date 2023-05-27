<template>
  <div>
    <VDivider>Candidate</VDivider>

    <VForm>
      <VInputText
        v-model="form.candidate"
        label="Surname and name"
      />
      <VInputText
        v-model="form.position"
        label="Position"
      />
      <VInputSelect
        v-model="form.level"
        :label="'Level'"
        :options="[{ label: 'Junior', value: 'Junior'}, {value: 'Mid', label: 'Mid'}, {value: 'Senior', label: 'Senior'}]"
      />

      <VFile @on-file="onFile" />

      <div class="flex justify-center">
        <VButton mode="success" @click="onSendFile">
          Send
        </VButton>
      </div>
    </VForm>

    <VDivider v-if="questions.length">
      Interview
    </VDivider>

    <div class="grid grid-cols-2 gap-5">
      <div v-for="(question, index) in questions" :key="index" class="flex flex-col ">
        <VInputTextarea
          v-model="question.answer"
          v-loading="question.loader"
          :label="question.question"
        />
        <div v-if="question.rateDescription">
          <div class="flex flex-row items-center">
            Recruiter assessment: &nbsp; <VRate v-model="question.rate" />
          </div>
          <div>
            {{ question.rateDescription }}
          </div>
        </div>
        <br>
        <VButton
          v-if="questions.length && !question.rateDescription"
          mode="primary"
          :loading="question.loader"
          @click="onRateInterview(index)"
        >
          Rate
        </VButton>
      </div>
    </div>

    <template v-if="questions.length">
      <VDivider>Summary</VDivider>

      <VForm>
        <div>
          Score: {{ summaryRate }} / {{ questions.length * 5 }}
        </div>

        <el-radio-group v-model="form.positiveFeedback">
          <el-radio :label="FEEDBACK.POSITIVE" size="large">
            Positive
          </el-radio>
          <el-radio :label="FEEDBACK.NEGATIVE" size="large">
            Negative
          </el-radio>
        </el-radio-group>

        <VInputTextarea
          v-model="form.feedback"
          label="Feedback"
        />
        <br>
        <div class="flex justify-center">
          <VButton mode="success" @click="onCreateSummary">
            Create summary
          </VButton>
        </div>
      </VForm>

      <VMockupWindow
        v-show="feedbackResult"
      >
        <Markdown :source="feedbackResult" class="p-5 break-words" />
      </VMockupWindow>
    </template>
  </div>
</template>

<script lang="ts" setup>
import Markdown from 'vue3-markdown-it'

enum FEEDBACK {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE'
}

const form = reactive({
  candidate: 'Base, Patryk',
  position: 'Frontend developer',
  level: 'Junior',
  feedback: '',
  positiveFeedback: FEEDBACK.POSITIVE
})

const fileContent = ref('')
const onFile = (val: string) => { fileContent.value = val }

const questions = ref<{question: string, answer: string, rateDescription: string, rate: number, loader: boolean}[]>([])
const onSendFile = async () => {
  const loading = ElLoading.service({ fullscreen: true })

  const { interviewJsonGenerator } = useInterview()
  const res = await interviewJsonGenerator({ file: fileContent.value, candidate: form.candidate })
  loading.close()
  const data = JSON.parse(res.data)
  questions.value = data.map((item: { value: string, label: string }) => ({ ...item, rateDescription: '', rate: 0, loader: false }))
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
