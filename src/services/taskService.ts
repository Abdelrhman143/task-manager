import { apiRequest } from '@/lib/apiClient'
import type { GetTasksOptions, TaskRequest, TaskResponse } from '../types/task'

// service contain all CRUD operation of Tasks

export const taskService = {
  // fetch all tasks
  async getTasks(options?: GetTasksOptions) {
    const { limit = 20, offset = 0, categoryId } = options || {}

    // Build query parameters
    const params = new URLSearchParams()
    params.append('order', 'created_at.desc')

    // Add category filter if provided
    if (categoryId !== undefined && categoryId !== null) {
      params.append('category_id', `eq.${categoryId}`)
    }

    const queryString = params.toString()
    const endpoint = `/tasks${queryString ? `?${queryString}` : ''}`

    const data = await apiRequest<TaskResponse[]>(endpoint, {
      method: 'GET',
    })

    // Handle pagination manually (since REST API doesn't have range())
    // Return sliced results based on offset and limit
    return data.slice(offset, offset + limit)
  },

  // fetch singleTask data
  async getTaskById(id: number) {
    const data = await apiRequest<TaskResponse[]>(`/tasks?id=eq.${id}`, {
      method: 'GET',
    })

    if (!data || data.length === 0) {
      throw new Error(`Task with id ${id} not found`)
    }

    return data[0] as TaskResponse
  },

  // add task to database
  async addTask(taskData: TaskRequest) {
    const data = await apiRequest<TaskResponse[]>(`/tasks`, {
      method: 'POST',
      body: JSON.stringify(taskData),
    })

    if (!data || data.length === 0) {
      throw new Error('Failed to create task')
    }

    return data[0] as TaskResponse
  },

  // Update an existing task
  async updateTask(id: number, taskData: Partial<TaskRequest>) {
    const data = await apiRequest<TaskResponse[]>(`/tasks?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(taskData),
    })

    if (!data || data.length === 0) {
      throw new Error(`Task with id ${id} not found`)
    }

    return data[0] as TaskResponse
  },

  // Mark task as complete/incomplete
  async markTaskComplete(id: number, completed: boolean) {
    const data = await apiRequest<TaskResponse[]>(`/tasks?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ completed }),
    })

    if (!data || data.length === 0) {
      throw new Error(`Task with id ${id} not found`)
    }

    return data[0] as TaskResponse
  },

  // Delete a task
  async deleteTask(id: number) {
    await apiRequest(`/tasks?id=eq.${id}`, {
      method: 'DELETE',
    })
  },
}
