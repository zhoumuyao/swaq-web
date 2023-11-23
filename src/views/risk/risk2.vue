<template>
  <div class="app">
<!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div style="padding: 20px; border-bottom:solid 2px ; border-color: darkgray;">
        <label style="font: 20px Extra large;">风险评估模块</label>
      </div>
      
      <div style="margin-left: 30px; margin-top: 30px;">
        <el-steps :active="1" finish-status="success" style="width: 50%; margin-left: 25%;"> 
          <el-step title="环境风险识别"></el-step>
          <el-step title="生物因子快速取样"></el-step>
          <el-step title="生物危险因子快速检验"></el-step>
        </el-steps>
      </div>

      <div class="description">
        <div style="margin:20px 40px 0 100px;">
          <label class="label">现场图片</label>
          <div class="img">
            <img id="image-display" :src="$route.query.img" style="height: 100%; width: 100%;">
          </div>
        </div>
        <div style="margin:20px 100px 0 40px">
          <label class="label">取样结果</label>
          <div class="text">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="virue"
                label="病毒"
                width="360">
              </el-table-column>
              <el-table-column
                label="操作" 
                width="180">
                <div slot-scope="scope">
                  <el-checkbox v-model="scope.check"></el-checkbox>
                </div>
 
              </el-table-column>
            </el-table>
          </div>
        </div>
        
      </div>
      
      <div style="margin-top: 40px; margin-left: 40%;">
        <router-link :to="{path: '/risk3', query: {img : imageUrl}}">
          <el-button type="primary" style="margin-top: 12px; margin-left: 80px;" @click="goToRisk3">下一步</el-button>
        </router-link>
      </div>
      <div>
        
      </div>
    </div>
   
  </div>
</template>

<script setup>
import { get } from "@/net";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
//import Sidebar from '../../components/sideBar/SideBar.vue';
import { ref } from 'vue';


const showImg = ref(false);
const imageUrl = ref("");
const showLabel = ref(true);
const textarea1 = ref("");
const textarea2 = ref("");
const text = ref("");

const tableData = ref([{
            virue: '鼠疫',
            check: false,
          }, {
            virue: '霍乱',
            check: false,
          }, {
            virue: '麻疹',
            check: false,
          }, {
            virue: '传染性非典型肺炎',
            check: false,
          },{
            virue: '猩红热',
            check: false,
          },{
            virue: '登革热',
            check: false,
          }])

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

function openFileInput() {
  this.$refs.fileInput.click();
};

function handleFileChange(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const imageUrl = e.target.result;
    // 在这里处理图片URL，可以将其保存到Vue组件的数据中或进行其他操作
    console.log(imageUrl);
  };

  reader.readAsDataURL(file);
};

function getPicture(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    this.imageSrc = reader.result;
    console.log(this.imageSrc)
  };
};

function selectFile() {
  this.$refs.fileInput.click();
};
</script>

<style scoped>
.app {
  display: flex;
}

.content {
  flex: 1;
  margin-left: 200px; /* 与侧边栏宽度对应 */
  /* 添加其他样式，如内容区域的填充等 */
}
.description{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin:0px
}

#file{
    opacity:0;
}

.img{
  height: 500px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px; 
  border: 1.2px solid;
  border-color: darkgray;
}

.text{
  height: 500px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px; 
  border: 1.2px solid;
  border-color: darkgray;
}
.label{
  font: 18px large;
  font-family: "PingFang SC";
  margin: 10px;
  display: block;
}
</style>
