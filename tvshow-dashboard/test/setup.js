import { config } from '@vue/test-utils';
import { createPinia } from 'pinia';

// Set up Vue Test Utils
config.global.plugins = [createPinia()];

// Mock any global components or plugins
config.global.mocks = {
  $route: {
    path: '/',
    params: {}
  },
  $router: {
    push: () => {}
  }
};

global.CSS = { supports: () => false };
