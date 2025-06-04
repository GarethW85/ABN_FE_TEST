<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useShowStore } from '@/stores/showStore';
import ShowCard from '@/components/shows/ShowCard.vue';

const route = useRoute();
const router = useRouter();
const showStore = useShowStore();
const show = ref(null);
const loading = ref(true);
const error = ref(null);
const activeTab = ref('overview');

const fetchShowDetails = async () => {
  try {
    loading.value = true;
    error.value = null;
    const showId = route.params.id;
    
    if (!showId) {
      throw new Error('No show ID provided');
    }
    
    show.value = await showStore.fetchShowById(showId);
  } catch (err) {
    console.error('Error fetching show details:', err);
    error.value = 'Failed to load show details. Please try again later.';
  } finally {
    loading.value = false;
  }
};

const getImageUrl = (image) => {
  return image?.original || 'https://via.placeholder.com/800x450?text=No+Image+Available';
};

const getRating = (rating) => {
  return rating?.average ? `${rating.average}/10` : 'N/A';
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const goBack = () => {
  router.go(-1);
};

onMounted(() => {
  fetchShowDetails();
});
</script>

<template>
  <div class="min-vh-100 bg-dark text-white">
    <!-- Backdrop -->
    <div 
      v-if="show?.image?.original" 
      class="position-fixed top-0 start-0 w-100 h-100 z-n1 opacity-25"
    >
      <img 
        :src="getImageUrl(show.image)" 
        :alt="show.name"
        class="w-100 h-100 object-fit-cover"
      />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="min-vh-100 d-flex justify-content-center align-items-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="min-vh-100 d-flex flex-column justify-content-center align-items-center p-4">
      <div class="text-center" style="max-width: 28rem;">
        <div class="text-danger mb-4">
          <i class="bi bi-exclamation-triangle-fill display-4"></i>
        </div>
        <h2 class="h3 mb-3">Error Loading Show</h2>
        <p class="text-light mb-4">{{ error }}</p>
        <button 
          @click="fetchShowDetails"
          class="btn btn-primary px-4 py-2"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Content -->
    <div v-else-if="show" class="container py-4">
      <button 
        @click="goBack"
        class="btn btn-link text-decoration-none p-0 mb-4 d-inline-flex align-items-center text-light"
      >
        <i class="bi bi-arrow-left me-2"></i>
        Back to Shows
      </button>

      <!-- Show Header -->
      <div class="row g-4 mb-5">
        <!-- Poster -->
        <div class="col-12 col-md-4 col-lg-3">
          <div class="rounded-3 overflow-hidden shadow">
            <img 
              :src="show.image?.original || 'https://via.placeholder.com/300x450?text=No+Image'" 
              :alt="show.name"
              class="img-fluid w-100"
            />
          </div>
        </div>

        <!-- Show Info -->
        <div class="col-12 col-md-8 col-lg-9">
          <h1 class="display-5 fw-bold mb-3">{{ show.name }}</h1>
          
          <div class="d-flex flex-wrap align-items-center gap-3 mb-4">
            <span v-if="show.rating?.average" class="badge bg-warning text-dark px-3 py-2 fw-bold">
              {{ getRating(show.rating) }}
            </span>
            <span v-if="show.premiered" class="text-light">
              {{ new Date(show.premiered).getFullYear() }}
            </span>
            <span v-if="show.runtime" class="text-light">
              {{ show.runtime }} min
            </span>
            <span v-if="show.status" class="text-light">
              {{ show.status }}
            </span>
          </div>

          <div class="d-flex flex-wrap gap-2 mb-4">
            <span 
              v-for="genre in show.genres" 
              :key="genre"
              class="badge bg-secondary bg-opacity-25 text-light px-3 py-2"
            >
              {{ genre }}
            </span>
          </div>

          <div class="mb-4">
            <h3 class="h5 fw-semibold mb-2">Overview</h3>
            <p class="text-light mb-0">
              {{ show.summary?.replace(/<[^>]*>?/gm, '') || 'No summary available.' }}
            </p>
          </div>

          <div class="row g-4 mb-4">
            <div v-if="show.schedule?.days?.length" class="col-6 col-md-3">
              <h4 class="small text-muted mb-1">Airs On</h4>
              <p class="mb-0">{{ show.schedule.days.join(', ') }}</p>
            </div>
            <div v-if="show.schedule?.time" class="col-6 col-md-3">
              <h4 class="small text-muted mb-1">Time</h4>
              <p class="mb-0">{{ show.schedule.time }} ({{ show.network?.country?.timezone || 'Local' }})</p>
            </div>
            <div v-if="show.network?.name" class="col-6 col-md-3">
              <h4 class="small text-muted mb-1">Network</h4>
              <p class="mb-0">{{ show.network.name }}</p>
            </div>
            <div v-if="show.officialSite" class="col-6 col-md-3">
              <h4 class="small text-muted mb-1">Official Site</h4>
              <a :href="show.officialSite" target="_blank" class="link-primary text-decoration-none">
                Visit Site <i class="bi bi-box-arrow-up-right ms-1"></i>
              </a>
            </div>
          </div>

          <div class="d-flex gap-3">
            <button class="btn btn-danger px-4 py-2 d-flex align-items-center">
              <i class="bi bi-play-fill me-2"></i>
              Watch Now
            </button>
            <button class="btn btn-outline-light px-4 py-2 d-flex align-items-center">
              <i class="bi bi-three-dots me-2"></i>
              More Options
            </button>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <ul class="nav nav-tabs border-bottom-0 mb-4" role="tablist">
        <li class="nav-item" role="presentation" v-for="tab in ['overview', 'seasons', 'cast', 'similar']" :key="tab">
          <button
            @click="activeTab = tab"
            class="nav-link text-uppercase fw-medium px-3 py-3"
            :class="{ active: activeTab === tab, 'text-light': activeTab === tab }"
            type="button"
            role="tab"
          >
            {{ tab }}
          </button>
        </li>
      </ul>

      <!-- Tab Content -->
      <div class="mb-5">
        <div v-if="activeTab === 'overview'" class="mb-5">
          <h3 class="h4 fw-semibold mb-3">Storyline</h3>
          <p class="text-light mb-0">
            {{ show.summary?.replace(/<[^>]*>?/gm, '') || 'No detailed storyline available.' }}
          </p>
        </div>

        <div v-else-if="activeTab === 'seasons'" class="mb-5">
          <h3 class="h4 fw-semibold mb-4">Seasons</h3>
          <div v-for="season in show._embedded?.seasons" :key="season.id" class="border-bottom border-secondary border-opacity-25 pb-4 mb-4">
            <div class="row g-4">
              <div class="col-12 col-md-3 col-lg-2">
                <img 
                  :src="season.image?.medium || 'https://via.placeholder.com/250x140?text=No+Image'" 
                  :alt="`${show.name} - Season ${season.number}`"
                  class="img-fluid rounded-3"
                />
              </div>
              <div class="col-12 col-md-9 col-lg-10">
                <h4 class="h5 fw-semibold mb-2">
                  {{ season.name || `Season ${season.number}` }}
                </h4>
                <div class="text-muted small mb-2">
                  {{ season.episodeOrder }} episodes | {{ season.premiereDate ? formatDate(season.premiereDate) : 'TBA' }}
                </div>
                <p class="text-light mb-0">
                  {{ season.summary?.replace(/<[^>]*>?/gm, '') || 'No summary available.' }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="activeTab === 'cast'" class="row g-4">
          <div v-for="member in show._embedded?.cast?.slice(0, 8)" :key="member.person.id" class="col-6 col-sm-4 col-lg-3 text-center">
            <img 
              :src="member.person.image?.medium || 'https://via.placeholder.com/150?text=No+Image'" 
              :alt="member.person.name"
              class="rounded-circle mb-3 object-fit-cover"
              style="width: 120px; height: 120px;"
            />
            <h4 class="h6 fw-semibold mb-1">{{ member.person.name }}</h4>
            <p class="small text-muted mb-0">{{ member.character.name }}</p>
          </div>
        </div>

        <div v-else-if="activeTab === 'similar'" class="row g-3">
          <div 
            v-for="similarShow in show._embedded?.similar?.shows?.slice(0, 6)"
            :key="similarShow.id"
            class="col-6 col-sm-4 col-md-3 col-lg-2"
          >
            <ShowCard 
              :show="similarShow"
              class="h-100"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
