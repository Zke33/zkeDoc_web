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
        },
        server: {
            host: "0.0.0.0",
            port: 80,
            proxy: {
                "/api": {
                    target: env.VITE_SERVER_URL,
                    changeOrigin: true,
                }
            }
        }
    })
})