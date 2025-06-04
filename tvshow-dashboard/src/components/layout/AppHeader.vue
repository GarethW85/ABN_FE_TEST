<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars, faTimes, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';

const router = useRouter();
const searchQuery = ref('');
const isMobileMenuOpen = ref(false);
const isMobileView = ref(false);
const showSearch = ref(false);

const handleSearch = () => {
  const query = searchQuery.value.trim();
  if (query) {
    router.push({ path: '/search', query: { q: query } });
    searchQuery.value = '';
    showSearch.value = false;
    isMobileMenuOpen.value = false;
  }
};

const clearSearch = () => {
  searchQuery.value = '';
};

const toggleSearch = () => {
  showSearch.value = !showSearch.value;
  if (!showSearch.value) {
    searchQuery.value = '';
  }
};

const genres = [
  'Drama', 'Crime', 'Horror', 'Comedy', 'Action', 'Thriller',
  'Sci-Fi', 'Mystery', 'Romance', 'Adventure', 'Fantasy', 'Animation'
];

const checkScreenSize = () => {
  isMobileView.value = window.innerWidth < 992; // Bootstrap's lg breakpoint
  if (!isMobileView.value) {
    isMobileMenuOpen.value = false;
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<template>
  <header class="fixed top-0 start-0 end-0 z-50 shadow-lg py-2" style="background: linear-gradient(to bottom, #011d40 0%, #003a73 100%);">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center py-2">
        <!-- Logo -->
        <RouterLink to="/" class="text-decoration-none d-flex align-items-center">
          <span class="fs-3 fw-bold text-white">AMRO</span>
          <span class="fs-3 fw-bold text-danger">BOX</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <nav class="d-none d-lg-flex align-items-center w-100">
          <!-- Genre Links -->
          <div class="d-flex flex-nowrap align-items-center h-100 overflow-x-auto" style="flex: 1 1 auto; min-width: 0; gap: 1.5rem; scrollbar-width: none; -ms-overflow-style: none; padding: 0.5rem 0; margin-left: 3rem;">
            <div class="d-flex gap-3 gap-xl-4 h-100" style="flex-shrink: 0;">
              <RouterLink 
                v-for="genre in genres" 
                :key="genre"
                :to="`/genre/${genre.toLowerCase()}`"
                class="text-decoration-none text-secondary-emphasis hover-effect"
                :class="{ 'text-white fw-medium': $route.path.includes(genre.toLowerCase()) }"
                style="font-size: 0.9rem; white-space: nowrap; position: relative;"
                :data-test="`genre-link`"
              >
                {{ genre }}
              </RouterLink>
            </div>
          </div>
          
          <!-- Search Bar - Always visible on desktop -->
          <div class="position-relative" style="width: 280px; flex-shrink: 0; margin-left: 1.5rem;">
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              @focus="isSearchFocused = true"
              @blur="setTimeout(() => isSearchFocused = false, 200)"
              type="text"
              placeholder="Search for shows ..."
              class="form-control bg-dark text-white border-secondary ps-5 pe-4"
              :class="{ 'rounded-pill': !searchQuery, 'rounded-start-pill': searchQuery }"
              style="height: 38px;"
              ref="searchInput"
            />
            <FontAwesomeIcon 
              :icon="faSearch" 
              class="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
              style="pointer-events: none;"
            />
            <button 
              v-if="searchQuery"
              @click="clearSearch"
              class="btn btn-link position-absolute top-50 end-0 translate-middle-y text-secondary text-decoration-none p-0 me-3"
              style="background: transparent; border: none;"
            >
              <FontAwesomeIcon :icon="faXmark" size="xs" />
            </button>
          </div>
        </nav>

        <!-- Mobile Menu Button -->
        <button 
          class="btn btn-link p-0 text-white d-lg-none"
          @click="toggleMobileMenu"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon 
            :icon="isMobileMenuOpen ? faTimes : faBars" 
            class="fs-4"
          />
        </button>
      </div>

        <!-- Mobile Menu and Search -->
        <transition
          enter-active-class="animate__animated animate__fadeInDown"
          leave-active-class="animate__animated animate__fadeOutUp"
        >
          <div 
            v-if="isMobileMenuOpen || showSearch" 
            class="mobile-menu d-lg-none bg-dark bg-opacity-95 py-3"
            style="position: fixed; top: 60px; left: 0; right: 0; z-index: 1050; max-height: calc(100vh - 60px); overflow-y: auto;"
          >
            <!-- Mobile Search Bar -->
            <div class="px-3 mb-3">
              <div class="position-relative">
                <input
                  v-model="searchQuery"
                  @keyup.enter="handleSearch"
                  type="text"
                  placeholder="Search for shows..."
                  class="form-control form-control-lg bg-dark text-white border-secondary ps-5 rounded-pill"
                  style="height: 48px;"
                  ref="mobileSearchInput"
                />
                <FontAwesomeIcon 
                  :icon="faSearch" 
                  class="position-absolute top-50 start-0 translate-middle-y ms-4"
                  style="color: #6c757d; pointer-events: none;"
                />
                <button 
                  v-if="searchQuery"
                  @click="clearSearch"
                  class="btn btn-link position-absolute top-50 end-0 translate-middle-y text-secondary text-decoration-none p-0 me-4"
                  style="background: transparent; border: none;"
                >
                  <FontAwesomeIcon :icon="faXmark" />
                </button>
              </div>
            </div>
            
            <!-- Mobile Menu Items -->
            <div class="px-3 mt-2">
              <h6 class="text-uppercase text-muted small fw-bold mb-3 px-2">Browse by Genre</h6>
              <div class="d-flex flex-column gap-2">
                <RouterLink 
                  v-for="genre in genres" 
                  :key="genre"
                  :to="`/genre/${genre.toLowerCase()}`"
                  class="text-decoration-none text-white py-2 px-3 rounded"
                  :class="{ 'bg-primary': $route.path.includes(genre.toLowerCase()) }"
                  @click="isMobileMenuOpen = false"
                >
                  {{ genre }}
                </RouterLink>
              </div>
            </div>
            
            <!-- Search Results Section -->
            <div v-if="searchQuery && showSearch" class="px-3 mt-3">
              <div 
                v-if="searchQuery"
                class="d-flex justify-content-center py-3"
              >
                <button 
                  @click="handleSearch"
                  class="btn btn-primary w-100"
                >
                  Search for "{{ searchQuery }}"
                </button>
              </div>
            </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<style scoped>
/* Mobile Menu Animation */
.mobile-menu {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Hover effect for desktop */
.hover-effect {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border-radius: 4px;
  margin: 0 1px;
  padding: 0.25rem 0.6rem !important;
  height: 100%;
  color: rgba(255, 255, 255, 0.9) !important;
}

.hover-effect:hover {
  background-color: rgba(255, 255, 255, 0.15);
  color: #fff !important;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
}

.hover-effect::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0;
  right: 0;
  width: 0;
  height: 2px;
  background-color: var(--bs-primary);
  transition: all 0.2s ease;
  margin: 0 auto;
  opacity: 0.8;
}

.hover-effect:hover::after,
.router-link-active::after {
  width: 70%;
  opacity: 1;
}

.router-link-active {
  color: #fff !important;
  position: relative;
  font-weight: 500 !important;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
}

/* Responsive adjustments */
@media (max-width: 1399.98px) {
  nav a {
    font-size: 0.8rem;
    padding: 0.25rem 0.6rem !important;
  }
}

@media (min-width: 1200px) and (max-width: 1399.98px) {
  nav a {
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem !important;
  }
}

/* Animation classes */
.animate__animated {
  --animate-duration: 0.3s;
}
</style>

<style scoped>
  header {
    padding: 0.5rem 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  .hover-effect {
    transition: color 0.2s ease-in-out;
    position: relative;
  }

  .hover-effect:hover {
    color: white !important;
  }
.hover-effect:hover {
  color: white !important;
}

.hover-effect:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: white;
  transition: width 0.3s ease;
}

.hover-effect:hover:after,
.router-link-active:after {
  width: 100%;
}

nav a {
  position: relative;
  padding: 0.5rem 0;
}

.form-control {
  border-color: #495057;
}

.form-control:focus {
  background-color: #1e1e1e;
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  color: white;
}
</style>
