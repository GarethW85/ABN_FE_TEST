<script setup>
import { ref, onMounted, computed } from 'vue';
import { useShowStore } from '@/stores/showStore';
import ShowCard from './ShowCard.vue';

const props = defineProps({
  genre: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  shows: {
    type: Array,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const showStore = useShowStore();
const containerRef = ref(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(true);

const displayedTitle = computed(() => {
  return props.title || `${props.genre.charAt(0).toUpperCase() + props.genre.slice(1)} Shows`;
});

const scroll = (direction) => {
  if (!containerRef.value) return;
  
  const scrollAmount = direction === 'left' ? -500 : 500;
  containerRef.value.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
  
  // Update scroll buttons after a short delay to allow the scroll to complete
  setTimeout(updateScrollButtons, 300);
};

const updateScrollButtons = () => {
  if (!containerRef.value) return;
  
  const { scrollLeft, scrollWidth, clientWidth } = containerRef.value;
  canScrollLeft.value = scrollLeft > 0;
  canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 1; // Subtracting 1 to handle subpixel rounding
};

// Set up scroll event listener
onMounted(() => {
  if (containerRef.value) {
    containerRef.value.addEventListener('scroll', updateScrollButtons);
    // Initial check
    updateScrollButtons();
  }
  
  // Clean up
  return () => {
    if (containerRef.value) {
      containerRef.value.removeEventListener('scroll', updateScrollButtons);
    }
  };
});
</script>

<template>
  <div class="mb-5">
    <div class="mb-3">
      <h2 class="h4 fw-bold text-white mb-0">{{ displayedTitle }}</h2>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="d-flex gap-3 overflow-hidden">
      <div 
        v-for="i in 5" 
        :key="`skeleton-${i}`" 
        class="flex-shrink-0 bg-dark bg-opacity-25 rounded-3"
        style="width: 200px; height: 280px;"
      ></div>
    </div>

    <!-- Shows Grid -->
    <div v-else class="position-relative">
      <!-- Scroll Buttons -->
      <button 
        v-if="canScrollLeft"
        @click="scroll('left')"
        class="position-absolute start-0 top-50 translate-middle-y z-3 btn btn-dark bg-dark bg-opacity-75 rounded-circle p-0 d-flex align-items-center justify-content-center"
        style="width: 40px; height: 40px;"
        aria-label="Scroll left"
      >
        <i class="bi bi-chevron-left"></i>
      </button>

      <div 
        ref="containerRef"
        class="d-flex gap-3 overflow-x-auto pb-3 scrollbar-hide"
      >
        <ShowCard 
          v-for="show in shows" 
          :key="show.id"
          :show="show"
          class="flex-shrink-0"
          style="width: 200px;"
        />
      </div>

      
      <!-- Scroll Right Button -->
      <button 
        v-if="canScrollRight && shows.length > 4"
        @click="scroll('right')"
        class="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-label="Scroll right"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.rounded-3 {
  border-radius: 0.5rem !important;
}

/* Custom scrollbar for the show list container */
.show-list-container {
  scrollbar-width: thin;
  scrollbar-color: #4b5563 #1f2937;
}

.show-list-container::-webkit-scrollbar {
  height: 6px;
}

.show-list-container::-webkit-scrollbar-track {
  background: #1f2937;
  border-radius: 3px;
}

.show-list-container::-webkit-scrollbar-thumb {
  background-color: #4b5563;
  border-radius: 3px;
}

.show-list-container::-webkit-scrollbar-thumb:hover {
  background-color: #6b7280;
}
</style>
