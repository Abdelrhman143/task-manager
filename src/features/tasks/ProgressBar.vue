<script setup lang="ts">
import { Progress } from '@/components/ui/progress'
</script>

<template>
  <div class="bg-white p-5 border-2 rounded-lg mt-8">
    <div class="flex justify-between items-center mb-2">
      <h4>progress</h4>
      <span class="text-gray-500">20%</span>
    </div>
    <Progress :model-value="33" />
  </div>
</template>
