<script setup lang="ts"></script>

<template>
  <li
    class="flex gap-5 bg-white border border-gray-200 rounded-lg p-5 hover:scale-[1.03] transition hover:shadow-lg cursor-pointer"
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
      <div class="flex gap-2 items-center">
        <!-- type flag -->
        <div class="flex gap-2 items-center rounded-xl px-2 bg-blue-200 text-sm text-blue-700">
          <i class="pi pi-briefcase"></i> <span>work</span>
        </div>
        <!-- prority flag -->
        <div
          class="bg-red-600/20 px-2 flex gap-2 items-center rounded-xl text-red-800 text-red-900 text-sm"
        >
          <i class="pi pi-flag"></i> <span>High</span>
        </div>
      </div>
    </div>
  </li>
</template>
