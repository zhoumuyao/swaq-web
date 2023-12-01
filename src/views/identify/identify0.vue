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
            <!-- 样本采集及运输步骤条 -->
            <div>
              <el-steps :active="active1" finish-status="success" align-center style="margin-top: 20px">
                <el-step title="采集对象"></el-step>
                <el-step title="采样人员基本要求"></el-step>
                <el-step title="样本采样基本要求"></el-step>
                <el-step title="采集样本种类"></el-step>
                <el-step title="样本采集和处理"></el-step>
                <el-step title="样本包装和保存"></el-step>
                <el-step title="标本送检"></el-step>
              </el-steps>
            </div>
            <div style="  display: flex;justify-content: center;align-items: flex-start; margin-top: 2vh;">
              <el-card class="card_container">
                <!-- 采集对象 -->
                <div v-if="active1 === 0" class="center-container">
                  <el-card style="height: 55vh;width: 20vw;margin-left: 40px">
                    可疑感染人员
                  </el-card>
                  <el-card style="height: 55vh;width: 20vw;">
                    待检测的人员
                  </el-card>
                  <el-card style="height: 55vh;width: 20vw;margin-right: 40px">
                    污染物品
                  </el-card>
                </div>
                <!-- 采样人员基本要求 -->
                <div v-if="active1 === 1" class="center-container">
                  <p class="styled-text">{{ text1 }}</p>
                </div>
                <!-- 样本采样基本要求 -->
                <div v-if="active1 === 2" class="center-container">
                  <p class="styled-text">{{ text2 }}</p>
                </div>
                <!-- 采集样本种类 -->
                <div v-if="active1 === 3" class="center-container">
                  <p class="styled-text">{{ text3 }}</p>
                </div>
                <!-- 样本采集和处理 -->
                <div v-if="active1 === 4" style="display: block;">
                  <div class="search-card">
                    <el-form ref="form" :model="form" :inline="true">
                      <el-form-item label="样本种类：" style="width: 500px">
                        <el-input v-model="description" :autosize="{ minRows: 1, maxRows: 1 }" type="textarea" style="width: 500px;" placeholder="" />
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" :icon="Search" @click="handleSearch">一键查询</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="search-content">
                    <el-card style="width: 80vw;height: 50vh;">显示查询文字 : {{ description }}</el-card>
                  </div>
                  <div>

                  </div>
                </div>
                <!-- 样本包装和保存 -->
                <div v-if="active1 === 5" class="center-container">
                  <el-card style="width: 45%;height: 55vh;margin-left: 40px;">
                    <label>显示图片</label>
                  </el-card>
                  <el-card style="width: 45%;height: 55vh;margin-right: 40px;">
                    <label>显示文字</label>
                  </el-card>
                </div>
                <!-- 标本送检 -->
                <div v-if="active1 === 6" class="center-container">
                  <el-card style="width: 45%;height: 55vh;margin-left: 40px;">
                    <label>显示图片</label>
                  </el-card>
                  <el-card style="width: 45%;height: 55vh;margin-right: 40px;">
                    <label>显示文字</label>
                  </el-card>
                </div>
                <el-button v-if="active1 > 0" class="back-button" size="large" @click="back1" type="primary">
                  上一步
                </el-button>
                <el-button v-if="active1 < 6" class="next-button" size="large" @click="next1" type="primary">
                  下一步
                </el-button>
                <!-- <el-button v-if="active1 === 8" class="exit-button" size="large" @click="back">
                    返回
                  </el-button> -->

              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane label="实验室检测" name="second">
            <!-- 实验室检测步骤条 -->
            <div>
              <el-steps :active="active2" finish-status="success" align-center style="margin-top: 20px">
                <el-step title="实验室活动生物安全要求"></el-step>
                <el-step title="检测人员要求"></el-step>
                <el-step title="检测方法"></el-step>
              </el-steps>
            </div>
            <div style="  display: flex;justify-content: center;align-items: flex-start; margin-top: 2vh;">
              <el-card class="card_container">
                <el-button v-if="active2 < 3" class="next-button" size="large" @click="next2" type="primary">
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
import { ref, reactive } from 'vue';
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
const description = ref('')

const text1 = ref("采样人员基本要求")
const text2 = ref("样本采集基本要求")
const text3 = ref("采集样本种类")
const text4 = ref("样本采集和处理")
const text5 = ref("样本包装和保存")
const text6 = ref("标本送检")

const next1 = () => {
  if (active1.value++ > 5) active1.value = 0
}
const back1 = () => {
  if (active1.value-- < 0) active1.value = 0
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

.card_container {
  justify-content: center;
  height: 70vh;
  width: 80vw;
  position: relative;
}

.styled-text {
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
  /* color: #333;
  background-color: #f5f5f5; */
  padding: 20px;
  /* border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
}

.back-button {
  position: absolute;
  bottom: 10px;
  /* 距离底部的间距 */
  right: 100px;
}

.next-button {
  position: absolute;
  bottom: 10px;
  /* 距离底部的间距 */
  right: 10px;
  /* 距离右侧的间距 */
}

.search-card {
  width: 100%;
  /* background-color: aquamarine; */
  display: flex;
  justify-content: center;
}

.search-content {
  width: 100%;
  /* background-color: black; */
  display: flex;
  justify-content: center;
}

.center-container {
  display: flex;
  justify-content: space-between;
}

.exit-button {
  bottom: 20px;
  right: 60px;
}
</style>
