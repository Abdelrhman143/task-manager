import { supabase } from '@/lib/supabaseClient'
import type { TaskResponse } from '../types/task'

// service contain all CRUD operation of Tasks

export const taskService = {
  // fetch all tasks
  async getTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    return data as TaskResponse[]
  },
}
