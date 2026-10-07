import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// In development the React app runs on :5173 and proxies API + uploads to the Node server on :4000.
const API = `http://localhost:${process.env.PORT || 4000}`;

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { '/api': API, '/uploads': API },
  },
});
