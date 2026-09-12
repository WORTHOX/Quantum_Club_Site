import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('postprocessing')) {
              return 'vendor-three'
            }
            if (id.includes('gsap')) {
              return 'vendor-gsap'
            }
            if (id.includes('react') || id.includes('scheduler')) {
              return 'vendor-react'
            }
          }
        }
      }
    }
  }
})
