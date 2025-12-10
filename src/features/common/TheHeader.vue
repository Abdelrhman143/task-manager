<script setup lang="ts">
import AddTask from '../tasks/AddTask.vue'
</script>
<template>
  <div class="border-b-2 border-b-gray-200 p-5 mb-5">
    <div class="container flex justify-between">
      <!-- title -->
      <div>
        <h1 class="text-xl font-bold">Task Manger</h1>
        <p class="text-gray-600">1 of 5 tasks completed</p>
      </div>
      <!-- add task -->
      <AddTask />
    </div>
  </div>
</template>
