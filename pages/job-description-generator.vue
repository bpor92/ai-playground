<template>
  <UiForm class="w-full p-2 md:max-w-sm md:mx-auto">
    <div class="flex justify-between items-end">
      <UiElSelect
        v-model="form.position"
        :options="jobs"
        filterable
        label="Employee position"
      />

      <UiElButton
        v-if="form.position"
        style="height:40px;"
        @click="prepareTasks"
      >
        Prepare Tasks
      </UiElButton>
    </div>

    <UiElTextarea
      v-model="form.tasks"
      label="Tasks"
      :rows="22"
      :loading="prepareTasksLoader"
    />

    <div class="flex justify-center mt-5">
      <UiElButton :loading="prepareTasksLoader || responseDescriptionLoader" mode="success" @click="generateJobDescription">
        Generate
      </UiElButton>
    </div>
  </UiForm>

  <br>

  <UiMockupWindow
    v-show="responseDescription || responseDescriptionLoader"
    v-loading="responseDescriptionLoader"
  >
    <Markdown :source="responseDescription" class="p-5 break-words" />
  </UiMockupWindow>
</template>

<script setup lang="ts">
import Markdown from 'vue3-markdown-it'
import { jobs } from '~/types/employee-position'
import { JobDescription } from '~/types/job-description'

const form = reactive({
  position: '',
  tasks: ''
})

const responseDescription = ref('')
const { api: descriptionApi, state: jobDescriptionState } = useJobDescriptionGenerator()
const responseDescriptionLoader = computed(() => jobDescriptionState.value === 'loading')

const generateJobDescription = async () => {
  const position = useArrayFind(jobs, val => val.value === form.position).value?.label
  if (!position) { throw new Error('Invalid position') }

  const data: JobDescription = {
    position,
    tasks: form.tasks
  }

  const { data: response, error } = await descriptionApi(data)
  if (error) { throw new Error(error) }
  responseDescription.value = response
}

const { api: taskApi, state: taskState } = usePrepareTask()
const prepareTasksLoader = computed(() => taskState.value === 'loading')

const prepareTasks = async () => {
  const data = {
    position: form.position
  }
  const { data: response, error } = await taskApi(data)
  if (error) { throw new Error(error) }
  form.tasks = response
}
</script>
