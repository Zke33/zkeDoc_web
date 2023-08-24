## 使用环境变量

用于不同环境下的开发

vite.config.ts

```Vue
import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        vue(),
    ],
    envDir: "./",  // 那个文件相对于根目录的位置
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})


```



.env.development

```Vue
VITE_APP_ID=123456

```





ts类型提示

env.d.ts

```Vue
/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_APP_ID: string
    VITE_SERVER_URL: string
}
```





使用

```Vue
console.log(import.meta.env)
```





### 多环境

默认的一些环境

本地环境（local）

开发环境（development）

测试环境（devtest）

预发布环境（beta）

生产环境（production）



在package.json中配置

```Vue
 "scripts": {
  "dev": "vite",  // 默认是 development
  "dev_1": "vite --mode dev_1",
},
```



### 在vite.config.ts里面使用环境变量

一般是代理的时候，设置基础路由



```Vue
import {fileURLToPath, URL} from 'node:url'

import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd());
    console.log(env.VITE_APP_ID)
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

```





## 代理

一般是做跨域请求的时候使用，解决跨域常见的操作有以下几种

1. 开发环境，前端使用代理
2. 开发环境，后端放行所有跨域请求
3. 生产环境，不存在跨域请求
4. jsonp，现在不咋使用



vite.config.ts

```TypeScript
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
                },
                "/uploads": {
                    target: env.VITE_SERVER_URL,
                    changeOrigin: true,
                },
            }
        }
    })
})
```

用这个的前提，一定要把axios的`baseUrl`给注掉

```Go
import axios from "axios";

export const useAxios = axios.create({
    // baseURL: "",
})
```