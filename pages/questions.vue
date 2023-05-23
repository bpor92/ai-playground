<template>
  <div>
    <div class="w-full p-2 md:max-w-sm md:mx-auto">
      <UiElText
        label="Position"
        v-model="form.position"
      />
      <UiElSelect 
        v-model="form.level"
        :label="'Level'"
        :options="[{ label: 'Junior', value: 'Junior'}, {value: 'Mid', label: 'Mid'}, {value: 'Senior', label: 'Senior'}]"
      />
  
      <div class="flex justify-center mt-5">
        <UiElButton mode="success" @click="onCreateQuestion">Send</UiElButton>
      </div>
      <UiElTextarea 
        v-show="loader || result"
        v-model="result" 
        label="Questions" 
        :rows="22"
        v-loading="loader"
      />
    </div>

  </div>
</template>

<script lang="ts" setup>
import Markdown from "vue3-markdown-it";

const form = reactive({
  position: 'Frontend developer',
  level: 'Junior',
})

const result = ref('')
const loader = ref(false)

const onCreateQuestion = async () => {
  loader.value = true
  const { api } = useQuestionGenerator()
  const response = await api({ position: form.position, level: form.level })
  result.value = response.data
  loader.value = false
}

</script>