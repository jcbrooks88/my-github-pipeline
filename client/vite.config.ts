import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: isDev
      ? {
          '/api': {
            target: 'http://localhost:3001', // Backend in development
            changeOrigin: true,
            secure: false,
          },
        }
      : undefined, // No proxy in production
  },
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(
      process.env.VITE_API_URL || 'https://my-github-pipeline.onrender.com/api'
    ),
  },
});
