import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server:{
    proxy:{
      "/api": "http://localhost:3000",
      "/login": "http://localhost:3000",
      "/register":"http://localhost:3000",
      "/logout":"http://localhost:3000",
    }
  }
})
