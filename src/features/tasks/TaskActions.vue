<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import AddAndEditTask from './AddAndEditTask.vue'
import type { TaskResponse } from '@/types/task'
import { useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'
import { onMounted, ref } from 'vue'

const route = useRoute()
const taskId = Number(route.params.id)
const taskStore = useTaskStore()
const task = ref<TaskResponse>()

onMounted(async () => {
  const fetchedTask = await taskStore.fetchTaskById(taskId)
  if (fetchedTask) {
    task.value = fetchedTask
  }
})

// Handle delete the task
const handleDelete = async () => {
  console.log('Delete task:', taskId)
}
</script>

<template>
  <div class="flex">
    <!-- edit the task -->
    <AddAndEditTask action="edit" v-if="task" :task="task" />
    <!-- delete the task -->
    <div>
      <AlertDialog>
        <AlertDialogTrigger as-child>
          <i
            class="pi pi-trash text-red-400 ml-2 border-gray-300 border w-fit p-2 rounded-lg cursor-pointer"
          ></i>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </div>
</template>
