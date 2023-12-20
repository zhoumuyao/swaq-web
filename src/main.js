
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import axios from "axios";

const app = createApp(App)
// axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.baseURL = 'https://3ce7-219-230-76-35.ngrok-free.app'

app.use(createPinia())
app.use(router)

app.mount('#app')
