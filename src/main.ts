import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import "@/assets/reset.css"
import "@/assets/theme.css"
import App from './App.vue'
import router from './router'
import {Mock} from "@/mock";

const app = createApp(App)

// Mock()

app.use(createPinia())
app.use(ArcoVue)
app.use(router)

app.mount('#app')
