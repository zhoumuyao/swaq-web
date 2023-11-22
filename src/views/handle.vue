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
      <div v-if="active === 0" class="center-container">
        <el-card class="card_box">
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

      <div v-if="active === 1" class="center-container">
        <el-card class="card_box">
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

      <div v-if="active === 2" class="center-container">
        <el-card class="card_box">
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

      <div v-if="active === 3" class="center-container">
        <el-card class="card_box">
          <div style="margin-left: 50px;margin-top: 50px">
            <div>现场处置评分</div>
            <div>
              <el-rate
                  v-model="value"
                  :texts="texts"
                  show-text>
              </el-rate>
            </div>
          </div>
          <div style="margin: 50px 50px 0 50px">
            <el-input
                type="textarea"
                :autosize="{ minRows: 8, maxRows: 15}"
                placeholder="请输入您对本模块的反馈意见"
                v-model="textarea">
            </el-input>
          </div>
          <div style="float: right;margin-top: 50px;margin-right: 50px"><el-button type="primary" @click="sumit">提交</el-button></div>
        </el-card>
      </div>
      <el-alert
          v-if="alertVisible && active === 3"
          title="提交成功"
          type="success"
          description="感谢您的反馈意见，我们将根据反馈进行进一步优化！"
          show-icon
          @close="closeAlert">
      </el-alert>
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
const value = ref(0);
const texts = ref(['完全没有帮助','几乎没有帮助','有一点参考价值','较好参考价值','非常具有参考价值']);
const textarea = ref('')
const alertVisible = ref(false)

// 触发下一步骤
const next = () => {
  active.value++;
  if (active.value > 3) active.value = 0;
}

//当评分和输入框不为空时，触发提交
const sumit = () => {
  if(textarea.value !== '' && value.value > 0){
    alertVisible.value = true;
  }
}
//提示条Alert
const closeAlert= () => {
  alertVisible.value = false;
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

.box-card{
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
