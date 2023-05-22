<template>
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="Date" prop="date" />
    <el-table-column label="Candidate" prop="name" />
    <el-table-column label="Score" prop="score" />
    <el-table-column label="Position" prop="position" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <NuxtLink :to="`/interview-ml/edit/${scope.row.id}`">
          <UiElButton small>Edit</UiElButton>
        </NuxtLink>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
interface User {
  id: number
  score: number
  position: string
  date: string
  name: string
  address: string
}

const search = ref('')
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const tableData: User[] = [
  {
    id: 1,
    score: 3,
    date: '2016-05-03',
    name: 'Tom',
    position: 'Backend developer',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 2,
    score: 8,
    date: '2016-05-02',
    name: 'John',
    position: 'Backend developer',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>