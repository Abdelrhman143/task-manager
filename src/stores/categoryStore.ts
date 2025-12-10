import { defineStore } from 'pinia'
import { ref } from 'vue'
import { categoryService } from '@/services/categoiresService'
import type { Category } from '@/types/category'

export const useCategoryStore = defineStore('categories', () => {
  // states
  const categories = ref<Category[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>('')

  // use service to fetch categories
  const fetchCategories = async () => {
    isLoading.value = true
    error.value = null
    try {
      const data = await categoryService.getCategories()
      categories.value = data
    } catch (err) {
      console.error('Store Error:', err)
      error.value = err instanceof Error ? err.message : 'Failed to load categoires'
    } finally {
      isLoading.value = false
    }
  }
  return {
    fetchCategories,
    categories,
    isLoading,
    error,
  }
})
