<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import CategoriesFilter from './components/CategoriesFilter.vue'
import ProgressBar from './components/ProgressBar.vue'
</script>

<template>
  <link href="/src/style.css" rel="stylesheet" />
  <div class="bg-[#f8fafca1] min-h-dvh">
    <TheHeader />
    <div class="container">
      <CategoriesFilter />
      <ProgressBar />
    </div>
  </div>
</template>
