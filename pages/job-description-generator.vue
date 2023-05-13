<template>
  <div class="prose ">
    <h2 class="w-full">Tworzenie opisów stanowisk na bazie zadań realizowanych przez osoby</h2>
  </div>

  <br>

  <UiForm>
    <div>
      <UiElSelect 
        :options="jobs"
        filterable
        label="Job position"
        v-model="form.position"
      />
      <UiButton v-if="form.position" mode="link" @click="prepareTasks">Prepare Tasks</UiButton>
    </div>

    <UiElTextarea v-model="form.tasks" label="Tasks" :loading="prepareTasksLoader" />
    <br>
    <UiButton mode="primary" @click="generateJobDescription">Generate</UiButton>
  </UiForm>

  <br>

  <UiMockupWindow  >
    <Markdown :source="responseDescription" class="p-5 break-words" />
  </UiMockupWindow>

  <div>
  </div>

</template>

<script setup lang="ts">
import { jobs } from "~/types/jobs";
import Markdown from "vue3-markdown-it";

const form = reactive({
  position: '',
  tasks: ''
})

const responseDescription = ref('')
const generateJobDescription = async () => {
  const { api } = useJobDescriptionGnerator()

  const data = {
    position: form.position,
    tasks: form.tasks
  }

  const response = await api(data)
  if (!response.choices[0].message?.content) return

  responseDescription.value = response.choices[0].message?.content
}

const prepareTasksLoader = ref<boolean>(false)
const prepareTasks = async () => {
  const { api } = usePrepareTask()

  const data = {
    position: form.position,
  }
  prepareTasksLoader.value = true
  const response = await api(data)
  
  if (!response.choices[0].message?.content) return
  
  form.tasks = response.choices[0].message?.content
  prepareTasksLoader.value = false
}

</script>