<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
  show: {
    type: Object,
    required: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
});

const getImageUrl = (image) => {
  return image?.medium || 'https://via.placeholder.com/210x295?text=No+Image';
};

const getRating = (rating) => {
  return rating?.average ? `${rating.average}/10` : 'N/A';
};

const navigateToShow = (showId) => {
  router.push(`/show/${showId}`);
};
</script>

<template>
  <div class="netflix-tile position-relative overflow-hidden">
    <!-- Show Image -->
    <div class="tile-image-container">
      <img
        :src="getImageUrl(show.image)"
        :alt="show.name"
        class="tile-image"
        loading="lazy"
      />
      
      <!-- Hover Overlay -->
      <div class="tile-overlay d-flex flex-column justify-content-between p-2">
        <!-- Top Row: Badges -->
        <div class="d-flex justify-content-between align-items-start w-100 px-2 pt-2">
          <span v-if="show.premiered" class="badge bg-danger small fw-bold px-2">
            {{ new Date(show.premiered).getFullYear() }}
          </span>
          <span v-if="show.rating?.average" class="badge bg-warning text-dark small fw-bold px-2">
            {{ show.rating.average.toFixed(1) }}
          </span>
        </div>
        
        <!-- Middle: Details Button -->
        <div class="d-flex justify-content-center">
          <button 
            class="btn btn-primary btn-sm details-button"
            @click.stop="navigateToShow(show.id)"
          >
            More Details
          </button>
        </div>
        
        <!-- Bottom Row: Title & Genres -->
        <div class="tile-info">
          <h3 class="tile-title mb-1">{{ show.name }}</h3>
          <div v-if="show.genres?.length > 0" class="tile-genres small">
            {{ show.genres.slice(0, 2).join(' • ') }}
          </div>
        </div>
      </div>
      
      <!-- Removed circular button as per request -->
    </div>
  </div>
</template>

<style scoped>
.netflix-tile {
  --tile-width: 200px;
  --tile-ratio: 1.5; /* 2:3 aspect ratio */
  --tile-height: calc(var(--tile-width) * var(--tile-ratio));
  border-radius: 4px;
  transition: transform 0.2s ease, z-index 0.2s ease;
  z-index: 1;
  margin: 0 2px;
}

.tile-image-container {
  position: relative;
  width: 100%;
  padding-top: calc(100% * var(--tile-ratio));
  overflow: hidden;
  border-radius: 4px;
}

.tile-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.tile-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.6) 50%, transparent 70%);
  opacity: 0;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  pointer-events: none;
}

.details-button {
  background-color: rgba(255, 255, 255, 0.9);
  color: #000;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
  transform: translateY(10px);
  opacity: 0;
  pointer-events: auto;
  width: 100%;
  margin-top: 1rem;
}

.netflix-tile:hover .details-button {
  transform: translateY(0);
  opacity: 1;
}

.details-button:hover {
  background-color: #fff;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Removed circular button styles */

.tile-info {
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.netflix-tile:hover .tile-info {
  transform: translateY(0);
}

.tile-info {
  transform: translateY(10px);
  transition: transform 0.3s ease;
}

.tile-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tile-genres {
  color: #d2d2d2;
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tile-play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.7);
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 2;
}

/* Hover Effects */
.netflix-tile:hover {
  transform: scale(1.05);
  z-index: 10;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.netflix-tile:hover .tile-overlay {
  opacity: 1;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 30%, transparent 70%);
}

.netflix-tile:hover .tile-info {
  transform: translateY(0);
}

.netflix-tile:hover .tile-play-btn {
  opacity: 1;
  transform: translate(-50%, -50%) scale(0.9);
}

.netflix-tile:hover .tile-image {
  transform: scale(1.02);
}

/* Featured variant */
.netflix-tile.featured {
  --tile-width: 300px;
}

.netflix-tile.featured .tile-title {
  font-size: 1.1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .netflix-tile {
    --tile-width: 160px;
  }
  
  .netflix-tile.featured {
    --tile-width: 240px;
  }
}
</style>
