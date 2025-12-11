import { defineStore } from 'pinia'
import { ref } from 'vue'
import { taskService } from '@/services/taskService'
import type { TaskResponse } from '@/types/task'

export const useTaskStore = defineStore('tasks', () => {
  // states
  const tasks = ref<TaskResponse[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>('')
  const offset = ref(0)
  const limit = ref(20)
  const hasMore = ref(true)
  const selectedCategoryId = ref<number | null>(null)

  // use service to fetch tasks pagination and filter
  const fetchTasks = async (rest: boolean = false) => {
    if (rest) {
      offset.value = 0
      tasks.value = []
      hasMore.value = true
    }
    isLoading.value = true
    error.value = null
    try {
      const data = await taskService.getTasks({
        limit: limit.value,
        offset: offset.value,
        categoryId: selectedCategoryId.value,
      })
      // if the rest === true return all data if no return more data to load more
      if (rest) {
        tasks.value = data
      } else {
        tasks.value = [...tasks.value, ...data]
      }
      // if the data === the limit we know this mean there is no more data
      hasMore.value = data.length === limit.value
      // Update offset for next fetch
      offset.value += data.length
    } catch (err: unknown) {
      console.error('Store Error:', err)
      error.value = err instanceof Error ? err.message : 'Failed to load tasks'
    } finally {
      isLoading.value = false
    }
  }
  // load more data for the next
  const fetchMoreTasks = async () => {
    if (!hasMore.value || isLoading.value) return
    await fetchTasks(false) //  go to rest and set it to false and this mean append more tasks
  }

  // store the categoryId in state we have
  const selectedCategory = async (categoryId: number | null) => {
    selectedCategoryId.value = categoryId
    await fetchTasks(true) // go to rest and set it to true this will triger a rest
  }
  return {
    tasks,
    isLoading,
    error,
    hasMore,
    selectedCategoryId,
    fetchTasks,
    fetchMoreTasks,
    selectedCategory,
  }
})
