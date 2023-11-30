<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div>
        <!--        检验鉴定模块-->
        <el-steps :active="active1" finish-status="success" align-center style="margin-top: 20px">
          <el-step title="采集对象"></el-step>
          <el-step title="采样人员基本要求"></el-step>
          <el-step title="样本采样基本要求"></el-step>
          <el-step title="采集样本种类"></el-step>
          <el-step title="样本采集和处理"></el-step>
          <el-step title="样本包装和保存"></el-step>
          <el-step title="标本送检"></el-step>
          <el-step title="采集样本种类"></el-step>
        </el-steps>


        <el-button v-if="active1 < 8" class="next-button" size="large" @click="next">
          下一步
        </el-button>
        <el-button v-if="active1 === 8" class="exit-button" size="large" @click="back">
          返回
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { get } from "@/net";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import Sidebar from '../../components/sideBar/SideBar.vue';
import { Delete, RefreshRight, Search, Plus, Filter } from "@element-plus/icons-vue"
import { ElConfigProvider } from "element-plus";
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const active1 = ref(0)

const next = () => {
  if (active1.value++ > 7) active1.value = 0
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

.next-button {
  position: fixed;
  bottom: 20px;
  right: 60px;
}

.exit-button {
  position: fixed;
  bottom: 20px;
  right: 60px;
}
</style>
