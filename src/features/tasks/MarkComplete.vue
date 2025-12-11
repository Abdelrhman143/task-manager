<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import type { TaskResponse } from '@/types/task'
import { ref, watch } from 'vue'

const props = defineProps<{
  task: TaskResponse
}>()

const isChecked = ref(props.task.completed)
const taskStore = useTaskStore()

watch(
  () => props.task.completed,
  (newValue) => {
    isChecked.value = newValue
  },
)

const handleToggle = async () => {
  try {
    await taskStore.markTaskComplete(props.task.id, !isChecked.value)
    // Update local state after successful API call
    isChecked.value = !isChecked.value
  } catch (error) {
    console.error('Failed to toggle task completion:', error)
    isChecked.value = props.task.completed
  }
}
</script>

<template>
  <input type="checkbox" class="size-6" :checked="isChecked" @change="handleToggle" />
</template>
