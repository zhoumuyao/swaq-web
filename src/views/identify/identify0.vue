<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div>
        <!--        检验鉴定模块-->
        <h2>生物危险因子采集和检测技术</h2>

        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="样本采集及运输" name="first">
            <div style="  display: flex;justify-content: center;align-items: flex-start; margin-top: 2vh;">
              <el-card class="card_contaniner">
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
                <el-button v-if="active1 < 8" class="next-button" size="large" @click="next1">
                  下一步
                </el-button>
                <!-- <el-button v-if="active1 === 8" class="exit-button" size="large" @click="back">
                    返回
                  </el-button> -->

              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane label="实验室检测" name="second">
            <div style="  display: flex;justify-content: center;align-items: flex-start; margin-top: 2vh;">
              <el-card class="card_contaniner">
                <el-steps :active="active2" finish-status="success" align-center style="margin-top: 20px">
                  <el-step title="实验室活动生物安全要求"></el-step>
                  <el-step title="检测人员要求"></el-step>
                  <el-step title="检测方法"></el-step>
                </el-steps>
                <el-button v-if="active2 < 3" class="next-button" size="large" @click="next2">
                  下一步
                </el-button>
                <!-- <el-button v-if="active2 === 3" class="exit-button" size="large" @click="back">
                  返回
                </el-button> -->
              </el-card>
            </div>
          </el-tab-pane>
        </el-tabs>

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

const activeName = ref('first')
const active0 = ref(0)
const active1 = ref(0)
const active2 = ref(0)

const next1 = () => {
  if (active1.value++ > 7) active1.value = 0
}
const next2 = () => {
  if (active2.value++ > 7) active2.value = 0
}

</script>



<style>
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

.demo-tabs .el-tabs__item {
  margin-left: 30px;
  font-size: 20px;
  /* 设置你想要的字体大小 */
}

.card_contaniner {
  justify-content: center;
  height: 80vh;
  width: 80vw;
  position: relative;
}

.next-button {
  position: absolute;
  bottom: 10px;
  /* 距离底部的间距 */
  right: 10px;
  /* 距离右侧的间距 */
}

.exit-button {
  bottom: 20px;
  right: 60px;
}
</style>
