import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/inkmotion/',
  plugins: [react()],
  build: {
    outDir: 'dist-demo',
  },
})
