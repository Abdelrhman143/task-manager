import { defineStore } from 'pinia'
import { ref } from 'vue'
import { taskService } from '@/services/taskService'
import type { TaskResponse } from '@/types/task'

export const useTaskStore = defineStore('tasks', () => {
  // states
  const tasks = ref<TaskResponse[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>('')

  // use service to fetch tasks
  const fetchTasks = async () => {
    isLoading.value = true
    error.value = null
    try {
      const data = await taskService.getTasks()
      tasks.value = data
    } catch (err: unknown) {
      console.error('Store Error:', err)
      error.value = err instanceof Error ? err.message : 'Failed to load tasks'
    } finally {
      isLoading.value = false
    }
  }
  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
  }
})
