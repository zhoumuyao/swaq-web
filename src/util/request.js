// src/utils/request.js
import axios from 'axios';

const service = axios.create({
});

// 请求拦截器：在请求头中添加 token
service.interceptors.request.use(
    config => {
        if (!localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default service;