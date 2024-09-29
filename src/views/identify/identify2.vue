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

        <el-row>
          <el-col :span="12">
            <el-card class="card_container">
              <span>
                生物危险因子检测
              </span>
              <div>

              </div>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card class="card_container">
              <span>
                染病个体解剖查验
              </span>
              <div>

              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-button
            class="back-button"
            size="large"
            @click="pre"
            type="primary"
        >上一步</el-button>
        <el-button
            class="next-button"
            size="large"
            @click="next"
            type="primary"
        >下一步</el-button>

      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import router from "@/router";
import {useRoute} from "vue-router";

const activeIndex =ref("/identify2")
const route = useRoute();
const id = route.query.id;
const back = route.query.back;

const handleSelect = (index) => {
  // 跳转到对应的路由并带上参数
  router.push({ path: index, query: { id: route.query.id, back: route.query.back } });
}

const pre = () =>{
  router.push({ path: "/identify1", query: { id: route.query.id, back: route.query.back } });
}

const next = () =>{
  router.push({ path: "/feedback", query: { id: route.query.id, back: route.query.back } });
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
  //display: flex;
  //justify-content: center;
  //align-items: center;
  margin: 30px;
  height: 75vh;
}

.back-button {
  position: absolute;
  bottom: 50px;
  /* 距离底部的间距 */
  right: 120px;
}

.next-button {
  position: absolute;
  bottom: 50px;
  /* 距离底部的间距 */
  right: 30px;
  /* 距离右侧的间距 */
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