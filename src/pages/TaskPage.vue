<script setup lang="ts">
import TaskActions from '@/features/tasks/TaskActions.vue'
import TaskDetails from '@/features/tasks/TaskDetails.vue'
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'

const router = useRouter()
const handleNavegateBack = () => {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="min-h-dvh">
    <div class="container">
      <div class="mb-5 flex justify-between">
        <Button @click="handleNavegateBack()" class="cursor-pointer bg-gray-400"
          >back to tasks</Button
        >
        <TaskActions />
      </div>
      <TaskDetails />
    </div>
  </div>
</template>
