import { supabase } from '@/lib/supabaseClient'
import type { Category } from '@/types/category'

export const categoryService = {
  // fetch all categories
  async getCategories() {
    const { data, error } = await supabase.from('categories').select('*')
    console.log('categories from api', data)
    if (error) {
      throw new Error(error.message)
    }
    return data as Category[]
  },
}
