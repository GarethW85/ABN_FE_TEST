import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faTimes, faPlay, faHeart, faInfoCircle, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';

// Import Bootstrap and BootstrapVue CSS files
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import App from './App.vue';
import router from './router';

import './assets/main.css';

// Add icons to the library
library.add(faSearch, faTimes, faPlay, faHeart, faInfoCircle, faChevronLeft, faChevronRight);

// Configure axios defaults
axios.defaults.baseURL = 'https://api.tvmaze.com';

const app = createApp(App);

// Register global components
app.component('FontAwesomeIcon', FontAwesomeIcon);

// Use plugins
app.use(createPinia());
app.use(router);

app.mount('#app');

// Add global error handler
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue error:', err);
  console.error('Error in component:', vm);
  console.error('Additional info:', info);
};
