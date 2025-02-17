
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { reactive } from 'vue';

import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import axios from "axios";

const app = createApp(App)

const modelURL = 'http://122.51.86.39:5007';

//const modelURL = "https://3e0a-42-228-225-150.ngrok-free.app"

app.provide('modelURL', modelURL); //便于在js部分可直接用

// 开发环境用localhost
axios.defaults.baseURL = 'http://localhost:8080'

// 给甲方用的公网镜像
 //axios.defaults.baseURL = 'https://f073-42-228-225-150.ngrok-free.app'

app.use(createPinia())
app.use(router)

app.mount('#app')