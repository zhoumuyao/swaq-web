<template>
  <div class="app">
    <div class="content">
      <homePage :key="componentKey" style="margin-top: 1vh"></homePage>
      <div>
        <el-button @click="logout" type="danger" plain style="margin-left: 80%">退出登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { get } from "@/net";
import { ElMessage } from "element-plus";
import router from "@/router";
import HomePage from "@/components/homePage/homePage.vue";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

const componentKey = ref(0);

const logout = () => {
  get('/api/auth/logout', (message) => {
    ElMessage.success(message);
    router.push('/');
  });
};

const handleWindowResize = () => {
  componentKey.value += 1; // 强制重新渲染组件
};

onMounted(() => {
  window.addEventListener('resize', handleWindowResize); // 监听窗口大小变化
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleWindowResize); // 组件销毁时移除事件监听器
});

watch(() => window.innerWidth, handleWindowResize); // 监听窗口宽度变化
</script>

<style scoped>
.app {
  display: flex;
}

.content {
  flex: 1;
  margin-left: 200px; /* 与侧边栏宽度对应 */
  /* 添加其他样式，如内容区域的填充等 */
}
</style>
