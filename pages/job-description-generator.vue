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
      <VButton :loading="loading || responseDescriptionLoader" mode="success" @click="generateJobDescription">
        Generate
      </VButton>
    </div>
  </VForm>

  <br>

  <VMockupWindow
    v-show="responseDescription || responseDescriptionLoader"
    v-loading="responseDescriptionLoader"
  >
    <Markdown :source="responseDescription" class="p-5 break-words" />
  </VMockupWindow>
</template>

<script setup lang="ts">
import Markdown from 'vue3-markdown-it'
import { useJob } from '~/composables/useJob'
import { jobs } from '~/types/employee-position'
import { JobDescription } from '~/types/job-description'

const form = reactive<{
  position: string,
  tasks: string | null
}>({
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

const { request, loading } = useJob()
const prepareTasks = async () => {
  const val = await request({ body: { position: form.position } })
  form.tasks = val.data.value.data
}

</script>
