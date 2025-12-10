export interface TaskRequest {
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high'
  category_id: number
  due_date: string
  image_url?: string
}

export interface TaskResponse extends TaskRequest {
  id: number
  completed: boolean
  created_at: string
  updated_at: string
  image_url: string
}
