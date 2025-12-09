<script setup lang="ts">
import TaskFlags from './TaskFlags.vue'
</script>

<template>
  <li
    class="flex gap-5 bg-white border border-gray-200 border-l-8 border-l-blue-600 rounded-lg p-5 hover:scale-[1.03] transition hover:shadow-lg cursor-pointer"
  >
    <!-- checkbox -->
    <input class="self-start size-5 rounded cursor-pointer translate-y-2" type="checkbox" />
    <div>
      <!-- text -->
      <h3 class="text-lg font-semibold">Complete project proposal</h3>
      <p class="text-gray-500 mb-4 mt-1 text-sm">
        Draft and finalize the Q1 project proposal for the marketing team. Include budget estimates
        and timeline.
      </p>
      <!-- flags -->
      <TaskFlags />
    </div>
  </li>
</template>
