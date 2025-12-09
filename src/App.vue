<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import CategoriesFilter from './components/CategoriesFilter.vue'
import ProgressBar from './components/ProgressBar.vue'
import TasksList from './components/TasksList.vue'
</script>

<template>
  <div class="bg-[#f8fafca1] min-h-dvh">
    <TheHeader />
    <div class="container">
      <CategoriesFilter />
      <ProgressBar />
      <TasksList />
    </div>
  </div>
</template>
