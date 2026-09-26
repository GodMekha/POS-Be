import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // api-pos ເປີດ CORS ໃຫ້ http://localhost:8000 ເທົ່ານັ້ນ
  server: { port: 8000, strictPort: true },
  preview: { port: 8000 },
})
