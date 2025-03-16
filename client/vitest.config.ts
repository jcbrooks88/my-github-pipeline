import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Enables expect, vi, etc. without needing explicit imports
    environment: 'jsdom', // Ensures a browser-like environment
  },
});
