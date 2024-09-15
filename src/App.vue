<script setup>
import Sidebar from '@/components/sideBar/SideBar.vue';
import { useRouter } from 'vue-router';
import {ref} from "vue";

const router = useRouter();
const showSidebar = ref(true); // 定义 showSidebar 变量并初始化为 true

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 判断当前路由是否为根路径
  const shouldHideSidebar = (to.path === '/' || to.path === '/register' || to.path === '/forget');

  // 更新侧边栏的状态
  showSidebar.value = !shouldHideSidebar;

  // 执行完逻辑后，继续导航
  next();
});
</script>
<template>
  <div>
    <Sidebar v-if="showSidebar"></Sidebar>
    <router-view></router-view>
  </div>
</template>

<style scoped>

</style>
