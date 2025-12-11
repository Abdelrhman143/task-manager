import { apiRequest } from '@/lib/apiClient'
import type { Category } from '@/types/category'

export const categoryService = {
  // fetch all categories
  async getCategories() {
    const data = await apiRequest<Category[]>(`/categories?order=name.asc`, {
      method: 'GET',
    })

    return data
  },

  // fetch single category
  async getCategoryById(id: number) {
    const data = await apiRequest<Category[]>(`/categories?id=eq.${id}`, {
      method: 'GET',
    })

    if (!data || data.length === 0) {
      throw new Error(`Category with id ${id} not found`)
    }

    return data[0] as Category
  },
}
