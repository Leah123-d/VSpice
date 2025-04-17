import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
    tailwindcss()
  ],
  server: {
    proxy: {
      '/spices': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/users': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/shoppingLists': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
      ,
      '/vision': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
    }
  }
  
})