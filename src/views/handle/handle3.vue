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

      <div class="center-container">
        <el-card class="card_box">
          <el-card class="left-top-container" shadow="hover">
            <!-- 左上方的内容 -->
            <div slot="header" class="card-title">
              <span style="margin:0 43%;">决策结果</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="copy('result')">复制</el-button>
              <el-divider></el-divider>
            </div>
            <!-- 循环遍历决策结果-->
            <div class="result" v-for="(result,index) in Results" :key="index" style="margin-top: 15px">{{index+1}}、{{result}}
            </div>
          </el-card>

          <el-card class="left-bottom-container" shadow="hover">
            <!-- 左下方的内容 -->
            <div slot="header" class="card-title">
              <span style="margin:0 43%;">处置建议</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="copy('suggest')">复制</el-button>
              <el-divider></el-divider>
            </div>
            <!-- 循环遍历处置意见-->

            <div>
              <div class="suggest" v-for="(suggest,index) in Suggests" :key="index" style="margin-top: 15px">
                {{index+1}}、{{suggest}}
              </div>
            </div>
          </el-card>

          <el-card class="right-container" shadow="hover">
            <!-- 右侧的内容 -->
            <div slot="header" class="card-title" >
              <span style="margin:0 43%;">Tips</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="copy('tips')">复制</el-button>
              <el-divider></el-divider>
            </div>
            <!-- 循环遍TIPS-->
            <div>
              <div class="tips" v-for="(tip,index) in Tips" :key="index" style="margin-top: 15px">
                {{index+1}}、{{tip}}
              </div>
            </div>
          </el-card>
        </el-card>
      </div>

      <!-- 切换页面-->
      <router-link :to="{path: '/handle4'}">
        <el-button class="next-button" type="primary" size="large">
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

const Results = ref(['紧急撤离： 首要任务是确保所有人员的安全。因此，迅速进行紧急撤离，并使用紧急广播系统通知所有在场人员。',
  '隔离事故现场： 立即采取措施将事故现场隔离，防止泄漏物质扩散到其他区域。',
  // '呼叫紧急救援： 通过紧急通讯渠道向相关紧急救援团队报告事故，并提供必要的信息，如事故类型、泄漏物质特性等。',
  '启动紧急预案： 启动事先准备好的生物危害事故应急预案，确保各项紧急措施按照预案有序展开。'])

const Suggests = ref([
    '穿戴个人防护装备： 参与处置的救援人员必须穿戴适当的个人防护装备，包括防护服、口罩、护目镜等。',
    '阻止泄漏源： 尽可能采取措施阻止泄漏源，如关闭泄漏容器、切断泄漏管路等。',
    // '生物灭活处理： 采取生物灭活剂或其他合适的灭活措施，防止生物物质继续扩散',
    // '健康监测与治疗： 对可能受到污染的人员进行健康监测，确保他们接受及时的医疗治疗。',
    '监测与后续防范： 对事故后的环境进行监测，实施必要的后续防范工作，确保再次发生类似事故的风险最小化。'
])

const Tips = ref([
  '穿戴适当的个人防护装备： 包括口罩、手套、护目镜和防护服等。',
  '避免直接接触： 避免直接接触有可能受到污染或感染的物品、表面或生物。',
  '定期洗手： 使用肥皂和水彻底清洗双手，尤其在处理可能受到污染的物品之后。',
  '隔离受感染区域： 尽快隔离受感染或受污染的区域，以防止进一步传播。',
  '限制人员流动： 减少人员在受感染区域的进出，以避免疾病或有害物质传播。',
  '报告有关部门： 及时向当地的应急部门或卫生机构报告事件，并根据指示行事。',
  // ' 提供应急医疗服务： 为受伤或可能受感染的人员提供紧急医疗服务。',
  // '使用有效消毒剂： 使用有效的消毒剂对受感染或受污染的区域进行消毒，以确保杀灭可能的病原体或危险物质。'
])
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

.left-top-container{
  position: fixed;
  top: 16%;
  left: 18%;
  width: 50%;
  height: 30%;
}
.left-bottom-container{
  position: fixed;
  top: 55%;
  left: 18%;
  width: 50%;
  height: 30%;
}

.right-container{
  position: fixed;
  top: 16%;
  right: 9%;
  width: 20%;
  height: 69%;
}

.card-title{
  font-size: larger;
}

</style>
