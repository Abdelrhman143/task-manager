<script setup lang="ts">
import { useCategoryStore } from '@/stores/categoryStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import SmallLoadingSpinner from '../common/SmallLoadingSpinner.vue'
import { useTaskStore } from '@/stores/taskStore'

const store = useCategoryStore()
const taskStore = useTaskStore()
const { categories, isLoading } = storeToRefs(store)
const { selectedCategoryId } = storeToRefs(taskStore)

onMounted(() => {
  store.fetchCategories()
})

const handleCategorySelect = (categoryId: number | null) => {
  const newCategoryId = selectedCategoryId.value === categoryId ? null : categoryId
  taskStore.selectedCategory(newCategoryId)
}
</script>
<template>
  <div class="bg-gray-100 border-2 overflow-x-auto scroll-auto container flex p-1 rounded-lg">
    <div v-if="isLoading"><SmallLoadingSpinner /></div>
    <div
      v-if="!isLoading"
      @click="handleCategorySelect(null)"
      :class="[
        'hover:bg-white flex gap-2 justify-center items-center py-2 px-5 rounded-lg transition cursor-pointer',
        selectedCategoryId === null
          ? 'bg-green-200 border-2 pointer-events-none border-green-500'
          : '',
      ]"
    >
      all
    </div>
    <div
      v-for="cat in categories"
      :key="cat.id"
      @click="handleCategorySelect(cat.id)"
      :class="[
        ' hover:bg-white flex gap-2 justify-center items-center py-2 px-5 rounded-lg transition cursor-pointer',
        selectedCategoryId === cat.id
          ? 'bg-green-200 border-2 pointer-events-none border-green-500'
          : '',
      ]"
    >
      <img :src="cat.icon_url" :alt="cat.name" class="w-5 h-5 rounded bg-black" />
      <span>{{ cat.name }}</span>
    </div>
  </div>
</template>
