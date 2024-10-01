<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div>
        <!-- 检验鉴定模块-->
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
          <el-menu-item index="/identify0">生物危险因子检测</el-menu-item>
          <el-menu-item index="/judge">染病个体解剖查验</el-menu-item>
          <el-menu-item index="/identify2">检验鉴定报告</el-menu-item>
        </el-menu>

        <el-card class="card_container">
          <div style="font-size: large;font-weight: bolder;margin: 30px;">
            您即将跳转至 【染病个体解剖检查板块】 请选择
          </div>
          <div>
            <el-row :gutter="20">
              <el-col :span="12">
                <router-link :to="{path: '/identify1', query: { id: id, back: back }}">
                  <el-button type="primary" size="large">
                    是，本次检测包含染病尸体
                  </el-button>
                </router-link>
              </el-col>
              <el-col :span="12">
                <router-link :to="{path: '/identify2', query: { id: id, back: back }}">
                  <el-button type="primary" size="large">
                    否，本次检测不包含染病尸体
                  </el-button>
                </router-link>
              </el-col>
            </el-row>
          </div>
        </el-card>

      </div>
    </div>
  </div>

</template>

<script setup>
import router from "@/router";
import {useRoute} from "vue-router";
import {ref} from "vue";
import { useCounterStore } from '@/stores/counter';
const counterStore = useCounterStore()

const activeIndex = ref('/judge')
const route = useRoute();
const id = route.query.id;
const back = route.query.back;
const handleSelect = (index) => {
  // 跳转到对应的路由并带上参数
  router.push({ path: index, query: { id: route.query.id, back: route.query.back } });
}
</script>

<style scoped>
.app {
  display: flex;
  height: 100vh;
}

.content {
  flex: 1;
  margin-left: 200px;
  /* 与侧边栏宽度对应 */
  /* 添加其他样式，如内容区域的填充等 */
}

.demo-tabs :deep(.el-tabs__item) {
  margin-left: 30px;
  font-size: 16px !important;
  /* 设置你想要的字体大小 */
}

.card_container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
}

.el-menu-demo :deep(.el-menu-item) {
  font-size: 20px;
}


.vertical-tabs :deep(.el-tabs__item) {
  font-size: 16px !important;
  margin-bottom: 20px !important;
  /* 改变这个值来改变字体大小 */
}


</style>