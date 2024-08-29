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
<!--          <el-step title="评价与反馈"></el-step>-->
        </el-steps>
      </div>
      <div  class="center-container">
<!--        <el-card class="card_box" style="margin:0px 100px 0px 40px;">-->
        <el-card class="card_box">
          <div class="description">
            <el-tabs v-model="activeName" type="border-card"  style="margin:20px 30px 20px 30px;">
              <el-tab-pane label="环境照片" name="first"  style="margin:20px 20px 20px 50px">
                <label class="label" style="margin-left: 45%">环境图片</label>
                <div>
                  <el-text type="primary" >
                    <el-icon><Location /></el-icon>
                    {{Position}}
                  </el-text>
                </div>

                <el-divider></el-divider>
                <div class="img">
                  <div v-show="showLabel" style="margin-left: 40%; margin-top: 25%; color: darkgray;">
                    <label style="font:14px Extra Small">请上传环境图片</label>
                  </div>
                  <img v-show="showImg" id="image-display" src="" style="height: 100%; width: 100%;">
                </div>
                <el-button type="primary"  id="upload-button" @click="handleUpload" style="margin-left: 27%;width:52%;margin-top: 15%;">
                  上传现场图片
                  <input type="file" title="上传图片" id="upload-input" style="display:none"/>
                </el-button>
                <el-button type="primary"  id="upload-button" @click="exampleDrawer = true" style="margin-left: 27%;width:52%;margin-top: 5%;">
                  图片上传示例
                  <input type="file" title="上传图片" id="upload-input" style="display:none"/>
                </el-button>
                <el-button type="primary" @click="drawer = true" style="margin-left: 27%;width:52%;margin-top: 5%;">
                  查看现场勘察处置规程
                </el-button>
              </el-tab-pane>
              <el-tab-pane label="人员照片" name="second"  style="margin:20px 20px 20px 50px">
                <label class="label" style="margin-left: 45%">人员图片</label>
                <div>
                  <el-text type="primary" @click="getPosition">
                    <el-icon><Location /></el-icon>
                    {{Position}}
                  </el-text>
                </div>
                <el-divider></el-divider>
                <div class="img">
                  <div v-show="showLabel" style="margin-left: 40%; margin-top: 25%; color: darkgray;">
                    <label style="font:14px Extra Small">请上传人员图片</label>
                  </div>
                  <img v-show="showImg" id="image-display" src="" style="height: 100%; width: 100%;">
                </div>
                <el-button type="primary"  id="upload-button" @click="handleUpload" style="margin-left: 27%;width:52%;margin-top: 15%;">
                  上传现场图片
                  <input type="file" title="上传图片" id="upload-input" style="display:none"/>
                </el-button>
                <el-button type="primary"  id="upload-button" @click="exampleDrawer = true" style="margin-left: 27%;width:52%;margin-top: 5%;">
                  图片上传示例
                  <input type="file" title="上传图片" id="upload-input" style="display:none"/>
                </el-button>
                <el-button type="primary" @click="drawer = true" style="margin-left: 27%;width:52%;margin-top: 5%;">
                  查看现场勘察处置规程
                </el-button>
              </el-tab-pane>
              <el-tab-pane label="物证照片" name="third"  style="margin:20px 20px 20px 50px">
                <label class="label" style="margin-left: 45%">物证图片</label>
                <div>
                  <el-text type="primary" @click="getPosition">
                    <el-icon><Location /></el-icon>
                    {{Position}}
                  </el-text>
                </div>

                <el-divider></el-divider>
                <div class="img">
                  <div v-show="showLabel" style="margin-left: 40%; margin-top: 25%; color: darkgray;">
                    <label style="font:14px Extra Small">请上传物证图片</label>
                  </div>
                  <img v-show="showImg" id="image-display" src="" style="height: 100%; width: 100%;">
                </div>
                <el-button type="primary"  id="upload-button" @click="handleUpload" style="margin-left: 27%;width:52%;margin-top: 15%;">
                  上传现场图片
                  <input type="file" title="上传图片" id="upload-input" style="display:none"/>
                </el-button>
                <el-button type="primary"  id="upload-button" @click="exampleDrawer = true" style="margin-left: 27%;width:52%;margin-top: 5%;">
                  图片上传示例
                  <input type="file" title="上传图片" id="upload-input" style="display:none"/>
                </el-button>
                <el-button type="primary" @click="drawer = true" style="margin-left: 27%;width:52%;margin-top: 5%;">
                  查看现场勘察处置规程
                </el-button>
              </el-tab-pane>
            </el-tabs>
            <el-card class="text" style="margin:20px 30px 20px 30px;">
              <label class="label" style="margin-left: 40%; ">基本信息录入</label>
              <el-divider></el-divider>
              <div style="margin: 30px;">
                生物危险因子名称：<el-input placeholder="请输入生物危险因子名称" style="display: inline-block; width: 75%;padding-top: 10px; " v-model="form.name"></el-input>
              </div>
              <el-divider></el-divider>
              <div style="margin:30px 30px 20px 30px;">
                <!--                  生物危险因子性质：-->
                生物危险因子性质：<el-form-item  v-model="form.type">
                  <el-radio v-model="radio" label="传染性" name="type" ></el-radio><br>
                  <el-radio v-model="radio" label="非传染性" name="type" ></el-radio><br>
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
      <el-drawer v-model="drawer" title="I am the title" :with-header="false" size="50%">
          <div style="width: 100%;height: 100%;">
            <embed :src="InvestigationAndInquest" type="application/pdf"
                   width="100%" height="100%">
          </div>
      </el-drawer>
      <el-drawer v-model="exampleDrawer" title="I am the title" :with-header="false" size="50%">
        <div style="width: 100%;height: 100%;">
          <embed :src="example" type="application/pdf"
                 width="100%" height="100%">
        </div>
      </el-drawer>
      <router-link :to="{path: '/handle1'}">
        <el-button class="previous-button" type="primary" size="large">
          上一步
        </el-button>
      </router-link>


      <!-- 切换页面-->
      <router-link :to="{path: '/handle3'}">
        <el-button class="next-button" type="primary" size="large">
          下一步
        </el-button>
      </router-link>

    </div>
  </div>
</template>

<script setup >
// type="text/javascript" src="https://webapi.amap.com/maps?v=2.0&key=5c913b8a517b8b143534b263a4b3b066"

import { onMounted } from "vue";
import { ref } from 'vue';
import { get } from "@/net";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import InvestigationAndInquest from './PDF/InvestigationAndInquest.pdf';
import example from './PDF/example.pdf';
// import Sidebar from '../components/sideBar/SideBar.vue';
import {Location} from "@element-plus/icons-vue";
import MapLoader from "@/util/util";
const router = useRouter();
import axios from "axios";
import myBMap from "/src/util/myBMap";

const showImg = ref(false);
const exampleDrawer = ref(false);
const drawer = ref(false);
const imageUrl = ref("");
const showLabel = ref(true);
const text = ref("");
let Position = ref("获取定位中");
// 当前步骤
const active = ref(1);
const radio = ref(1);
const form = ref({
  name : ' ',
  type : ' ',
  description : '',
})
const selectedItems = ref([]);
const activeName = ref('first')
const value = ref('');


onMounted(() => {
  console.log("mounted...")
  getLocation();
})
function getLocation() {
  //Toast("如长时间未获取办理区域请手动选择");
  myBMap.init().then(() => {
    let that = this;
    let geolocation = new BMap.Geolocation();
    // 创建百度地理位置实例，代替 navigator.geolocation
    geolocation.getCurrentPosition(function (e) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        // 百度 geolocation 的经纬度属性不同，此处是 point.lat 而不是 coords.latitude
        let point = new BMap.Point(e.point.lng, e.point.lat);
        let gc = new BMap.Geocoder();
        gc.getLocation(point, function (rs) {
          Position.value = rs.address
          console.log(rs.address);
          //<<<<<<<<<<<<<<<<需要的位置信息在这获取
        });
      } else {
        Toast("定位失败，请手动选择区域或重新定位");
        this.showloading = false;
      }
    });
  });
}
function getPosition(){
  MapLoader().then((formattedAddress) => {
    Position.value=formattedAddress;
    console.log('定位成功，地址为：', Position);
  }).catch((error) => {
    console.error('定位失败：', error);
  });
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

.previous-button{
  position: fixed;
  bottom: 7%;
  left: 83%;
}

.next-button {
  position: fixed;
  bottom: 7%;
  right: 5%;
}

.center-container{
  position: fixed;
  top: 100px;
  width: 89%;
  height: 100%;
}
.text{
  height: 93%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  border: 1.2px ;
  //border-color: darkgray;
}
.card_box{
  height:85%;
  overflow-y:auto;
  overflow-x:hidden;
  margin:0 60px 0 40px;
}
.description{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin:0
}

.img {
  height: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  border: 1.2px solid;
  border-color: darkgray;
}

</style>
