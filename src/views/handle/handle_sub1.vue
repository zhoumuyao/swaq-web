<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div>
        <!--        现场详细勘察模块-->
        <el-steps :active="active" finish-status="success" align-center style="margin-top: 20px">
          <el-step title="现场详细勘察" ></el-step>
          <el-step title="现场信息智能录入"></el-step>
          <el-step title="现场无害化处理"></el-step>
          <el-step title="评价与反馈"></el-step>
        </el-steps>
      </div>

      <div class="center-container">
        <el-card class="card_box">
          <div style="width: 100%;height: 75vh;">
            <embed src="src/views/handle/PDF/recordingAndProtection.pdf" type="application/pdf"
                   width="100%" height="100%">
          </div>
        </el-card>
      </div>

      <!-- 切换页面-->
      <router-link :to="{path: '/handle1'}">
        <el-button class="next-button" type="primary" size="large">
          返回
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { get } from "@/net";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import Sidebar from '@/components/sideBar/SideBar.vue';

// 当前步骤
const active = ref(0);

const form = ref({
  name : '',
})

</script>

<style scoped>
.app {
  display: flex;
  height: 100vh;
}

.content {
  flex: 1;
  margin-left: 200px; /* 与侧边栏宽度对应 */
  /* 添加其他样式，如内容区域的填充等 */
}
.next-button {
  position: fixed;
  bottom: 7%;
  right: 7%;
}
.center-container{
  position: fixed;
  top: 100px;
  width: 89%;
  height: 100%;
}

.card_box{
  height:85%;
  overflow-y:auto;
  overflow-x:hidden;
  margin:0px 100px 0px 40px;
}
</style>
