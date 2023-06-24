<template>
  <VForm>
    <VInputText
      v-model="form.position"
      label="Position"
    />
    <VInputSelect
      v-model="form.level"
      :label="'Level'"
      :options="[{ label: 'Junior', value: 'Junior'}, {value: 'Mid', label: 'Mid'}, {value: 'Senior', label: 'Senior'}]"
    />

    <div class="flex justify-center mt-5">
      <VButton mode="success" @click="onCreateQuestion">
        Send
      </VButton>
    </div>

    <VInputTextarea
      v-show="loader || result"
      v-model="result"
      v-loading="loader"
      label="Questions"
      :rows="22"
    />
  </VForm>
</template>

<script lang="ts" setup>
import { AiResponse } from "~/server/utils/open-ai-response-handler";

const form = reactive({
  position: 'Frontend developer',
  level: 'Junior'
})

const result = ref('')

const { request, loading: loader } = useInterviewQuestion()
const onCreateQuestion = async () => {
  const response = await request<AiResponse>({ body: { position: form.position, level: form.level }})
  if(response.data.value?.data) {
    result.value = response.data.value?.data
  }
}
</script>
