<template>
  <div>
    <UiForm  class="w-full  p-2 md:max-w-sm md:mx-auto">
      <UiText
        label="Name and surname of candidate"
        v-model="form.candidate"
      />
      <br>

      <div>
        <input type="file" ref="fileInput" @change="readFile" />
      </div>
  
      <pre>{{ jsonFile }}</pre>
    </UiForm>
  </div>
</template>
<script lang="ts" setup>
const form = reactive({
  candidate: 'speaker2',
})

const jsonFile = ref()
const fileInput = ref()
const readFile = () =>  {
  const file = fileInput.value.files[0];
  const reader = new FileReader();
  reader.readAsText(file);

  reader.onload = async (res: any) => {
    const { interviewJsonGenerator } = useInterview()
    const response = await interviewJsonGenerator({ file: res.target.result, candidate: form.candidate })
    jsonFile.value = response.data
  }
}
</script>
