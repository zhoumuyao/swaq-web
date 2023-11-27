<template>
  <div style="width: 100vw;height: 100vh;overflow: hidden;display: flex">
    <div style="flex: 1;background-color: dodgerblue">
      <el-image style="width: 100%;height: 100%" fit="cover"
                src="https://img2.baidu.com/it/u=635812276,1213380653&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800"></el-image>
    </div>
    <div class="welcome-title">
      <div style="font-size: 30px;font-weight: bold" :style="{ width: `${windowWidth - 350}px` }">欢迎来到生物安全项目</div>
      <div style="font-size: 18px;margin-top: 1vh" :style="{ width: `${windowWidth - 350}px` }">本系统包含风险评估、现场处置、检验鉴定等模块</div>
    </div>
    <div style="width: 20vw;min-width: 300px">
      <router-view v-slot="{Component}">
        <transition mode="out-in" name="el-fade-in-linear">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const windowWidth = ref(window.innerWidth);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.welcome-title{
  position: absolute;
  bottom: 3vh;
  left: 2vw;
  color: white;
  text-shadow: 0 0 10px black;
}
</style>
