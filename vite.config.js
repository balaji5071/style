// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    loader: 'jsx', // Set loader for .js files to 'jsx'
    include: /src\/.*\.js/, // Ensure this applies to .js files inside the src folder
  },
})
