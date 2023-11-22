<template>
  <div class="app">
<!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div>
<!--        现场处置模块-->
        <el-steps :active="active" finish-status="success" align-center style="margin-top: 20px">
          <el-step title="基本信息上传" ></el-step>
          <el-step title="生物危险因子信息"></el-step>
          <el-step title="处置决策结果"></el-step>
          <el-step title="评价与反馈"></el-step>
        </el-steps>
      </div>
      <div class="center-container">
        <div v-if="active === 0" >
          <el-card style="height:100%;width:100%;overflow-y:auto;overflow-x:hidden;margin-left: 25px;margin-bottom: 0px;margin-right: 20px;">
            <div>
              <el-upload
                  class="upload-demo"
                  action=""
                  multiple
                  drag
                  style="width: 100%; margin-top: 330px"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将现场图片拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10Mb</div>
              </el-upload>
            </div>
          </el-card>
        </div>


        <div v-if="active === 1">
          <el-card style="height:100%;width:100%;overflow-y:auto;overflow-x:hidden;margin-left: 25px;margin-bottom: 0px;margin-right: 20px;">
            <div>
              <el-upload
                  class="upload-demo"
                  action=""
                  multiple
                  drag
                  style="width: 100%; margin-top: 330px"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将现场图片拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10Mb</div>
              </el-upload>
            </div>
          </el-card>
        </div>

        <div v-if="active === 2">
          <el-card style="height:100%;width:100%;overflow-y:auto;overflow-x:hidden;margin-left: 25px;margin-bottom: 0px;margin-right: 20px;">
            <div>
              <el-upload
                  class="upload-demo"
                  action=""
                  multiple
                  drag
                  style="width: 100%; margin-top: 330px"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将现场图片拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10Mb</div>
              </el-upload>
            </div>
          </el-card>
        </div>

        <div v-if="active === 3">
          <el-card style="height:100%;width:100%;overflow-y:auto;overflow-x:hidden;margin-left: 25px;margin-bottom: 0px;margin-right: 20px;">
            <div>
              <el-upload
                  class="upload-demo"
                  action=""
                  multiple
                  drag
                  style="width: 100%; margin-top: 330px"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将现场图片拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10Mb</div>
              </el-upload>
            </div>
          </el-card>

        </div>
      </div>
      <el-button class="next-button" size="large" @click="next">
        下一步
      </el-button>



      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { get } from "@/net";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import Sidebar from '../components/sideBar/SideBar.vue';

// 当前步骤
const active = ref(0);

// 触发下一步骤
const next = () => {
  active.value++;
  if (active.value > 3) active.value = 0;
}

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
.upload-demo {
  width: 400%;
  height: 200%;
}
.center-container{
  position:absolute;
  top: 100px;
  bottom: 0px;
  width: 83%;
}

.box-card{
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
