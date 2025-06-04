<script setup>
import { ref, onMounted, computed } from 'vue';
import { useShowStore } from '@/stores/showStore';
import ShowCard from '@/components/shows/ShowCard.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const showStore = useShowStore();
const isLoading = ref(true);
const error = ref(null);
const allShows = ref([]);

// Featured shows (hero section)
const featuredShows = ref([]);
const activeShowIndex = ref(0);

// Genres to display
const genres = [
  'Drama', 'Crime', 'Horror', 'Comedy', 'Action', 'Thriller',
  'Sci-Fi', 'Mystery', 'Romance', 'Adventure', 'Fantasy', 'Animation'
];

// Fetch all shows on component mount
onMounted(async () => {
  try {
    await showStore.initialize();
    
      // Get all shows and sort by rating
    allShows.value = Object.values(showStore.showsByGenre)
      .flat()
      .filter((show, index, self) => 
        index === self.findIndex((s) => s.id === show.id)
      )
      .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));
      
    // Set featured shows (top 5 rated)
    featuredShows.value = allShows.value.slice(0, 5);
    
    // Auto-rotate featured shows
    if (featuredShows.value.length > 1) {
      setInterval(() => {
        activeShowIndex.value = (activeShowIndex.value + 1) % featuredShows.value.length;
      }, 8000);
    }
  } catch (err) {
    console.error('Error initializing shows:', err);
    error.value = 'Failed to load shows. Please try again later.';
  } finally {
    isLoading.value = false;
  }
});

// Search functionality
const searchQuery = ref('');
const isSearchFocused = ref(false);

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // Handle search logic here
    console.log('Searching for:', searchQuery.value);
  }
};

const clearSearch = () => {
  searchQuery.value = '';
};

// Computed properties
const activeShow = computed(() => {
  return featuredShows.value[activeShowIndex.value] || null;
});

const getImageUrl = (image) => {
  return image?.original || 'https://via.placeholder.com/1600x500?text=No+Image+Available';
};

// Methods
const setActiveShow = (index) => {
  activeShowIndex.value = index;
};
</script>

<template>
  <div class="pb-12" style="background: linear-gradient(to left, #0a0a0a 0%, #1a1a1a 100%); min-height: 100vh;">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-[50vh]">
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-5">
      <div class="text-danger fs-5 fw-medium mb-3">{{ error }}</div>
      <button 
        @click="$router.go()" 
        class="btn btn-primary px-4 py-2"
      >
        Retry
      </button>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Featured Show (Hero Section) -->
      <div v-if="featuredShows.length > 0" class="position-relative hero-container mb-5">
        <!-- Backdrop Image -->
        <div class="position-absolute top-0 start-0 w-100 h-100">
          <img 
            v-if="activeShow.image?.original" 
            :src="activeShow.image.original" 
            :alt="activeShow.name"
            class="w-100 h-100 object-fit-cover"
          />
          <div class="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-bottom bg-dark bg-opacity-50"></div>
        </div>

        <!-- Show Info -->
        <div class="position-relative h-100 d-flex flex-column justify-content-end p-4 p-md-5 p-lg-5">
          <h1 class="display-4 fw-bold text-white mb-3">
            {{ activeShow.name }}
          </h1>
          
          <div class="d-flex align-items-center mb-4">
            <span 
              v-if="activeShow.rating?.average"
              class="badge bg-warning text-dark fw-bold me-3"
            >
              {{ activeShow.rating.average.toFixed(1) }}
            </span>
            <span class="text-light">
              {{ activeShow.premiered ? new Date(activeShow.premiered).getFullYear() : 'N/A' }}
            </span>
          </div>

          <p class="text-light mb-4 max-w-3xl line-clamp-3">
            {{ activeShow.summary?.replace(/<[^>]*>/g, '') || 'No description available.' }}
          </p>

          <div class="d-flex flex-wrap gap-2 gap-sm-3 mb-4">
            <button class="btn btn-danger px-3 px-sm-4 py-1 py-sm-2 d-flex align-items-center" style="font-size: 0.9rem;">
              <i class="bi bi-play-fill me-1 me-sm-2"></i>
              <span>Watch Now</span>
            </button>
            <RouterLink 
              :to="`/show/${activeShow.id}`"
              class="btn btn-outline-light px-3 px-sm-4 py-1 py-sm-2 d-flex align-items-center text-decoration-none"
              style="font-size: 0.9rem;"
            >
              <i class="bi bi-info-circle me-1 me-sm-2"></i>
              <span>More Info</span>
            </RouterLink>
          </div>

          <!-- Show Indicators -->
          <div class="d-flex gap-2 mb-3">
            <button 
              v-for="(show, index) in featuredShows" 
              :key="show.id"
              @click="setActiveShow(index)"
              class="indicator-btn p-0 border-0 rounded-pill transition-all"
              :class="{ 'active': index === activeShowIndex }"
              aria-label="Go to slide"
            ></button>
          </div>
        </div>
      </div>

      <!-- All Shows Grid -->
      <div class="shows-grid-container">
        <div class="mb-4">
          <h2 class="h3 fw-bold text-white mb-0">All Shows</h2>
        </div>
        <div class="shows-grid">
          <div 
            v-for="show in allShows" 
            :key="show.id" 
            class="show-grid-item"
          >
            <ShowCard :show="show" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
body {
  background: linear-gradient(to left, #0a0a0a 0%, #1a1a1a 100%);
  background-attachment: fixed;
}

html, body {
  margin: 0;
  padding: 0;
  min-height: 100%;
}

#app {
  background: linear-gradient(to left, #0a0a0a 0%, #1a1a1a 100%);
  min-height: 100vh;
}
/* Carousel Indicators */
.indicator-btn {
  width: 24px;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;
}

.indicator-btn.active {
  background-color: #fff;
  width: 24px;
}

.indicator-btn:not(.active):hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.hero-container {
  height: 500px;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.object-fit-cover {
  object-fit: cover;
}

.bg-gradient-to-bottom {
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), transparent);
}

/* Shows Grid Styles */
.shows-grid-container {
  padding: 0 4%;
  margin-top: 1.5rem;
}

.shows-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  width: 100%;
}

.show-grid-item {
  aspect-ratio: 2/3;
  transition: transform 0.2s;
  margin-bottom: 0.5rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .shows-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 0.5rem;
  }
  .shows-grid-container {
    padding: 0 3%;
  }
}

@media (min-width: 768px) {
  .hero-container {
    height: 600px;
  }
  .search-bar-container {
    position: relative;
    z-index: 1;
  }
  .search-bar-container .form-control {
    height: 38px;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
  .search-bar-container .btn-link {
    padding: 0;
    opacity: 0.7;
    transition: opacity 0.2s;
  }
  .search-bar-container .btn-link:hover {
    opacity: 1;
  }
  .shows-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 0.6rem;
  }
}

@media (min-width: 992px) {
  .shows-grid {
    gap: 0.7rem;
  }
}

@media (min-width: 1200px) {
  .hero-container {
    height: 700px;
  }
  .shows-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 0.8rem;
  }
  .shows-grid-container {
    padding: 0 5%;
  }
}

@media (min-width: 1600px) {
  .shows-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
  .shows-grid-container {
    padding: 0 7%;
  }
}
</style>
