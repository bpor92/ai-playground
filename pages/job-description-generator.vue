<template>
  <div>
    Tworzenie opisów stanowisk na bazie zadań realizowanych przez osoby
  </div>

  <br>
  <br>
  <br>

  <UiForm>
    <UiElSelect 
      :options="jobs"
      filterable
      label="Job position"
      v-model="form.position"
    />

    <UiElTextarea v-model="form.tasks" label="Tasks" />
    <br>
    <UiButton mode="primary" @click="generateJobDescription">Generate</UiButton>
  </UiForm>

  <div>
    <Markdown :source="responseDescription" class="w-full break-words" />

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

</script>