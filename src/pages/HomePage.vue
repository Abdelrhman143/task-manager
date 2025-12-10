<script setup lang="ts">
import CategoriesFilter from '../features/categories/CategoriesFilter.vue'
import ProgressBar from '../features/tasks/ProgressBar.vue'
import TasksList from '../features/tasks/TasksList.vue'
</script>

<template>
  <div class="bg-[#f8fafca1] min-h-dvh">
    <CategoriesFilter />
    <div class="container">
      <ProgressBar />
      <TasksList />
    </div>
  </div>
</template>
