<template>
  <div class="prose ">
    <h2 class="w-full">Job description based on the tasks performed</h2>
  </div>

  <br>

  <UiForm>
    <div >
      <UiElSelect 
        :options="jobs"
        filterable
        label="Employee position"
        v-model="form.position"
      />
      <UiButton v-if="form.position" mode="link" @click="prepareTasks">Prepare Tasks</UiButton>
    </div>

    <UiElTextarea v-model="form.tasks" label="Tasks" :loading="prepareTasksLoader" />
    
    <br>
    <UiButton  mode="primary" @click="generateJobDescription">Generate</UiButton>
  </UiForm>
  
  <br>
  
  <UiMockupWindow v-show="responseDescription || responseDescriptionLoader" v-loading="responseDescriptionLoader"  >
    <Markdown :source="responseDescription" class="p-5 break-words" />
  </UiMockupWindow>

  <div>
  </div>

</template>

<script setup lang="ts">
import { jobs } from "~/types/employee-position";
import Markdown from "vue3-markdown-it";

const form = reactive({
  position: '',
  tasks: ''
})

const responseDescription = ref('')
const responseDescriptionLoader  = ref(false)
const generateJobDescription = async () => {
  const { api } = useJobDescriptionGnerator()


  const data = {
    position: useArrayFind(jobs, val => val.value === form.position).value?.label,
    tasks: form.tasks
  }
  responseDescriptionLoader.value = true
  const response = await api(data)
  if (!response.choices[0].message?.content) return

  responseDescription.value = response.choices[0].message?.content
  responseDescriptionLoader.value = false
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