import { createRouter, createWebHistory } from "vue-router";

export function createTestRouter(routes = []) {
  return createRouter({
    history: createWebHistory(),
    routes: [
      { path: "/", name: "Home", component: { template: "<div>Home</div>" } },
      { path: "/genre/:genre", name: "Genre", component: { template: "<div>Genre</div>" } },
      ...routes,
    ],
  });
}

export function withPlugins(component, plugins = []) {
  return {
    ...component,
    setup() {
      // This will be used to apply plugins in the test
    },
  };
}
