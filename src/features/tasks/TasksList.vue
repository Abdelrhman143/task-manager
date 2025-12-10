<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import TaskCard from './TaskCard.vue'
import { storeToRefs } from 'pinia'
import LoadingSpinner from '../common/LoadingSpinner.vue'
import { onMounted } from 'vue'

const store = useTaskStore()
const { tasks, isLoading, error } = storeToRefs(store)

onMounted(() => {
  store.fetchTasks()
})
</script>

<template>
  <div v-if="isLoading">
    <LoadingSpinner />
  </div>
  <div v-else-if="error" class="text-red-500 py-10 text-center">
    {{ error }}
  </div>
  <div v-else-if="!isLoading && tasks.length === 0" class="text-center py-10 text-gray-500">
    No tasks found.
  </div>
  <ul v-else class="space-y-5 pb-10 mt-10">
    <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
  </ul>
</template>
