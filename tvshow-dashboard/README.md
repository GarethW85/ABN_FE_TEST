# AMRO TV Dashboard

[![Vue 3](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)](https://v3.vuejs.org/)
[![Pinia](https://img.shields.io/badge/Pinia-2b73b6?style=for-the-badge&logo=pinia&logoColor=white)](https://pinia.vuejs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

A modern, responsive TV show discovery dashboard built with Vue 3, Pinia, and the TVMaze API. Browse shows by genre, search for your favorites, and view detailed information about each show.

## 📸 Screenshot

<div align="center">
  <img src="./screenshots/dashboard-preview.png" alt="AMRO TV Dashboard Preview" width="800">
  <p><em>AMRO TV Dashboard - Main View</em></p>
</div>

## 🚀 Features

- 🔍 Search TV shows by name with instant results
- 📱 Fully responsive design optimized for all devices
- 🎨 Dark theme with modern UI/UX and smooth animations
- ⚡ Fast and performant with lazy loading and image optimization
- 🏠 Home page with featured shows and genre browsing
- 🎬 Detailed show information with ratings and cast
- 📱 Mobile-optimized navigation with smooth transitions
- 🏷️ Browse by genre with horizontal scrolling on desktop
- 🔄 Dynamic search with debouncing and loading states

## 🛠 Tech Stack

- **Frontend Framework**: Vue 3 (Composition API)
- **State Management**: Pinia
- **Routing**: Vue Router
- **Styling**: Bootstrap 5 + Custom SCSS
- **Icons**: Font Awesome
- **Build Tool**: Vite
- **API**: TVMaze API

## 🏗 Architecture Decisions

### Why Vue 3 with Composition API?
- **Reactivity System**: Vue 3's Composition API provides better TypeScript support and more flexible code organization
- **Performance**: Improved virtual DOM and smaller bundle size compared to Vue 2
- **Maintainability**: Better code organization with composition functions that can be reused across components
- **Future-Proof**: The Composition API is the recommended way to write Vue 3 applications

### Why Pinia for State Management?
- **Simplicity**: More straightforward API compared to Vuex
- **TypeScript Support**: Excellent TypeScript support out of the box
- **DevTools Integration**: Built-in support for Vue DevTools
- **Modular by Design**: Encourages better code organization with stores
- **Lightweight**: Smaller bundle size compared to Vuex

### Why Vite?
- **Lightning Fast**: Instant server start and hot module replacement (HMR)
- **Optimized Builds**: Uses Rollup for production builds
- **Vue First**: Built by the creator of Vue.js with first-class Vue support
- **Modern Tooling**: Out-of-the-box support for TypeScript, JSX, and more

### Why Bootstrap 5?
- **Responsive Grid System**: Makes building responsive layouts straightforward
- **Utility-First Approach**: Enables rapid UI development with utility classes
- **Customizable**: Easy to override styles and customize the design system
- **Accessibility**: Built with accessibility in mind
- **No jQuery**: Pure JavaScript implementation reduces bundle size

### Why Vitest for Testing?
- **Vite Integration**: Uses the same config as Vite, eliminating build tool inconsistencies
- **Faster Testing**: Leverages Vite's native ES modules for faster test runs
- **Familiar API**: Jest-compatible API makes it easy to learn and migrate
- **First-class Vue Support**: Excellent integration with Vue Test Utils

### Test Files Structure
```
test/
├── components/       # Component tests
│   └── layout/      # Layout component tests
│       └── AppHeader.spec.js
└── utils/           # Test utilities
    └── test-utils.js
```

### Project Structure
```
src/
├── assets/          # Static assets (images, styles)
├── components/      # Reusable Vue components
│   ├── layout/      # Layout components (header, footer)
│   └── shows/       # Show-related components
├── composables/     # Composition API functions
├── router/          # Vue Router configuration
├── stores/          # Pinia stores
└── views/           # Page components
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) 16.14.0 or higher
- [npm](https://www.npmjs.com/) 8.5.0 or higher (comes with Node.js) or [Yarn](https://yarnpkg.com/) (optional)
- [Git](https://git-scm.com/) (for cloning the repository)

### Environment Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/GarethW85/FE_ABM_AMRO_2025.git
   cd tvshow-dashboard
   ```

2. **Install dependencies**
   ```sh
   # Using npm
   npm install
   
   # Or using Yarn
   yarn install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory with the following content:
   ```env
   VITE_APP_API_BASE_URL=https://api.tvmaze.com
   ```
   > Note: The app uses TVMaze's public API which doesn't require an API key.

### Running the Application

#### Development Mode
```sh
# Using npm
npm run dev

# Or using Yarn
yarn dev
```
The development server will start, and the app will be available at [http://localhost:3000](http://localhost:3000).

#### Production Build
To create a production build:
```sh
# Build the application
npm run build

# Preview the production build
npm run preview
```
The production-ready files will be generated in the `dist` directory.

### Running Tests

#### Unit Tests
```sh
# Run tests once
npm run test:unit

# Run tests in watch mode
npm run test:unit -- --watch

# Run tests with UI
npm run test:ui

# Generate test coverage report
npm run test:coverage
```

#### Linting
```sh
# Run ESLint
npm run lint

# Fix linting issues
npm run lint -- --fix
```

## 📦 Deployment

The application is ready to be deployed to any static hosting service. Here are some deployment options:

### Vercel
1. Push your code to a GitHub/GitLab/Bitbucket repository
2. Import the repository to Vercel
3. Vercel will automatically detect the Vite project and set up the build and output settings

### Netlify
1. Push your code to a Git repository
2. Create a new site from Git in Netlify
3. Set the build command to `npm run build`
4. Set the publish directory to `dist`
5. Deploy the site

### GitHub Pages
1. Update the `vite.config.js` with your repository name
2. Install `gh-pages`: `npm install --save-dev gh-pages`
3. Add a deploy script to `package.json`:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
4. Run `npm run build` followed by `npm run deploy`

## 🛠 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Lint and fix files
- `npm run test:unit` - Run unit tests
- `npm run test:coverage` - Run unit tests with coverage report
- `npm run test:ui` - Run tests in UI mode
- `npm run test:e2e` - Run end-to-end tests

## Testing

The project uses [Vitest](https://vitest.dev/) for unit testing, which provides a fast and Vite-native test runner.

### Test Coverage

- **Current Coverage**:
  - `AppHeader.vue` - Tests for mobile menu toggling, navigation, and responsive behavior

### Running Tests

To run the test suite:

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:unit -- --watch

# Run tests with UI
npm run test:ui
```

### Test Structure

Tests are located in the `test` directory, mirroring the `src` directory structure. For example, tests for `src/components/layout/AppHeader.vue` are in `test/components/layout/AppHeader.spec.js`.

### Writing Tests

When adding new components, please include corresponding test files. Follow these patterns:

1. Test component rendering and basic functionality
2. Test user interactions (clicks, form inputs, etc.)
3. Test component state changes
4. Test edge cases and error states

### Test Dependencies

- `@vue/test-utils` - Vue component testing utilities
- `jsdom` - DOM implementation for Node.js
- `happy-dom` - Alternative DOM implementation for faster testing
- `@vitest/ui` - UI for viewing test results

### Test Setup

The test environment is configured in `vite.config.js` with the following settings:
- jsdom environment
- Global test setup in `test/setup.js`
- Coverage reporting with specific exclusions

### Future Testing Goals

- [ ] Add tests for all major components
- [ ] Implement component snapshot testing
- [ ] Add integration tests for store actions
- [ ] Set up end-to-end testing with Cypress

## Project Structure

```
src/
├── assets/           # Static assets (images, fonts, etc.)
├── components/       # Reusable Vue components
│   ├── layout/       # Layout components (header, footer, etc.)
│   └── shows/        # TV show related components
├── composables/      # Vue 3 composables
├── router/           # Vue Router configuration
├── stores/           # Pinia stores
├── styles/           # Global styles and variables
└── views/            # Page components
```

## Customization

### Theming

You can customize the theme by modifying the `tailwind.config.js` file. The color palette and other design tokens are defined there.

### Environment Variables

- `VITE_APP_TITLE` - Application title
- `VITE_APP_API_BASE_URL` - Base URL for the TVMaze API

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request




