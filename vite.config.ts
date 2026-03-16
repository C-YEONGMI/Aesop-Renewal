import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr' // 1. svgr 임포트

export default defineConfig({
  plugins: [
    react(),
    svgr() // 2. 플러그인 리스트에 추가
  ],
})