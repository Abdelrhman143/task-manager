import { supabase } from '@/lib/supabaseClient'
import type { Category } from '@/types/category'

export const categoryService = {
  // fetch all categories
  async getCategories() {
    const { data, error } = await supabase.from('categories').select('*')

    if (error) {
      throw new Error(error.message)
    }
    return data as Category[]
  },

  // fetch single category
  async getCategoryById(id: number) {
    const { data, error } = await supabase.from('categories').select('*').eq('id', id).single()

    if (error) {
      throw new Error(error.message)
    }
    return data as Category
  },
}
