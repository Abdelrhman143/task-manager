<script setup lang="ts">
import { useCategoryStore } from '@/stores/categoryStore'
import { useTaskStore } from '@/stores/taskStore'

import { storeToRefs } from 'pinia'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import LoadingSpinner from '../common/LoadingSpinner.vue'
import type { TaskResponse } from '@/types/task'
import type { Category } from '@/types/category'
import MarkComplete from './MarkComplete.vue'

// bring the taskId from url
const route = useRoute()
const taskId = Number(route.params.id)
// store the task that coming from supabase
const currentTask = ref<TaskResponse>()
// store the category that coming from supabase
const currentCategory = ref<Category>()

const taskStore = useTaskStore()
const { isLoading } = storeToRefs(taskStore)

const categoryStore = useCategoryStore()

onMounted(async () => {
  // use the store to mount the task and category then store it value of states we decaler above
  const fetchedTask = await taskStore.fetchTaskById(taskId)
  if (!fetchedTask) return
  const fetchedCategory = await categoryStore.fetchCategoryById(fetchedTask.category_id)
  currentTask.value = fetchedTask
  currentCategory.value = fetchedCategory
})
watch(
  () => taskStore.tasks.find((t) => t.id === taskId),
  (updatedTask) => {
    if (updatedTask && currentTask.value) {
      currentTask.value = updatedTask
    }
  },
)
</script>

<template>
  <LoadingSpinner v-if="isLoading" />
  <div v-else class="bg-white border border-gray-300 rounded-lg p-10">
    <!-- make complete button -->
    <div class="flex items-center gap-2" v-if="currentTask">
      <MarkComplete :task="currentTask" /> <span>Mark as complete</span>
    </div>
    <div>
      <img
        :src="currentTask?.image_url"
        alt="task related to image"
        class="my-10 mx-auto rounded-lg"
      />
      <h2 class="text-3xl font-bold">{{ currentTask?.title }}</h2>
      <!-- flags -->
      <div class="my-5 flex gap-2">
        <div class="flex gap-2 items-center">
          <!-- type flag -->
          <div
            class="flex gap-2 items-center rounded-xl px-2 text-sm text-white"
            :style="{ backgroundColor: currentCategory?.color }"
          >
            <img :src="currentCategory?.icon_url" alt=" category icon" />
            <span>{{ currentCategory?.name }}</span>
          </div>
          <!-- prority flag -->
          <div class="bg-red-600/20 px-2 flex gap-2 items-center rounded-xl text-red-900 text-sm">
            <i class="pi pi-flag"></i> <span>{{ currentTask?.priority }}</span>
          </div>
        </div>
        <div v-if="currentTask?.due_date">
          <i class="pi pi-calendar mr-2"></i
          ><span class="text-gray-500">{{ currentTask?.due_date }}</span>
        </div>
      </div>
      <!-- description -->
      <div v-if="currentTask?.description">
        <h3 class="text-xl font-bold">Description</h3>
        <p class="text-gray-500 mb-4 mt-1 text-lg">
          {{ currentTask.description }}
        </p>
      </div>
      <!-- date informations -->
      <hr class="mt-5" />
      <div class="text-gray-500 text-xs mt-5 space-x-20">
        <span>{{ new Date(currentTask?.created_at || '').toLocaleDateString() }}</span>
        <span>{{ new Date(currentTask?.updated_at || '').toLocaleDateString() }}</span>
      </div>
    </div>
  </div>
</template>
