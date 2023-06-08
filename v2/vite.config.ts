import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/CaptureD2L/",
  plugins: [react()],
  build: {
    target: 'esnext',
  }
})
