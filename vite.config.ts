import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')

const config = loadEnv('', './')

// https://vitejs.dev/config/
export default defineConfig({
  base: config.VITE_APP_BASE_URL,
  server: {
    host: '0.0.0.0',
    port: 3000,
    // 是否开启 https
    https: false,
  },
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ],
  }
})
