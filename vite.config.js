import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'build'  // 設定輸出目錄為 build
  },
  plugins: [react()],
})
