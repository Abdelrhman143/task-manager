import { defineStore } from 'pinia'
import { ref } from 'vue'
import { taskService } from '@/services/taskService'
import type { TaskRequest, TaskResponse } from '@/types/task'

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

  // bring the task by id coming from url
  const fetchTaskById = async (id: number) => {
    isLoading.value = true
    error.value = null

    try {
      const task = await taskService.getTaskById(id)
      return task
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load task'
    } finally {
      isLoading.value = false
    }
  }

  // send the data we recive from the from to the service
  const addTask = async (taskData: TaskRequest) => {
    isLoading.value = true
    error.value = null
    try {
      const newTask = await taskService.addTask(taskData)
      console.log('new task in store', newTask)
      return newTask
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to add new task'
    } finally {
      isLoading.value = false
    }
  }

  return {
    tasks,
    isLoading,
    error,
    hasMore,
    selectedCategoryId,
    addTask,
    fetchTaskById,
    fetchTasks,
    fetchMoreTasks,
    selectedCategory,
  }
})
