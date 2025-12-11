<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import TaskCard from './TaskCard.vue'
import { storeToRefs } from 'pinia'
import LoadingSpinner from '../common/LoadingSpinner.vue'
import { onMounted } from 'vue'
import Button from '@/components/ui/button/Button.vue'

const store = useTaskStore()
const { tasks, isLoading, error, hasMore } = storeToRefs(store)

onMounted(() => {
  store.fetchTasks()
})
</script>

<template>
  <div class="flex flex-col gap-6"></div>
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
  <div v-if="hasMore" class="text-center">
    <Button @click="store.fetchMoreTasks()" :disabled="isLoading">
      <span v-if="isLoading">Loading...</span>
      <span v-else>Load More</span>
    </Button>
  </div>
  <div v-else-if="tasks.length > 0" class="text-center py-5 text-gray-500">
    No more tasks to load
  </div>
</template>
