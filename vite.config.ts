import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        // Emit the internal /ladder page into its own predictable directory so a
        // Netlify edge function can gate it. Code splitting is otherwise untouched:
        // this only changes where that one lazy chunk is written.
        chunkFileNames(chunkInfo) {
          return chunkInfo.name === 'OfferLadder'
            ? 'ladder-private/[name]-[hash].js'
            : 'assets/[name]-[hash].js';
        },
      },
    },
  },
});
