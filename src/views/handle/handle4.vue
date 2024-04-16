<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div>
        <!--        现场处置模块-->
        <el-steps :active="active" finish-status="success" align-center style="margin-top: 20px">
          <el-step title="现场详细勘察" ></el-step>
          <el-step title="现场信息智能录入"></el-step>
          <el-step title="现场无害化处理"></el-step>
          <el-step title="评价与反馈"></el-step>
        </el-steps>
      </div>

      <div v-if="active === 3" class="center-container">
        <el-card class="card_box">
          <div style="margin-left:40%;margin-top: 50px">
            <div>现场处置评分</div>
            <div>
              <el-rate
                  style="margin-left:0%"
                  v-model="Starvalue"
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
          <div style="float: right;margin-top: 50px;margin-right: 50px"><el-button type="primary" @click="submit">提交</el-button></div>
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

      <!-- 切换页面-->
      <router-link :to="{path: '/handle3'}">
        <el-button class="previous-button" type="primary" size="large">
          上一步
        </el-button>
      </router-link>

      <router-link :to="{path: '/handle1'}">
        <el-button class="next-button" type="primary" size="large">
          结束
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
const active = ref(3);
const Starvalue = ref(0);
const texts = ref(['完全没有帮助','几乎没有帮助','有一点参考价值','较好参考价值','非常具有参考价值']);
const textarea = ref('')
const alertVisible = ref(false)

const submit = () => {
  if(textarea.value !== '' && Starvalue.value > 0){
    alertVisible.value = true;
  }
}
//
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

.previous-button{
  position: fixed;
  bottom: 3%;
  left: 80%;
}

.next-button {
  position: fixed;
  bottom: 3%;
  right: 7%;
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
  height:85%;
  overflow-y:auto;
  overflow-x:hidden;
  margin:0px 100px 0px 40px;
}

.box-card{
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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

.scrollbar-wrapper {
  margin-left: 360px;
  margin-top: 50px;
  width: 30%;
}

</style>
