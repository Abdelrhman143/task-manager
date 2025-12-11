import { supabase } from '@/lib/supabaseClient'
import type { GetTasksOptions, TaskResponse } from '../types/task'

// service contain all CRUD operation of Tasks

export const taskService = {
  // fetch all tasks
  async getTasks(options?: GetTasksOptions) {
    const { limit = 20, offset = 0, categoryId } = options || {}

    // get tasks based on page
    let query = supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // if we have category search for task that equal this category
    if (categoryId !== undefined && categoryId !== null) {
      query = query.eq('category_id', categoryId)
    }
    const { data, error } = await query
    if (error) {
      throw new Error(error.message)
    }

    return data as TaskResponse[]
  },
  // fetch singleTask data
  async getTaskById(id: number) {
    const { data, error } = await supabase.from('tasks').select('*').eq('id', id).single()
    if (error) {
      throw new Error(error.message)
    }
    console.log('data of single task', data)
    return data as TaskResponse
  },
}
