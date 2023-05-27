<template>
  <div>
    <VDivider>
      Helper
    </VDivider>

    <VForm>
      <VInputSelect
        v-model="form.answerLevel"
        :options="[
          { label: ANSWER_LEVEL.BAD, value: ANSWER_LEVEL.BAD },
          { label: ANSWER_LEVEL.NEUTRAL, value: ANSWER_LEVEL.NEUTRAL },
          { label: ANSWER_LEVEL.VULGAR, value: ANSWER_LEVEL.VULGAR },
          { label: ANSWER_LEVEL.GOOD, value: ANSWER_LEVEL.GOOD }
        ]"
        label="Answer level"
      />

      <div class="flex justify-center mt-5">
        <VButton mode="success" @click="onGenerateAnswers">
          Generate
        </VButton>
      </div>
    </VForm>

    <VDivider>
      Candidate
    </VDivider>

    <VForm>
      <VInputText
        v-model="form.candidate"
        label="Surname and name"
      />
      <VInputText
        v-model="form.position"
        label="Position"
      />

      <br>
      <input ref="fileInput" type="file" @change="readFile">
      <br>
      <br>

      <div class="flex justify-center">
        <VButton mode="success" @click="onSendFile">
          Send
        </VButton>
      </div>
    </VForm>

    <VDivider />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div v-for="item in form.questions" :key="item.id" class="mb-5 self-end">
        <VInputTextarea
          v-model="item.value"
          :label="item.text"
          :loading="item.loader"
        />
        <div v-if="ratedQuestions">
          rate: {{ item.rate }}
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <VButton mode="success" @click="onSend">
        Rate question
      </VButton>
      <VButton mode="primary" @click="onCsv">
        to CSV
      </VButton>
    </div>
    <div v-if="ratedQuestions" class="flex justify-center">
      <el-text class="mx-1" :type="totalSummary < 30 ? 'danger' : 'success'">
        TOTAL: {{ (totalSummary).toFixed(2) }} %
      </el-text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Parser } from '@json2csv/plainjs'
import { questionOptions } from '~/types/questions'
const config = useRuntimeConfig()

enum ANSWER_LEVEL {
  GOOD = 'zaawansowanym',
  BAD = 'zły',
  VULGAR = 'wulgarnym',
  NEUTRAL = 'podstawowym'
}

interface Question{
  id: string,
  text: string,
  value: string,
  loader: boolean,
  rate: number
}

const form = reactive<{
  answerLevel: string,
  questions: Question[],
  candidate: string,
  position: string,
}>({
  answerLevel: ANSWER_LEVEL.GOOD,
  questions: [],
  candidate: 'Base, Patryk',
  position: 'Backend developer'
})

const totalSummary = computed(() => form.questions.reduce((a, b) => a + b.rate, 0) / 50 * 100)

const questionsModel = [...questionOptions()]
onMounted(() => {
  form.questions = questionsModel.map(item => ({
    id: item.id,
    text: item.text,
    value: '',
    loader: false,
    rate: 0
  }))
})

const ratedQuestions = ref<boolean>(false)

const onSend = async () => {
  ratedQuestions.value = true
  const body = form.questions.map(item => ({ id: item.id, question: item.text, answer: item.value }))
  const { data } = await useFetch('http://localhost:8000/mark-response', {
    method: 'POST',
    body
  })

  data.value.forEach((item) => {
    const questionIndex = form.questions.findIndex(question => question.id === item.id)
    form.questions[questionIndex].rate = item.rate
  })
}

const onCsv = () => {
  const parser = new Parser({ header: false })
  const answerLevel = () => {
    switch (form.answerLevel) {
      case ANSWER_LEVEL.GOOD :
        return 10
      case ANSWER_LEVEL.NEUTRAL:
        return 5
      default:
        return 0
    }
  }
  const jsonData = form.questions.map(item => ({
    id: item.id,
    value: item.value,
    score: answerLevel()
  }))

  const csv = parser.parse(jsonData)

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const pom = document.createElement('a')
  pom.href = url
  pom.setAttribute('download', 'ai-batch.csv')
  pom.click()
}

const fileInput = ref()
const fileContent = ref('')
const readFile = () => {
  const file = fileInput.value.files[0]
  const reader = new FileReader()
  reader.readAsText(file)
  reader.onload = (res: any) => {
    fileContent.value = res.target.result
  }
}

const onGenerateAnswers = async () => {
  ratedQuestions.value = false
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

  let res = ''

  if (config.public.MOCK_DATA === true) {
    res = JSON.parse('[\n  {\n    "id": "REST_VS_SOAP",\n    "question": "Jaka jest różnica między REST a SOAP?",\n    "answer": "REST i SOAP to dwa różne podejścia do tworzenia interfejsów programistycznych (API). REST jest architekturą opartą na zasobach, która wykorzystuje standardowe protokoły HTTP, takie jak GET, POST, PUT i DELETE, do przesyłania danych między klientem a serwerem. SOAP natomiast jest protokołem opartym na XML, który wykorzystuje specjalne formaty wiadomości i protokoły transportowe, takie jak HTTP, do przesyłania danych między klientem a serwerem. Główną różnicą między REST a SOAP jest to, że REST jest bardziej elastyczny i prostszy w użyciu, podczas gdy SOAP jest bardziej złożony i ma bardziej formalną strukturę."\n  },\n  {\n    "id": "SQL_INJECTION",\n    "question": "Co to jest SQL Injection i jak można temu zapobiec?",\n    "answer": "SQL Injection to atak na aplikację internetową, który polega na wprowadzeniu złośliwego kodu SQL do formularza lub innej interaktywnej części strony internetowej. Atakujący może w ten sposób uzyskać dostęp do bazy danych i wykonywać różne operacje, takie jak pobieranie, modyfikowanie lub usuwanie danych. Aby zapobiec SQL Injection, należy stosować parametryzowane zapytania SQL, które pozwalają na oddzielenie danych od kodu SQL. Należy również unikać używania niezaufanych danych wejściowych, takich jak dane wprowadzane przez użytkowników, bez uprzedniego ich sprawdzenia i walidacji. Warto również stosować mechanizmy zabezpieczające, takie jak filtrowanie danych wejściowych, ograniczanie uprawnień użytkowników do bazy danych oraz regularne aktualizowanie oprogramowania i zabezpieczeń serwera."\n  },\n  {\n    "id": "DATABASE_INDEXING",\n    "question": "Jakie są zalety i wady indeksowania baz danych?",\n    "answer": "Zalety indeksowania baz danych to szybsze wyszukiwanie i sortowanie danych, co przyspiesza działanie systemu. Indeksowanie również umożliwia uniknięcie powtarzających się wartości w bazie danych, co pozwala na oszczędność miejsca. Wady indeksowania to zwiększone wymagania dotyczące pamięci i zasobów procesora, co może wpłynąć na wydajność systemu. Indeksowanie również może spowodować opóźnienia w czasie dodawania, usuwania lub aktualizowania danych, co może prowadzić do problemów z synchronizacją."\n  },\n  {\n    "id": "ORM_BENEFITS",\n    "question": "Co to jest ORM (Object-Relational Mapping) i jakie są jego zalety?",\n    "answer": "ORM to technologia, która umożliwia mapowanie obiektów z języka programowania na relacyjne bazy danych. Zalety ORM to m.in. łatwiejsza i szybsza implementacja aplikacji, większa czytelność kodu, unikanie błędów związanych z ręcznym mapowaniem obiektów na tabele w bazie danych oraz możliwość łatwej zmiany bazy danych bez konieczności zmiany kodu aplikacji."\n  },\n  {\n    "id": "DATABASE_PERFORMANCE_OPTIMIZATION",\n    "question": "Jakich technik można użyć do optymalizacji wydajności bazy danych?",\n    "answer": "Indeksowanie - umożliwia szybsze wyszukiwanie danych, poprzez tworzenie indeksów na kolumnach tabeli. Normalizacja - zwiększa wydajność poprzez zredukowanie powtarzających się danych i unikanie redundancji. Partycjonowanie - dzielenie tabeli na mniejsze, dzięki czemu łatwiej jest zarządzać dużymi zgromadzeniami danych. Caching - przechowywanie często używanych informacji w buforze, co eliminuje potrzebę ich częstego wyszukiwania. Kompresja danych - zmniejszenie rozmiaru danych, co przyspiesza ich przetwarzanie. Replikacja - umożliwia równoczesny dostęp do danych przez wiele użytkowników, dzięki czemu uzyskuje się większą wydajność całego systemu. Używanie odpowiedniego formatu danych - wybór odpowiedniego typu danych może zwiększyć wydajność bazy danych. Monitorowanie wydajności - umożliwia wykrycie i rozwiązanie problemów wydajnościowej, które mogą wpłynąć na funkcjonowanie bazy danych."\n  }\n]')
  } else {
    res = await interviewMlJsonGenerator({ file: fileContent.value, candidate: form.candidate })
  }
  res.forEach((question: { id: string, answer: string, question: string }) => {
    const questionIndex = form.questions.findIndex(item => item.id === question.id)

    if (questionIndex !== undefined) {
      form.questions[questionIndex].value = question.answer
    }
  })

  loading.close()
}

</script>
