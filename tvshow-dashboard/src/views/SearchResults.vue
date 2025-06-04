<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useShowStore } from '@/stores/showStore';
import ShowList from '@/components/shows/ShowList.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const route = useRoute();
const router = useRouter();
const showStore = useShowStore();
const searchQuery = ref(route.query.q || '');
const searchResults = ref([]);
const isLoading = ref(false);
const error = ref(null);

// Format the search query for display
const formattedQuery = computed(() => {
  if (!searchQuery.value) return '';
  return searchQuery.value
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
});

const formatShowData = (show) => ({
  id: show.id,
  name: show.name,
  image: show.image || { 
    medium: 'https://via.placeholder.com/210x295?text=No+Image',
    original: 'https://via.placeholder.com/210x295?text=No+Image'
  },
  rating: show.rating || { average: null },
  genres: show.genres || [],
  premiered: show.premiered || '',
  summary: show.summary || ''
});

const performSearch = async (query) => {
  if (!query.trim()) {
    searchResults.value = [];
    return;
  }
  
  isLoading.value = true;
  error.value = null;
  searchResults.value = [];
  
  try {
    // First try to search using the show store
    if (showStore.searchShows) {
      await showStore.searchShows(query);
      if (showStore.searchResults?.length > 0) {
        searchResults.value = showStore.searchResults.map(formatShowData);
        return;
      }
    } 
    
    // Fallback to direct API call
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to fetch search results');
    
    const data = await response.json();
    searchResults.value = data.map(item => formatShowData(item.show));
    
    // Update store if possible
    if (showStore.setSearchResults) {
      showStore.setSearchResults(searchResults.value);
    }
  } catch (err) {
    console.error('Search error:', err);
    error.value = 'Failed to load search results. Please try again.';
    searchResults.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Watch for changes in the route query
watch(() => route.query.q, (newQuery) => {
  if (newQuery !== searchQuery.value) {
    searchQuery.value = newQuery || '';
    if (newQuery) {
      performSearch(newQuery);
    } else {
      searchResults.value = [];
    }
  }
}, { immediate: true });

// Initial search on component mount
onMounted(() => {
  if (searchQuery.value) {
    performSearch(searchQuery.value);
  }
});

// Handle back navigation
const goBack = () => {
  router.push('/');
};
</script>

<template>
  <div class="py-4">
    <div class="container mx-auto px-4">
      <!-- Back Button -->
      <button 
        @click="goBack" 
        class="btn btn-link text-decoration-none text-light p-0 mb-4 d-inline-flex align-items-center"
      >
        <i class="bi bi-arrow-left me-2"></i>
        Back to Home
      </button>

      <!-- Search Header -->
      <div class="mb-4">
        <h1 class="text-white mb-2">
          Search Results for "{{ formattedQuery }}"
        </h1>
        <p class="text-muted mb-0">
          {{ searchResults.length }} {{ searchResults.length === 1 ? 'show' : 'shows' }} found
        </p>
      </div>
      
      <!-- Loading State -->
      <div v-if="isLoading" class="d-flex flex-column align-items-center justify-content-center py-5">
        <div class="spinner-border text-primary mb-3" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="text-muted">Searching for "{{ searchQuery }}"...</p>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="text-center py-5">
        <div class="card bg-dark bg-opacity-50 border-0">
          <div class="card-body p-5">
            <i class="bi bi-exclamation-triangle-fill text-danger fs-1 mb-3"></i>
            <h3 class="text-white mb-3">Error loading results</h3>
            <p class="text-muted mb-4">{{ error }}</p>
            <button 
              @click="performSearch(searchQuery)" 
              class="btn btn-primary"
            >
              <i class="bi bi-arrow-clockwise me-2"></i>Try Again
            </button>
          </div>
        </div>
      </div>
      
      <!-- No Results -->
      <div v-else-if="!isLoading && searchQuery && searchResults.length === 0" class="text-center py-5">
        <div class="card bg-dark bg-opacity-50 border-0">
          <div class="card-body p-5">
            <i class="bi bi-search text-muted fs-1 mb-3"></i>
            <h3 class="text-white mb-2">No results found</h3>
            <p class="text-muted mb-1">We couldn't find any shows matching "{{ searchQuery }}".</p>
            <p class="text-muted small">Try different keywords or check the spelling.</p>
          </div>
        </div>
      </div>
      
      <!-- Search Results -->
      <ShowList 
        v-else
        :shows="searchResults"
        :is-loading="isLoading"
        :title="`Search: ${formattedQuery}`"
        :genre="'search'"
        class="mt-4"
      />
    </div>
  </div>
</template>
