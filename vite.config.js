import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'

export default defineConfig({
  base: process.env.VITE_BASE || '/recipe-finder/', // CI sets VITE_BASE; local fallback
  plugins: [react()],
})
