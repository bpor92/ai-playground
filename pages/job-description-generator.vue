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
</template>

<script setup lang="ts">
import { jobs } from "~/types/jobs";

const form = reactive({
  position: '',
  tasks: ''
})

const generateJobDescription = async () => {

  const { api } = useJobDescriptionGnerator()

  const data = {
    position: form.position,
    tasks: form.tasks
  }

  const response = await api(data)


}

</script>