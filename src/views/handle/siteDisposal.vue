<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div>
        <!--        现场处置模块-->
        <el-steps :active="active" finish-status="success" align-center style="margin-top: 20px">
          <el-step title="现场详细勘察" ></el-step>
          <el-step title="现代信息智能录入"></el-step>
          <el-step title="现场无害化处理"></el-step>
          <el-step title="评价与反馈"></el-step>
        </el-steps>
      </div>

      <div v-if="active === 2" class="center-container">
        <el-card class="card_box">
          <el-card class="left-top-container">
            <!-- 左上方的内容 -->
            <div slot="header" class="card-title">
              <span>-决策结果</span>
              <el-button style="float: right; padding: 3px 0" type="text">复制</el-button>
            </div>
          </el-card>

          <el-card class="left-bottom-container">
            <!-- 左下方的内容 -->
            <div slot="header" class="card-title">
              <span>-处置建议</span>
              <el-button style="float: right; padding: 3px 0" type="text">复制</el-button>
            </div>
          </el-card>

          <el-card class="right-container">
            <!-- 右侧的内容 -->
            <div slot="header" class="card-title">
              <span>-Tips</span>
              <el-button style="float: right; padding: 3px 0" type="text">复制</el-button>
            </div>
          </el-card>
        </el-card>
      </div>

      <!-- 切换页面-->
      <router-link :to="{path: '/handle4'}">
        <el-button class="next-button" size="large">
          下一步
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
const active = ref(2);
const value = ref('');


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
  bottom: 20px;
  right: 60px;
}
.center-container{
  position: fixed;
  top: 100px;
  width: 89%;
  height: 100%;
}

.card_box{
  height:100%;
  overflow-y:auto;
  overflow-x:hidden;
}

.left-top-container{
  position: fixed;
  top: 20%;
  left: 21%;
  width: 50%;
  height: 35%;
}
.left-bottom-container{
  position: fixed;
  top: 60%;
  left: 21%;
  width: 50%;
  height: 35%;
}

.right-container{
  position: fixed;
  top: 20%;
  right: 5%;
  width: 20%;
  height: 65%;
}

.card-title{
  font-size: larger;
}


</style>
