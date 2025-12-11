<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCategoryStore } from '@/stores/categoryStore'
import { useTaskStore } from '@/stores/taskStore'
import type { TaskRequest, TaskResponse } from '@/types/task'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  action: 'add' | 'edit'
  task?: TaskResponse
}>()

// state to manage the form
const title = ref('')
const description = ref('')
const categoryId = ref<number | null>(null)
const priority = ref<'low' | 'medium' | 'high'>('medium')
const dueDate = ref('')

const isOpen = ref(false)

// stores of task and categories to use it in add and bring categories
const taskStore = useTaskStore()
const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)

// function to rest the inputs when we finish
const resetForm = () => {
  title.value = ''
  description.value = ''
  categoryId.value = null
  priority.value = 'medium'
  dueDate.value = ''
}

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  // make sure all fields work
  if (!title.value.trim() || !categoryId.value) {
    alert('Please fill in all required fields')
    return
  }
  //
  try {
    // Prepare task data (like preparing payload in React)
    const taskData: TaskRequest = {
      title: title.value.trim(),
      description: description.value.trim() || undefined,
      category_id: categoryId.value,
      priority: priority.value,
      due_date: dueDate.value || new Date().toISOString(),
    }
    console.log('task data before if', taskData)
    if (props.action === 'add') {
      // Add new task
      await taskStore.addTask(taskData)
      console.log('Task added!')
      // Refresh the tasks list
      await taskStore.fetchTasks(true)
    } else if (props.action === 'edit' && props.task) {
      // Update existing task
      await taskStore.updateTask(props.task.id, taskData)
      // Refresh the tasks list
      await taskStore.fetchTasks(true)
    }

    // Close dialog and reset form
    isOpen.value = false
    resetForm()
  } catch (error) {
    console.error('Error saving task:', error)
    alert('Failed to save task. Please try again.')
  }
}

onMounted(async () => {
  await categoryStore.fetchCategories()
})

watch(
  () => props.task,
  (task) => {
    if (task && props.action === 'edit') {
      title.value = task.title
      description.value = task.description || ''
      categoryId.value = task.category_id
      priority.value = task.priority

      dueDate.value = task.due_date ? String(task.due_date.split('T')[0]) : ''
    }
  },
  { immediate: true },
)
</script>
<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <i
        v-if="props.action === 'edit'"
        class="pi pi-pencil border-gray-300 border w-fit p-2 rounded-lg"
      ></i>
      <Button
        v-else-if="props.action === 'add'"
        class="bg-green-600 hover:bg-green-500 cursor-pointer self-end"
        >Add Task</Button
      >
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <form @submit.prevent="handleSubmit">
        <DialogHeader>
          <DialogTitle v-if="props.action === 'edit'">Edit task</DialogTitle>
          <DialogTitle v-else-if="props.action === 'add'">add task</DialogTitle>
        </DialogHeader>
        <!-- input title -->
        <div class="grid gap-4">
          <div class="grid gap-3">
            <Label class="mt-5" for="title">title <sup class="text-red-500">*</sup></Label>
            <Input
              id="title"
              v-model="title"
              required
              name="title"
              placeholder="enter task title"
            />
          </div>
        </div>
        <!-- input select category -->
        <div class="grid gap-4">
          <Label class="mt-5" for="category">category <sup class="text-red-500">*</sup></Label>
          <Select v-model="categoryId" required>
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>select a category</SelectLabel>
                <SelectItem v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <!-- input description -->
        <div class="grid gap-4">
          <div class="grid gap-3">
            <Label class="mt-5" for="description">description</Label>
            <Input
              id="description"
              v-model="description"
              name="description"
              placeholder="enter description"
            />
          </div>
        </div>
        <!-- input select priority -->
        <div class="grid gap-4">
          <Label class="mt-5" for="category">Priority</Label>
          <Select v-model="priority">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select a Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>select a Priority</SelectLabel>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <!-- input date -->

        <div class="grid gap-4">
          <div class="grid gap-3">
            <Label class="mt-5" for="date">due date</Label>
            <Input v-model="dueDate" type="date" id="date" name="date" />
          </div>
        </div>
        <DialogFooter class="mt-5">
          <DialogClose as-child>
            <Button variant="outline"> Cancel </Button>
          </DialogClose>
          <Button type="submit">Add</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
