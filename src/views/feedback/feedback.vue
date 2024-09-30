<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
<!--      <router-view></router-view>-->
      <div style="padding: 20px; border-bottom: solid 2px; border-color: darkgray;text-align: center">
        <label style="font: 20px Extra large; display: inline-block;">评价与反馈</label>
      </div>
      <el-card class="card_box">
        <div style="margin-top: 30px;text-align: center">
          <div style="font-size: 20px;font-weight: bold;">生物安全处置评分</div>
          <div>
            <el-rate
                style="margin-left:0"
                v-model="Starvalue"
            />
            <span style="margin-left: 10px;">{{ texts[Starvalue - 1] }}</span>
          </div>
        </div>
        <div style="margin: 30px 50px 0 50px">
          <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 15}"
              placeholder="请输入您对本模块的反馈意见"
              v-model="textarea">
          </el-input>
        </div>
        <div style="float: right;margin-top: 20px;margin-right: 50px"><el-button type="primary" @click="submit">提交</el-button></div>
        <div style="float: right;margin-top: 20px;margin-right: 50px"><el-button type="primary" @click="generateReport">生成简易报告</el-button></div>

      </el-card>

      <el-alert
          v-if="alertVisible"
          title="提交成功"
          type="success"
          description="感谢您的反馈意见，我们将根据反馈进行进一步优化！"
          show-icon
          @close="closeAlert">
      </el-alert>

      <!-- 切换页面-->
      <router-link :to="{path: '/doHandle', query: { id: id }}">
        <el-button class="previous-button" type="primary" size="large">
          上一步
        </el-button>
      </router-link>

      <router-link :to="{path: '/feedbackList', query: { id: id }}">
        <el-button class="next-button" type="primary" size="large">
          查看反馈
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import { ElMessage } from "element-plus";
import {useRoute, useRouter} from "vue-router";
import Sidebar from '@/components/sideBar/SideBar.vue';
import jsPDF from 'jspdf';
import uploadImage from '../handle/image/sj.jpg'
import ttf from '../handle/simhei.ttf'
// import report from "@/views/handle/PDF/report.pdf";
import axios from "axios";





// 当前步骤
const drawer = ref(false)
const Starvalue = ref(0);
const textarea = ref("")
const texts = ref(['完全没有帮助','几乎没有帮助','有一点参考价值','较好参考价值','非常具有参考价值']);

const alertVisible = ref(false)
const route = useRoute();
const id = route.query.id;
const report = ref("");
const folderPath = ref("");

// const handleFolderSelect = (event) => {
//   // 获取所选文件夹中的文件
//   const files = event.target.files;
//
//   // 假设用户选择了一个文件夹，我们可以获取第一个文件的路径来表示文件夹
//   if (files.length > 0) {
//     const file = files[0];
//     console.log(file)
//     if (window.createObjectURL!=undefined) { // basic
//       folderPath.value = window.createObjectURL(file) ;
//     }else if (window.webkitURL!=undefined) { // webkit or chrome
//       folderPath.value = window.webkitURL.createObjectURL(file) ;
//     }else if (window.URL!=undefined) { // mozilla(firefox)
//       folderPath.value = window.URL.createObjectURL(file) ;
//     }
//     console.log(folderPath.value)
//   }
// };

const submit = () => {
  if(textarea.value !== '' && Starvalue.value > 0){

    axios.post('/api/feedback/addFeedback', {
      id: 15,
      feedback: textarea.value,
      rate: Starvalue.value
    })
        .then(response => {
          console.log('反馈提交成功:', response.data);
          ElMessage.success("反馈提交成功")
        })
        .catch(error => {
          console.error('提交反馈失败:', error);
          ElMessage.error(error)
        });
    // window.location.reload();
    Starvalue.value = 0;
    textarea.value = '';

  } else {
    alert('请填写评分和反馈内容。');
  }
}
const  generateReport = () => {
  console.log(route.query.id)
  if(route.query.id !== undefined){
    axios.post('/api/report/outReport',{
      id: route.query.id,
    })
    .then(response => {
      console.log('报告地址为:', response.data);
      report.value =  response.data;
      ElMessage.success("报告已保存至桌面【tempPDF】文件夹")
    })
    .catch(error => {
      console.error('报告生成失败:', error);
      ElMessage.error(error)
    });
    drawer.value = true
    // window.location.reload();

  } else {
    const reportId = 15; // 这里是你要传入的id
    axios.post('/api/report/outReport', {
        id: reportId,
    })
    .then(response => {
      console.log('报告地址为:', response.data);
      report.value =  response.data;
      ElMessage.success("报告已保存至桌面【tempPDF】文件夹")
    })
    .catch(error => {
      console.error('报告生成失败:', error);
      ElMessage.error(error)
    });
    drawer.value = true
  }
}

const closeAlert= () => {
  alertVisible.value = false;
}

// onMounted(() => {
//   console.log(route.query.id);
// });

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
  margin:40px 60px 0 40px;
}

.scrollbar-wrapper {
  margin-left: 360px;
  margin-top: 50px;
  width: 30%;
}

</style>
