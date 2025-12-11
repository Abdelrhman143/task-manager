<script setup lang="ts">
import { useCategoryStore } from '@/stores/categoryStore'
import type { TaskResponse } from '@/types/task'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  task: TaskResponse
}>()

const store = useCategoryStore()
const { categories } = storeToRefs(store)

const category = categories.value.find((cat) => cat.id === props.task.category_id)
</script>

<template>
  <li
    class="flex gap-5 bg-white border border-gray-200 border-l-8 border-l-blue-600 rounded-lg p-5 hover:scale-[1.03] transition hover:shadow-lg cursor-pointer"
  >
    <!-- checkbox -->
    <input class="self-start size-5 rounded cursor-pointer translate-y-2" type="checkbox" />
    <div>
      <!-- text -->
      <h3 class="text-lg font-semibold">{{ task.title }}</h3>
      <p class="text-gray-500 mb-4 mt-1 text-sm">
        {{
          task.description && task.description.length > 120
            ? task.description?.substring(0, 120) + '.......'
            : task.description || 'no description available'
        }}
      </p>
      <!-- flags -->
      <div class="flex gap-2 items-center">
        <!-- type flag -->
        <div class="flex gap-2 items-center rounded-xl px-2 bg-blue-200 text-sm text-blue-700">
          <i class="pi pi-briefcase"></i> <span>{{ category?.name }}</span>
        </div>
        <!-- prority flag -->
        <div class="bg-red-600/20 px-2 flex gap-2 items-center rounded-xl text-red-900 text-sm">
          <i class="pi pi-flag"></i> <span>{{ task.priority }}</span>
        </div>
      </div>
    </div>
  </li>
</template>
