<script setup lang="ts">
import CategoriesFilter from '../components/CategoriesFilter.vue'
import ProgressBar from '../components/ProgressBar.vue'
import TasksList from '../components/TasksList.vue'
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
