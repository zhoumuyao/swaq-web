<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div style="padding: 20px; border-bottom: solid 2px; border-color: darkgray; ">
        <label style="font: 20px Extra large; display: inline-block; margin-left: 40%" >评价与反馈</label>
      </div>

<!--      <div>-->
        <!--        现场处置模块-->
<!--        <el-steps :active="active" finish-status="success" align-center style="margin-top: 20px">-->
<!--          <el-step title="现场详细勘察" ></el-step>-->
<!--          <el-step title="现场信息智能录入"></el-step>-->
<!--          <el-step title="现场无害化处理"></el-step>-->
<!--          <el-step title="评价与反馈"></el-step>-->
<!--        </el-steps>-->
<!--      </div>-->

      <div v-if="active === 3" class="center-container">
        <el-card class="card_box">
          <div style="margin-left:40%;margin-top: 50px">
            <div>生物安全处置评分</div>
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
          <div style="float: right;margin-top: 50px;margin-right: 50px"><el-button type="primary" @click="generateReport">生成简易报告</el-button></div>

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

      <router-link :to="{path: '/index'}">
        <el-button class="next-button" type="primary" size="large">
          结束
        </el-button>
      </router-link>
    </div>
    <el-drawer v-model="drawer" title="I am the title" :with-header="false" size="50%">
      <!--                <span>Hi there!</span>-->

      <div style="width: 100%;height: 100%;">
        <embed :src="report" type="application/pdf"
               width="100%" height="100%">
      </div>


    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { get } from "@/net";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import Sidebar from '@/components/sideBar/SideBar.vue';
import jsPDF from 'jspdf';
import uploadImage from './image/sj.jpg'
import ttf from './simhei.ttf'
import report from "@/views/handle/PDF/report.pdf";

// 当前步骤
const drawer = ref(false)
const active = ref(3);
const Starvalue = ref(0);
const texts = ref(['完全没有帮助','几乎没有帮助','有一点参考价值','较好参考价值','非常具有参考价值']);
const textarea = ref('')
const alertVisible = ref(false)

const loadFont = async () => {
  const response = await fetch(ttf);  // 替换为字体文件的实际路径
  const fontData = await response.arrayBuffer();
  const base64Font = btoa(
      new Uint8Array(fontData)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
  return base64Font;
};
const submit = () => {
  if(textarea.value !== '' && Starvalue.value > 0){
    alertVisible.value = true;
  }
}
const  generateReport =async () => {
    // const doc = new jsPDF();
    // const customFontBase64 = await loadFont();
    // // 添加自定义字体
    // doc.addFileToVFS('customFont.ttf', customFontBase64);
    // doc.addFont('customFont.ttf', 'customFont', 'normal');
    // doc.setFont('customFont');
    // // 创建一个新的 jsPDF 实例
    //
    //
    // // doc.setFontSize(16);
    // doc.text("生物安全现场处置报告", 80, 10);
    // //
    // // 添加案件信息
    // doc.setFontSize(12);
    // doc.text("案件信息:", 10, 20);
    //
    // doc.setFontSize(10);
    // doc.text("疾病名称：登革热", 10, 30);
    // doc.text("现场温度：25°C", 10, 40);
    // doc.text("现场湿度：60%", 10, 50);
    // doc.text("水质状况：良好", 10, 60);
    // doc.text("土壤状况：正常", 10, 70);
    //
    // // 添加现场图片
    // doc.setFontSize(12);
    // doc.text("现场图片:", 10, 80);
    // doc.addImage(uploadImage, 'JPEG', 10, 90, 180, 100);  // 调整图片位置和大小
    //
    // // 添加处置方式
    // doc.setFontSize(12);
    // doc.text("处置方式：", 10, 200);
    // doc.setFontSize(10);
    // doc.text("1. 消毒措施：", 10, 210);
    // doc.text("  - 使用含氯消毒剂对污染区域进行全面消毒。", 10, 220);
    // doc.text("  - 确保消毒剂覆盖所有可能接触病原体的表面。", 10, 230);
    // doc.text("  - 重复消毒过程以确保彻底清除病原体。", 10, 240);
    // doc.text("2. 隔离措施：", 10, 250);
    // doc.text("  - 对受影响区域进行隔离，禁止无关人员进入。", 10, 260);
    // doc.text("  - 设置明显的警示标志，告知存在生物安全风险。", 10, 270);
    // doc.text("  - 对现场工作人员进行个人防护装备的配备和培训。", 10, 280);
    // // doc.text("3. 其他处置措施：", 10, 290);
    // // doc.text("  - 对水质和土壤进行监测，确保无进一步污染。", 10, 300);
    // // doc.text("  - 根据情况，可能需要对受污染土壤进行挖掘和安全处理。", 10, 310);
    // doc.text("审核人签名：", 140, 290);
    // doc.line(160,290,180,290)
    // // 保存 PDF 文件
    // doc.save('report.pdf');



    drawer.value = true
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
  overflow-y:auto;
  overflow-x:hidden;
  margin:0 60px 0 40px;
}

.scrollbar-wrapper {
  margin-left: 360px;
  margin-top: 50px;
  width: 30%;
}

</style>
