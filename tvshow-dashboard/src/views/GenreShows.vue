<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useShowStore } from '@/stores/showStore';
import ShowList from '@/components/shows/ShowList.vue';

const route = useRoute();
const showStore = useShowStore();
const genre = ref(route.params.genre);
const isLoading = ref(true);
const error = ref(null);

const formattedGenre = computed(() => {
  return genre.value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
});

const fetchShows = async () => {
  if (!genre.value) return;
  
  isLoading.value = true;
  error.value = null;
  
  try {
    await showStore.fetchShowsByGenre(genre.value);
  } catch (err) {
    console.error(`Error fetching ${genre.value} shows:`, err);
    error.value = `Failed to load ${formattedGenre.value} shows. Please try again later.`;
  } finally {
    isLoading.value = false;
  }
};

// Watch for route changes
onMounted(() => {
  fetchShows();
});
</script>

<template>
  <div class="py-4">
    <div class="container mx-auto px-4">
      <!-- Back Button -->
      <button 
        @click="$router.go(-1)" 
        class="btn btn-link text-decoration-none text-light p-0 mb-4 d-inline-flex align-items-center"
      >
        <i class="bi bi-arrow-left me-2"></i>
        Back
      </button>
      
      <!-- Page Header -->
      <div class="mb-4">
        <h1 class="h2 fw-bold text-white mb-1">{{ formattedGenre }} Shows</h1>
        <p class="text-secondary mb-0">Browse all shows in the {{ formattedGenre }} category</p>
      </div>
      
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center min-h-[50vh]">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="bg-red-900/30 border border-red-700 text-red-100 p-6 rounded-lg max-w-3xl">
        <div class="flex items-center">
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 class="text-lg font-semibold">Error Loading Shows</h3>
        </div>
        <p class="mt-2">{{ error }}</p>
        <button 
          @click="fetchShows"
          class="mt-4 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Retry
        </button>
      </div>
      
      <!-- Shows List -->
      <div v-else>
        <ShowList 
          :genre="genre"
          :shows="showStore.getShowsByGenre(genre)"
          :is-loading="isLoading"
        />
        
        <!-- No Results -->
        <div v-if="showStore.getShowsByGenre(genre).length === 0" class="text-center py-12">
          <div class="max-w-md mx-auto">
            <svg class="mx-auto h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="mt-4 text-lg font-medium text-white">No shows found</h3>
            <p class="mt-1 text-gray-400">We couldn't find any shows in the {{ formattedGenre }} category.</p>
            <div class="mt-6">
              <button 
                @click="$router.push('/')" 
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Go back home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
