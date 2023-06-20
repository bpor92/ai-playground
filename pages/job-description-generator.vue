<template>
  <VForm>
    <div class="flex justify-between items-end">
      <VInputSelect
        v-model="form.position"
        :options="jobs"
        filterable
        label="Employee position"
      />

      <VButton
        v-if="form.position"
        style="height:40px;"
        @click="prepareTasks"
      >
        Prepare Tasks
      </VButton>
    </div>

    <VInputTextarea
      v-model="form.tasks"
      label="Tasks"
      :rows="22"
      :loading="loading"
    />

    <div class="flex justify-center mt-5">
      <VButton
        :loading="loading || descriptionLoader"
        mode="success"
        @click="generateJobDescription"
      >
        Generate
      </VButton>
    </div>
  </VForm>

  <br>

  <VMockupWindow
    v-show="description || descriptionLoader"
    v-loading="descriptionLoader"
  >
    <Markdown :source="description" class="p-5 break-words" />
  </VMockupWindow>
</template>

<script setup lang="ts">
import Markdown from 'vue3-markdown-it'
import useJobTasks from '~/composables/useJobTasks'
import { AiResponse } from '~/server/utils/open-ai-response-handler'
import { jobs } from '~/types/employee-position'
import { JobDescription } from '~/types/job-description'

const form = reactive<{
  position: string,
  tasks: string | null
}>({
  position: '',
  tasks: ''
})

const description = ref<string | null>('')

const { request: jobDescriptionRequest, loading: descriptionLoader } = useJobDescription()
const generateJobDescription = async () => {
  const position = useArrayFind(jobs, val => val.value === form.position).value?.label
  if (!position) { throw new Error('Invalid position') }

  const data: JobDescription = {
    body: {
      position,
      tasks: form.tasks
    }
  }

  const { data: response } = await jobDescriptionRequest<AiResponse>(data)
  if (response.value) { description.value = response.value.data }
}

const { request, loading } = useJobTasks()
const prepareTasks = async () => {
  const { data, error } = await request<AiResponse>({ body: { position: form.position } })
  if (error.value?.statusMessage) console.log(error.value?.statusMessage)
  if (data.value) { form.tasks = data.value.data }
}
</script>
