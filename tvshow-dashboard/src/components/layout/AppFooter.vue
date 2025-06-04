<template>
  <footer class="bg-dark text-light py-3 mt-5">
    <div class="container">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start">
        <p class="mb-2 mb-md-0 text-muted small">
          &copy; {{ new Date().getFullYear() }} AMRO TV. All rights reserved.
        </p>
        <p class="mb-2 mb-md-0 text-muted small fst-italic">
          Developed by Gareth Williams
        </p>
        <div class="d-flex gap-3">
          <a href="#" class="text-muted text-decoration-none small hover-text-white">Privacy Policy</a>
          <a href="#" class="text-muted text-decoration-none small hover-text-white">Terms of Service</a>
          <a href="#" class="text-muted text-decoration-none small hover-text-white">Contact Us</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Component logic can be added here if needed in the future
</script>

<style scoped>
.hover-text-white {
  transition: color 0.2s ease;
}

.hover-text-white:hover {
  color: white !important;
}

footer a {
  transition: color 0.2s ease;
}

footer a:hover {
  color: white !important;
}

.btn-outline-light:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
