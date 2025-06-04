import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createPinia } from 'pinia';
import { createTestRouter } from '../../utils/test-utils';
import AppHeader from '../../../src/components/layout/AppHeader.vue';

describe('AppHeader', () => {
  let wrapper;
  let router;
  
  const createComponent = (options = {}) => {
    router = createTestRouter();
    
    return mount(AppHeader, {
      global: {
        plugins: [createPinia(), router],
        stubs: {
          'font-awesome-icon': true,
          'router-link': {
            template: '<a :href="to" @click.prevent="$emit(\'click\', $event)"><slot></slot></a>',
            props: ['to']
          }
        }
      },
      ...options
    });
  };

  beforeEach(async () => {
    // Reset the router before each test
    wrapper = createComponent();
    await router.isReady();
  });

  it('renders the logo', () => {
    const logo = wrapper.find('a');
    expect(logo.exists()).toBe(true);
    expect(logo.text()).toContain('AMRO');
    expect(logo.text()).toContain('BOX');
  });

  it('toggles mobile menu when burger button is clicked', async () => {
    const menuButton = wrapper.find('button[aria-label="Toggle navigation"]');
    await menuButton.trigger('click');
    
    // Check if the menu is open by looking for the mobile menu
    const mobileMenu = wrapper.find('.mobile-menu');
    expect(mobileMenu.exists()).toBe(true);
  });

  it('displays genre links when menu is open', async () => {
    // Open the menu
    await wrapper.find('button[aria-label="Toggle navigation"]').trigger('click');
    
    // Check if genre links are present
    const genreLinks = wrapper.findAll('a[href^="/genre/"]');
    expect(genreLinks.length).toBeGreaterThan(0);
  });

  it('has correct genre links', async () => {
    // Open the menu
    await wrapper.find('button[aria-label="Toggle navigation"]').trigger('click');
    
    // Get all genre links
    const genreLinks = wrapper.findAll('a[href^="/genre/"]');
    
    // Check that we have the expected number of genre links
    expect(genreLinks.length).toBeGreaterThan(0);
    
    // Check that each link has a valid href and text
    genreLinks.forEach(link => {
      const href = link.attributes('href');
      expect(href).toMatch(/^\/genre\/[a-z0-9-]+$/);
      expect(link.text().trim()).toBeTruthy();
    });
  });
});
