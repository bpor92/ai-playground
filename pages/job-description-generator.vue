<template>
  <div class="prose">
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
      <UiButton 
        v-if="form.position"
        mode="link" 
        @click="prepareTasks"
      >
        Prepare Tasks
      </UiButton>
    </div>

    <UiElTextarea 
      v-model="form.tasks" 
      label="Tasks" 
      :loading="prepareTasksLoader" 
    />
    
    <br>
    <UiButton 
      :disabled="prepareTasksLoader || responseDescriptionLoader"  
      mode="primary" 
      @click="generateJobDescription"
    >
      Generate
    </UiButton>
  </UiForm>
  
  <br>
  
  <UiMockupWindow
    v-show="responseDescription || responseDescriptionLoader" 
    v-loading="responseDescriptionLoader"
  >
    <Markdown :source="responseDescription" class="p-5 break-words" />
  </UiMockupWindow>

  <div>
  </div>

</template>

<script setup lang="ts">
import { jobs } from "~/types/employee-position";
import Markdown from "vue3-markdown-it";
import { JobDescription } from "~/types/job-description";

const form = reactive({
  position: '',
  tasks: ''
})

const responseDescription = ref('')
const { api: descriptionApi, state: jobDescriptionState } = useJobDescriptionGenerator()
const responseDescriptionLoader  = computed(() => jobDescriptionState.value === 'loading')

const generateJobDescription = async () => {
  const position = useArrayFind(jobs, val => val.value === form.position).value?.label
  if(!position) throw new Error('Invalid position')

  const data: JobDescription = {
    position,
    tasks: form.tasks
  }

  const response = await descriptionApi(data)
  if (!response.choices[0].message?.content) return

  responseDescription.value = response.choices[0].message?.content
}


const { api: taskApi, state: taskState } = usePrepareTask()
const prepareTasksLoader  = computed(() => taskState.value === 'loading')

const prepareTasks = async () => {
  const data = {
    position: form.position,
  }
  const response = await taskApi(data)
  
  if (!response.choices[0].message?.content) return
  
  form.tasks = response.choices[0].message?.content
}

</script>