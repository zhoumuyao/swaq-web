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
<!--          <el-step title="评价与反馈"></el-step>-->
        </el-steps>
      </div>

      <div class="center-container">
        <el-card class="card_box">
          <el-tabs v-model="activeName" type="border-card"  class="el-tabs">
            <el-tab-pane label="保留现场" name="first"  class="el-tab-pane">
                <el-card class="left-top-container" shadow="hover">
                  <!-- 左上方的内容 -->
                  <div slot="header" class="card-title">
                    <span style="margin:0 42%;">决策结果</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="copy('result')">复制</el-button>
                    <el-divider></el-divider>
                    <div style="width: 100%;height: 90%;margin-right: 40px;">
                      <div style="width: 100%;height: 70vh">
                        <embed :src="DecisionMakingResults" type="application/pdf"
                               width="100%" height="80%">
                      </div>
                    </div>
                  </div>
                </el-card>
                <el-card class="left-bottom-container" shadow="hover">
                  <!-- 左下方的内容 -->
                  <div slot="header" class="card-title">
                    <span style="margin:0 42%;">处置建议</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="copy('suggest')">复制</el-button>
                    <el-divider></el-divider>
                  </div>
                  <div style="width: 100%;height: 90%;margin-right: 40px;">
                    <div style="width: 100%;height: 100vh;">
                      <embed :src="adviceSave" type="application/pdf"
                             width="100%" height="50%">
                    </div>
                  </div>
                  <!-- 循环遍历处置意见-->
                  <!--              <div>-->
                  <!--                <div class="suggest" v-for="(suggest,index) in Suggests" :key="index" style="margin-top: 15px">-->
                  <!--                  {{index+1}}、{{suggest}}-->
                  <!--                </div>-->
                  <!--              </div>-->
                </el-card>
                <el-card class="right-container" shadow="hover">
                  <!-- 右侧的内容 -->
                  <div slot="header" class="card-title" >
                    <span style="margin:0 43%;">Tips</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="copy('tips')">复制</el-button>
                  </div>
                  <!-- 循环遍TIPS-->
                  <div style="width: 100%;height: 90%;margin-right: 40px;">
                    <div style="width: 100%;height: 100vh;">
                      {{Tips1}}
                    </div>
                  </div>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="不保留现场" name="second" class="el-tab-pane">
              <el-card class="left-top-container" shadow="hover">
              <!-- 左上方的内容 -->
              <div slot="header" class="card-title">
                <span style="margin:0 42%;">决策结果</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="copy('result')">复制</el-button>
                <el-divider></el-divider>
                <div style="width: 100%;height: 90%;margin-right: 40px;">
                  <div style="width: 100%;height: 70vh">
                    <embed :src="DecisionMakingResults" type="application/pdf"
                           width="100%" height="95%">
                  </div>
                </div>
              </div>
            </el-card>
              <el-card class="left-bottom-container" shadow="hover">
                <!-- 左下方的内容 -->
                <div slot="header" class="card-title">
                  <span style="margin:0 42%;">处置建议</span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="copy('suggest')">复制</el-button>
                  <el-divider></el-divider>
                </div>
                <div style="width: 100%;height: 90%;margin-right: 40px;">
                  <div style="width: 100%;height: 100vh;">
                    <embed :src="adviceNotSave" type="application/pdf"
                           width="100%" height="40%">
                  </div>
                </div>
                <!-- 循环遍历处置意见-->
                <!--              <div>-->
                <!--                <div class="suggest" v-for="(suggest,index) in Suggests" :key="index" style="margin-top: 15px">-->
                <!--                  {{index+1}}、{{suggest}}-->
                <!--                </div>-->
                <!--              </div>-->
              </el-card>
              <el-card class="right-container" shadow="hover">
                <!-- 右侧的内容 -->
                <div slot="header" class="card-title" >
                  <span style="margin:0 43%;">Tips</span>
                  <el-button style="float: right; padding: 3px 0" type="text" @click="copy('tips')">复制</el-button>
                </div>
                <!-- 循环遍TIPS-->
                <div style="width: 100%;height: 90%;margin-right: 40px;">
                  <div style="width: 100%;height: 100vh;">
                    {{Tips2}}
                  </div>
                </div>
              </el-card>
            </el-tab-pane>
          </el-tabs>

        </el-card>
      </div>

      <!-- 切换页面-->
      <router-link :to="{path: '/handle2'}">
        <el-button class="previous-button" type="primary" size="large">
          上一步
        </el-button>
      </router-link>

      <router-link :to="{path: '/handle4'}">
        <el-button class="next-button" type="primary" size="large">
          完成
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { get } from "@/net";
import { ElMessage } from "element-plus";
import DecisionMakingResults from './PDF/DecisionMakingResults.pdf'
import DisposalRecommendations from './PDF/DisposalRecommendations.pdf'
import adviceNotSave from './PDF/advice_notSave.pdf'
import adviceSave from './PDF/advice_save.pdf'
import { useRouter } from "vue-router";
import Sidebar from '@/components/sideBar/SideBar.vue';
import jsPDF from 'jspdf';
// 当前步骤
const active = ref(2);
const value = ref('');
const activeName = ref('first')

const location = ref({ lat: 0, lng: 0 });

const Results = ref(['紧急撤离： 首要任务是确保所有人员的安全。因此，迅速进行紧急撤离，并使用紧急广播系统通知所有在场人员。',
  '隔离事故现场： 立即采取措施将事故现场隔离，防止泄漏物质扩散到其他区域。',
  // '呼叫紧急救援： 通过紧急通讯渠道向相关紧急救援团队报告事故，并提供必要的信息，如事故类型、泄漏物质特性等。',
  '启动紧急预案： 启动事先准备好的生物危害事故应急预案，确保各项紧急措施按照预案有序展开。'])

const Suggests = ref("穿戴个人防护装备： 参与处置的救援人员必须穿戴适当的个人防护装备，包括防护服、口罩等。'\n    '阻止泄漏源： 尽可能采取措施阻止泄漏源，如关闭泄漏容器、切断泄漏管路等。',\n    // '生物灭活处理： 采取生物灭活剂或其他合适的灭活措施，防止生物物质继续扩散',\n    // '健康监测与治疗： 对可能受到污染的人员进行健康监测，确保他们接受及时的医疗治疗。',\n    '监测与后续防范： 对事故后的环境进行监测，实施必要的后续防范工作，确保再次发生类似事故的风险最小化。'"

)

const Tips1 = ref(
  "穿戴适当的个人防护装备·避免直接接触·定期洗手·隔离受感染区域·限制人员流动·报告有关部门"
)
const Tips2 = ref(
    "清理并消毒现场·安全处置废弃物·撤离无关人员·通风换气·恢复正常秩序·记录和报告"
)

const copy = (selector) =>{
  let elements = null;
  if (selector === 'suggest'){
    elements = document.querySelectorAll('.suggest');
  }else if(selector === 'result'){
    elements = document.querySelectorAll('.result');
  }else {
    elements = document.querySelectorAll('.tips');
  }

  // 将所有元素的内容拼接成一个字符串
  const suggestText = Array.from(elements).map(element => element.innerText).join("\n");

  // 创建临时textarea元素以复制文本
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = suggestText;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();

  // 执行复制操作
  document.execCommand("copy");

  // 移除临时创建的textarea
  document.body.removeChild(tempTextArea);



  ElMessage({
    message: '已复制到剪贴板',
    grouping: true,
    type: 'success',
  })



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
  bottom: 7%;
  left: 83%;
}

.next-button {
  position: fixed;
  bottom: 7%;
  right: 6%;
}
.center-container{
  position: fixed;
  top: 100px;
  width: 89%;
  height: 100%;
}

.card_box{
  height:85%;
  display: flex;
  flex-direction: column;
  //overflow-y:auto;
  overflow-x:hidden;
  margin:0 60px 0 40px;
}

.left-top-container{
  position: absolute;
  top: 4%;
  left: 6%;
  width: 40%;
  height: 85%;
}
.left-bottom-container{
  position: absolute;
  top: 4%;
  left: 50%;
  width: 40%;
  height: 60%;
}

.right-container{
  position: absolute;
  top: 70%;
  left: 50%;
  width: 40%;
  height: 19%;
}
.el-tabs {
  height: 100%;
  display: grid;
  flex-direction: column;
}

.el-tab-pane {
  display: grid;
  margin-bottom: 50%;
  flex-grow: 1;
}

.card-title{
  font-size: medium;
}

</style>
