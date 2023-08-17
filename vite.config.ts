import {fileURLToPath, URL} from 'node:url'

import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [
      vue(),
    ],
    envDir: "./",
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
})