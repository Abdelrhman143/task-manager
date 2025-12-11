<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import AddAndEditTask from '../tasks/AddAndEditTask.vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)

// Calculate completed tasks
const completedTasks = computed(() => {
  return tasks.value.filter((task) => task.completed).length
})

// Calculate total tasks
const totalTasks = computed(() => {
  return tasks.value.length
})
</script>
<template>
  <div class="border-b-2 border-b-gray-200 p-5 mb-5">
    <div class="container flex justify-between">
      <!-- title -->
      <div>
        <h1 class="text-xl font-bold">Task Manger</h1>
        <p class="text-gray-600">{{ completedTasks }} of {{ totalTasks }} tasks completed</p>
      </div>
      <!-- add task -->
      <AddAndEditTask action="add" />
    </div>
  </div>
</template>
