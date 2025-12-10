<script setup lang="ts">
import { useCategoryStore } from '@/stores/categoryStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import SmallLoadingSpinner from '../common/SmallLoadingSpinner.vue'

const store = useCategoryStore()
const { categories, isLoading } = storeToRefs(store)

onMounted(() => {
  store.fetchCategories()
})
</script>
<template>
  <div class="bg-gray-100 border-2 overflow-x-auto scroll-auto container flex p-1 rounded-lg">
    <div v-if="isLoading"><SmallLoadingSpinner /></div>
    <div
      v-for="cat in categories"
      :key="cat.id"
      class="hover:bg-white flex gap-2 justify-center items-center py-2 px-5 rounded-lg transition cursor-pointer"
    >
      <img :src="cat.icon_url" :alt="cat.name" class="w-5 h-5 rounded bg-black" />
      <span>{{ cat.name }}</span>
    </div>
  </div>
</template>
