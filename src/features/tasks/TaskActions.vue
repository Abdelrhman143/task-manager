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
</script>

<template>
  <div class="flex">
    <!-- edit the task -->
    <AddAndEditTask action="edit" />
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
