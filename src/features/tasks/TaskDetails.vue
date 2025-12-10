<script setup lang="ts"></script>

<template>
  <div class="bg-white border border-gray-300 rounded-lg p-10">
    <!-- make complete button -->
    <label
      class="bg-gray-100 w-full space-x-4 p-4 flex items-center hover:border-blue-500 transition cursor-pointer border"
    >
      <input type="checkbox" class="size-6" />
      <span class="text-sm">mark as complete</span>
    </label>
    <div>
      <img src="/main_image.jpg" alt="task related to image" class="my-10 mx-auto rounded-lg" />
      <h2 class="text-3xl font-bold">Complete project proposal</h2>
      <!-- flags -->
      <div class="my-5 flex gap-2">
        <div class="flex gap-2 items-center">
          <!-- type flag -->
          <div class="flex gap-2 items-center rounded-xl px-2 bg-blue-200 text-sm text-blue-700">
            <i class="pi pi-briefcase"></i> <span>work</span>
          </div>
          <!-- prority flag -->
          <div class="bg-red-600/20 px-2 flex gap-2 items-center rounded-xl text-red-900 text-sm">
            <i class="pi pi-flag"></i> <span>High</span>
          </div>
        </div>
        <div>
          <i class="pi pi-calendar mr-2"></i
          ><span class="text-gray-500">Due December 11, 2025</span>
        </div>
      </div>
      <!-- description -->
      <div>
        <h3 class="text-xl font-bold">Description</h3>
        <p class="text-gray-500 mb-4 mt-1 text-lg">
          Draft and finalize the Q1 project proposal for the marketing team. Include budget
          estimates and timeline.
        </p>
      </div>
      <!-- date informations -->
      <hr class="mt-5" />
      <div class="text-gray-500 text-xs mt-5 space-x-20">
        <span>Created Dec 9, 2025</span>
        <span>Updated Dec 9, 2025</span>
      </div>
    </div>
  </div>
</template>
