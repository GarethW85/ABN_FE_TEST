<script setup>
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <div class="d-flex flex-column min-vh-100 text-white" style="background: linear-gradient(to left, #0a0a0a 0%, #1a1a1a 100%);">
    <AppHeader />
    <main class="container-fluid py-4 px-3 px-md-4 px-lg-5 flex-grow-1">
      <RouterView />
    </main>
    <AppFooter class="mt-auto" />
  </div>
</template>

<style scoped>
/* Custom scrollbar styles are now in index.html */
</style>
