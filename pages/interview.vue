<template>
  <div>
    <div>
      <input type="file" ref="fileInput" @change="readFile" />
    </div>

    <pre>{{ jsonFile }}</pre>

  </div>
</template>
<script lang="ts" setup>
const jsonFile = ref()
const fileInput = ref()
const readFile = () =>  {
  const file = fileInput.value.files[0];
  const reader = new FileReader();
  reader.readAsText(file);

  reader.onload = async (res: any) => {
    const { interviewJsonGenerator } = useInterview()
    const response = await interviewJsonGenerator(res.target.result)
    jsonFile.value = response.data
  }
}
</script>
