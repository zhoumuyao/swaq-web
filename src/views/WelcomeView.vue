<template>
  <div style="width: 100vw;height: 100vh;overflow: hidden;display: flex; ">
    <div style="flex: 1;text-align: center; margin-top: 25vh;">
      <el-image style="width: 35vw;height: 40vh" fit="fill"
                src="public/image.png"></el-image>
    </div>
    <div class="welcome-title">
      <div style="font-size: 30px;font-weight: bold" :style="{ width: `${windowWidth - 350}px` }">欢迎来到生物安全项目</div>
      <div style="font-size: 18px;margin-top: 1vh" :style="{ width: `${windowWidth - 350}px` }">本系统包含风险评估、现场处置、检验鉴定等模块</div>
    </div>
    <div style="width: 20vw;min-width: 300px; box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); border-radius: 4px">
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
