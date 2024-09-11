
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import axios from "axios";

const app = createApp(App)
// 开发环境用localhost
axios.defaults.baseURL = 'http://localhost:8080'

// 给甲方用的公网镜像
// axios.defaults.baseURL = 'https://fee3-219-230-74-133.ngrok-free.app'

app.use(createPinia())
app.use(router)

app.mount('#app')
