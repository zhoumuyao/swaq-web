<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div>
        <!--        现场信息智能录入模块-->
        <el-steps :active="active" finish-status="success" align-center style="margin-top: 20px">
          <el-step title="现场详细勘察" ></el-step>
          <el-step title="现场信息智能录入"></el-step>
          <el-step title="现场无害化处理"></el-step>
          <el-step title="评价与反馈"></el-step>
        </el-steps>
      </div>
      <div  class="center-container">
<!--        <el-card class="card_box" style="margin:0px 100px 0px 40px;">-->
        <el-card class="card_box">
          <div class="description">
            <el-card style="margin:20px 20px 20px 50px;">
              <label class="label" style="margin-left: 45%">现场图片</label>
              <el-divider></el-divider>
              <div class="img">
                <div v-show="showLabel" style="margin-left: 40%; margin-top: 45%; color: darkgray;">
                  <label style="font:14px Extra Small">请上传现场图片</label>
                </div>
                <img v-show="showImg" id="image-display" src="" style="height: 100%; width: 100%;">
              </div>
              <el-button type="primary"  id="upload-button" @click="handleUpload" style="margin-left: 38%;margin-top: 36%">
                上传现场图片
                <input type="file" title="上传图片" id="upload-input" style="display:none"/>
              </el-button>
            </el-card>
            <el-card class="text" style="margin:20px 30px 20px 30px;">
              <label class="label" style="margin-left: 40%; ">基本信息录入</label>
              <el-divider></el-divider>
              <div style="margin: 30px;">
                疾病名称：<el-input placeholder="请输入疾病名称" style="display: inline-block; width: 75%; " v-model="form.name"></el-input>
              </div>
              <el-divider></el-divider>
              <div style="margin:30px 30px 20px 30px;">
                <!--                  疾病性质：-->
                疾病性质：<el-form-item  v-model="form.type">
                  <el-radio v-model="radio" label="传染性疾病" name="type" ></el-radio><br>
                  <el-radio v-model="radio" label="非传染性疾病" name="type" ></el-radio><br>
                  <el-radio v-model="radio" label="未知" name="type" ></el-radio>
                </el-form-item>
              </div>
              <el-divider></el-divider>
              <div style="margin:0 30px;">
                状况描述：
                <el-input placeholder="请输入案发现场描述" type="textarea" style="display: block; margin:10px 0;" v-model="form.description" :autosize="{ minRows: 6, maxRows: 6}"></el-input>
              </div>
            </el-card>
          </div>
        </el-card>
      </div>

<!--      <router-link :to="{path: '/handle3'}">-->
      <el-button class="next-button" type="primary" size="large" @click="next">
        下一步
      </el-button>
<!--      </router-link>-->

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { get } from "@/net";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
// import Sidebar from '../components/sideBar/SideBar.vue';

const router = useRouter();

const showImg = ref(false);
const imageUrl = ref("");
const showLabel = ref(true);
const text = ref("");
// 当前步骤
const active = ref(1);
const radio = ref(1);
const form = ref({
  name : ' ',
  type : ' ',
  description : '',
})
const selectedItems = ref([]);

const value = ref('');
// 触发下一步骤
const next = () => {
    if (!form.value.name) {
      // 如果 form.name 为空，弹出提示
      alert('请填疾病名称！');
      return; // 中断函数执行
    } else if(!form.value.description){
      alert('请添加疾病状况描述')
      return;
    } else if(radio.value===1){
      alert('请勾选疾病性质')
      return;
    }
    router.push({ path: '/handle3' });
}
function handleUpload() {
  let imageDisplay = document.getElementById("image-display");
  let uploadInput = document.getElementById("upload-input");
  uploadInput.addEventListener("change", function(event) {
    let files = event.target.files; // 获取选择的文件列表
    if (files.length > 0) {
      let file = files[0]; // 获取第一个文件
      let fileReader = new FileReader();
      showImg.value = true;
      showLabel.value = false;
      fileReader.onload = function(e) {
        imageUrl.value = e.target.result;
        imageDisplay.src = imageUrl.value;
      };
      fileReader.readAsDataURL(file);
    }
  });
  uploadInput.click();
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
.text{
  height: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  border: 1.2px ;
  //border-color: darkgray;
}
.card_box{
  height:85%;
  overflow-y:auto;
  overflow-x:hidden;
  margin:0px 100px 0px 40px;
}
.description{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin:0px
}

</style>
