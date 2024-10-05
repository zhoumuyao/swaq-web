<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div>
        <!--        现场信息智能录入模块-->
        <el-steps :active="active" finish-status="success" align-center style="margin-top: 20px">
          <el-step title="现场信息记录" ></el-step>
          <el-step title="生物危险因子信息" ></el-step>
          <el-step title="现场详细勘察"></el-step>
          <el-step title="现场无害化处理"></el-step>
<!--          <el-step title="评价与反馈"></el-step>-->
        </el-steps>
      </div>
      <div  class="center-container">
<!--        <el-card class="card_box" style="margin:0px 100px 0px 40px;">-->
        <el-card class="card_box">
          <div class="description">
            <el-tabs v-model="activeName" type="border-card"  style="margin:20px 30px 20px 30px;">
              <el-tab-pane label="环境勘察" name="first"  style="margin:20px 20px 20px 50px">
                <label class="label" style="margin-left: 45%">环境勘察</label>
                <div>
                  <el-text type="primary" @click="getPosition">
                    <el-icon><Location /></el-icon>
                    {{Position}}
                  </el-text>
                </div>
                <el-divider></el-divider>
                <div style="display: flex; align-items: center;margin-left: 30%">
                  <span style="margin-right: 10px; font-size: 16px; font-weight: bold;">方位图片上传：</span>
                  <el-upload
                      class="upload-demo"
                      ref="uploadInput3"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList3"
                      :on-change="handleChange3"
                      :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  </el-upload>
                </div>
                <el-divider></el-divider>
                <div style="display: flex; align-items: center;margin-left: 30%">
                  <span style="margin-right: 10px; font-size: 16px; font-weight: bold;">概貌图片上传：</span>
                  <el-upload
                      class="upload-demo"
                      ref="uploadInput4"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList4"
                      :on-change="handleChange4"
                      :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  </el-upload>
                </div>
                <el-divider></el-divider>
                <div style="display: flex; align-items: center;margin-left: 30%">
                  <span style="margin-right: 10px; font-size: 16px; font-weight: bold;">空气图片上传：</span>
                  <el-upload
                      class="upload-demo"
                      ref="uploadInput5"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList5"
                      :on-change="handleChange5"
                      :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  </el-upload>
                </div>
                <el-divider></el-divider>
                <div style="display: flex; align-items: center;margin-left: 30%">
                  <span style="margin-right: 10px; font-size: 16px; font-weight: bold;">土壤图片上传：</span>
                  <el-upload
                      class="upload-demo"
                      ref="uploadInput6"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList6"
                      :on-change="handleChange6"
                      :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  </el-upload>
                </div>
                <el-divider></el-divider>
                <div style="display: flex; align-items: center;margin-left: 30%">
                  <span style="margin-right: 10px; font-size: 16px; font-weight: bold;">水源图片上传：</span>
                  <el-upload
                      class="upload-demo"
                      ref="uploadInput7"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList7"
                      :on-change="handleChange7"
                      :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  </el-upload>
                </div>


                <el-button type="primary"  id="upload-button" @click="exampleDrawer = true" style="margin-left: 37%;width:26%;margin-top: 3%;">
                  图片上传示例
                </el-button>
                <el-button type="primary" @click="drawer = true" style="margin-left: 37%;width:26%;margin-top: 3%;">
                  查看现场勘察处置规程
                </el-button>
              </el-tab-pane>
              <el-tab-pane label="人员勘察" name="second"  style="margin:20px 20px 20px 50px">
                <label class="label" style="margin-left: 45%">人员勘察</label>
                <div>
                  <el-text type="primary" @click="getPosition">
                    <el-icon><Location /></el-icon>
                    {{Position}}
                  </el-text>
                </div>
                <el-divider></el-divider>

                <div style="display: flex; align-items: center; margin-left: 30%;">
                  <span style="margin-right: 10px; font-size: 16px; font-weight: bold;">尸体图片上传：</span>

                  <!-- 添加 ref 属性 -->
                  <el-upload
                      class="upload-demo"
                      ref="uploadInput1"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList1"
                      :on-change="handleChange1"
                      :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  </el-upload>
                </div>
                <el-divider></el-divider>
                <div style="display: flex; align-items: center;margin-left: 30%">
                  <span style="margin-right: 10px; font-size: 16px; font-weight: bold;">伤员图片上传：</span>
                  <el-upload
                      class="upload-demo"
                      ref="uploadInput2"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList2"
                      :on-change="handleChange2"
                      :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  </el-upload>
                </div>
                <el-divider></el-divider>
                <el-button type="primary"  id="upload-button" @click="exampleDrawer = true" style="margin-left: 37%;width:26%;margin-top: 3%;">
                  图片上传示例
                </el-button>
                <el-button type="primary" @click="drawer = true" style="margin-left: 37%;width:26%;margin-top: 3%;">
                  查看现场勘察处置规程
                </el-button>
              </el-tab-pane>
              <el-tab-pane label="物证勘察" name="third"  style="margin:20px 20px 20px 50px">
                <label class="label" style="margin-left: 45%">物证图片</label>
                <div>
                  <el-text type="primary" @click="getPosition">
                    <el-icon><Location /></el-icon>
                    {{Position}}
                  </el-text>
                </div>

                <el-divider></el-divider>
                <div style="display: flex; align-items: center;margin-left: 5%">
                  <span style="margin-right: 10px; font-size: 16px; font-weight: bold;">痕迹物证上传：</span>
                  <el-upload
                      class="upload-demo"
                      ref="uploadInput8"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList8"
                      :on-change="handleChange8"
                      :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">指纹上传</el-button>
                  </el-upload>
                  <el-upload
                      style="margin-left: 5%"
                      class="upload-demo"
                      ref="uploadInput9"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList9"
                      :on-change="handleChange9"
                      :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">足迹上传</el-button>
                  </el-upload>
                  <el-upload
                      style="margin-left: 5%"
                      class="upload-demo"
                      ref="uploadInput10"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList10"
                      :on-change="handleChange10"
                      :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">生物上传</el-button>
                  </el-upload>
                </div>
                <el-divider></el-divider>
                <div style="display: flex; align-items: center;margin-left: 5%">
                  <span style="margin-right: 10px; font-size: 16px; font-weight: bold;">生物物证上传：</span>
                  <el-upload
                      class="upload-demo"
                      ref="uploadInput11"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList11"
                      :on-change="handleChange11"
                      :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">血液上传</el-button>
                  </el-upload>
                  <el-upload
                      style="margin-left: 5%"
                      class="upload-demo"
                      ref="uploadInput12"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList12"
                      :on-change="handleChange12"
                      :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">唾液上传</el-button>
                  </el-upload>
                  <el-upload
                      style="margin-left: 5%"
                      class="upload-demo"
                      ref="uploadInput13"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList13"
                      :on-change="handleChange13"
                      :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">粪便上传</el-button>
                  </el-upload>
                  <el-upload
                      style="margin-left: 5%"
                      class="upload-demo"
                      ref="uploadInput14"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList14"
                      :on-change="handleChange14"
                      :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">尿液上传</el-button>
                  </el-upload>
                </div>
                <el-divider></el-divider>
                <div style="display: flex; align-items: center;margin-left: 5%">
                  <span style="margin-right: 10px; font-size: 16px; font-weight: bold;">微量物证上传：</span>
                  <el-upload
                      class="upload-demo"
                      ref="uploadInput15"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList15"
                      :on-change="handleChange15"
                      :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">粉末上传</el-button>

                  </el-upload>
                  <el-upload
                      style="margin-left: 5%"
                      class="upload-demo"
                      ref="uploadInput16"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList16"
                      :on-change="handleChange16"
                      :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">纤维上传</el-button>
                  </el-upload>
                </div>
                <el-divider></el-divider>
                <div style="display: flex; align-items: center;margin-left: 5%">
                  <span style="margin-right: 10px; font-size: 16px; font-weight: bold;">电子物证上传：</span>
                  <el-upload
                      class="upload-demo"
                      ref="uploadInput17"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList17"
                      :on-change="handleChange17"
                      :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">手机上传</el-button>
                  </el-upload>
                  <el-upload
                      style="margin-left: 5%"
                      class="upload-demo"
                      ref="uploadInput18"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList18"
                      :on-change="handleChange18"
                      :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">手表上传</el-button>
                  </el-upload>
                  <el-upload
                      style="margin-left: 5%"
                      class="upload-demo"
                      ref="uploadInput19"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList19"
                      :on-change="handleChange19"
                      :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">摄像机上传</el-button>
                  </el-upload>
                </div>
                <el-button type="primary"  id="upload-button" @click="exampleDrawer = true" style="margin-left: 37%;width:26%;margin-top: 3%;">
                  图片上传示例
                </el-button>
                <el-button type="primary" @click="drawer = true" style="margin-left: 37%;width:26%;margin-top: 3%;">
                  查看现场勘察处置规程
                </el-button>
              </el-tab-pane>
            </el-tabs>

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

      <!-- 切换页面-->
      <router-link :to="{path: '/dangerInfo', query: { id: id }}">
        <el-button class="previous-button" type="primary" size="large">
          上一步
        </el-button>
      </router-link>

      <router-link :to="{path: '/invest2',query: { id: id }}">
        <el-button class="next-button" type="primary" size="large" @click="createInfo">
          下一步
        </el-button>
      </router-link>

    </div>
  </div>
</template>

<script setup >
// type="text/javascript" src="https://webapi.amap.com/maps?v=2.0&key=5c913b8a517b8b143534b263a4b3b066"

import { onMounted, ref} from "vue";
import {get, post} from "@/net";
import { ElMessage } from "element-plus";
import {useRoute, useRouter} from "vue-router";
import InvestigationAndInquest from './PDF/InvestigationAndInquest.pdf';
import example from './PDF/example.pdf';
// import Sidebar from '../components/sideBar/SideBar.vue';
import {Location} from "@element-plus/icons-vue";
import MapLoader from "@/util/util";

const route = useRoute();
const id = route.query.id;
import axios from "axios";
import myBMap from "/src/util/myBMap";
import router from "@/router";

const showImg = ref(false);
const exampleDrawer = ref(false);
const drawer = ref(false);
const imageUrl = ref("");
const showLabel = ref(true);
const text = ref("");
let Position = ref("获取定位中");
// 当前步骤
const active = ref(2);
const form = ref({
  name : ' ',
  type : ' ',
  description : '',
})
const selectedItems = ref([]);
const activeName = ref('first')
const value = ref('');

const uploadInput1 = ref();
const uploadInput2 = ref();
const uploadInput3 = ref();
const uploadInput4 = ref();
const uploadInput5 = ref();
const uploadInput6 = ref();
const uploadInput7 = ref();
const uploadInput8 = ref();
const uploadInput9 = ref();
const uploadInput10 = ref();
const uploadInput11 = ref();
const uploadInput12 = ref();
const uploadInput13 = ref();
const uploadInput14 = ref();
const uploadInput15 = ref();
const uploadInput16 = ref();
const uploadInput17 = ref();
const uploadInput18 = ref();
const uploadInput19 = ref();


const fileList1 = ref([]);
const fileList2 = ref([]);

const fileList3 = ref([]);
const fileList4 = ref([]);
const fileList5 = ref([]);
const fileList6 = ref([]);
const fileList7 = ref([]);

const fileList8 = ref([]);
const fileList9 = ref([]);
const fileList10 = ref([]);

const fileList11 = ref([]);
const fileList12 = ref([]);
const fileList13 = ref([]);
const fileList14 = ref([]);

const fileList15 = ref([]);
const fileList16 = ref([]);

const fileList17 = ref([]);
const fileList18 = ref([]);
const fileList19 = ref([]);

onMounted(() => {
  console.log("mounted...")
  // queryInfo()
})
const handleChange1 = (file, fileList) => {
  console.log(111)
  fileList1.value = fileList; // 更新 fileList1
  console.log(fileList1.value)
};
const handleChange2 = (file,fileList) => {
  fileList2.value = fileList;  // 更新 fileList1
};
const handleChange3 = (file,fileList) => {
  fileList3.value = fileList;  // 更新 fileList1
};
const handleChange4 = (file,fileList) => {
  fileList4.value = fileList;  // 更新 fileList1
};
const handleChange5 = (file,fileList) => {
  fileList5.value = fileList;  // 更新 fileList1
};
const handleChange6 = (file,fileList) => {
  fileList6.value = fileList;  // 更新 fileList1
};
const handleChange7 = (file,fileList) => {
  fileList7.value = fileList;  // 更新 fileList1
};
const handleChange8 = (file,fileList) => {
  fileList8.value = fileList;  // 更新 fileList1
};
const handleChange9 = (file,fileList) => {
  fileList9.value = fileList;  // 更新 fileList1
};
const handleChange10 = (file,fileList) => {
  fileList10.value = fileList;  // 更新 fileList1
};
const handleChange11 = (file,fileList) => {
  fileList11.value =fileList;  // 更新 fileList1
};
const handleChange12 = (file,fileList) => {
  fileList12.value = fileList;  // 更新 fileList1
};
const handleChange13 = (file,fileList) => {
  fileList13.value = fileList;  // 更新 fileList1
};
const handleChange14 = (file,fileList) => {
  fileList14.value = fileList;  // 更新 fileList1
};
const handleChange15 = (file,fileList) => {
  fileList15.value = fileList;  // 更新 fileList1
};
const handleChange16 = (file,fileList) => {
  fileList16.value = fileList;  // 更新 fileList1
};
const handleChange17 = (file,fileList) => {
  fileList17.value =fileList;  // 更新 fileList1
};
const handleChange18 = (file,fileList) => {
  fileList18.value = fileList;  // 更新 fileList1
};
const handleChange19 = (file,fileList) => {
  fileList19.value = fileList;  // 更新 fileList1
};



const createInfo = () =>{
      // 创建一个 FormData 对象
      const formData = new FormData();
      // 添加 IS
      formData.append("id", id);
      console.log(222)
      console.log(fileList1.value.length)
      console.log(fileList2.value.length)

      if (fileList1.value.length>0)
        formData.append('file1', fileList1.value[0].raw);
      if (fileList2.value.length>0)
        formData.append('file2', fileList2.value[0].raw);
      if (fileList3.value.length>0)
        formData.append('file3', fileList3.value[0].raw);
      if (fileList4.value.length>0)
          formData.append('file4', fileList4.value[0].raw);
      if (fileList5.value.length>0)
          formData.append('file5', fileList5.value[0].raw);
      if (fileList6.value.length>0)
          formData.append('file6', fileList6.value[0].raw);
      if (fileList7.value.length>0)
          formData.append('file7', fileList7.value[0].raw);
      if (fileList8.value.length>0)
          formData.append('file8', fileList8.value[0].raw);
      if (fileList9.value.length>0)
          formData.append('file9', fileList9.value[0].raw);
      if (fileList10.value.length>0)
          formData.append('file10', fileList10.value[0].raw);
      if (fileList11.value.length>0)
          formData.append('file11', fileList11.value[0].raw);
      if (fileList12.value.length>0)
          formData.append('file12', fileList12.value[0].raw);
      if (fileList13.value.length>0)
          formData.append('file13', fileList13.value[0].raw);
      if (fileList14.value.length>0)
          formData.append('file14', fileList14.value[0].raw);
      if (fileList15.value.length>0)
          formData.append('file15', fileList15.value[0].raw);
      if (fileList16.value.length>0)
          formData.append('file16', fileList16.value[0].raw);
      if (fileList17.value.length>0)
          formData.append('file17', fileList17.value[0].raw);
      if (fileList18.value.length>0)
          formData.append('file18', fileList18.value[0].raw);
      console.log(333)


      // 使用 fetch 发送 POST 请求
      fetch(axios.defaults.baseURL + "/api/infoInput/createInfo", {
        method: "POST",
        body: formData,
      })
          .then(response => response.json())
          .then(data => {
            console.log("上传成功", data);
          })
          .catch(error => {
            console.error("上传失败", error);
          })
}

const queryInfo = async () => {
  console.log("执行查询并显示info");

  try {
    // 发送 GET 请求获取数据
    const response = await fetch(axios.defaults.baseURL + "/api/infoInput/queryInfo?id=" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    });

    // 检查响应是否成功
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // 解析响应数据
    const data = await response.json();

    // 打印数据并赋值给表单
    console.log("Response data:", data.message);

    // 将后端返回的数据赋值给前端的表单值
    form.value.airQuality = data.message.airQuality;

// 解析 JSON 字符串
    const parsedGather = JSON.parse(data.message.gather);
// 提取每个选中的值
    parsedGather.forEach(item => {
      if (Array.isArray(item)) {
        selectedGather.value.push(...item);
      }
    });

    // 解析 JSON 字符串
    const parsedPopulation = JSON.parse(data.message.personelDensity);
// 提取每个选中的值
    parsedPopulation.forEach(item => {
      if (Array.isArray(item)) {
        selectedPopulation.value.push(...item);
      }
    });

  } catch (error) {
    // 捕捉错误并打印
    console.error("Error:", error);
  }
};
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
function handleUpload(index) {
  let elementId = "image-display"+index;
  let imageDisplay = document.getElementById(elementId);
  let uploadElementId = "upload-input"+index;
  let uploadInput = document.getElementById(uploadElementId);

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
const isFormValid = () =>{
  // 确保所有选项不为空
  if(selectedItems.value !== []&&
      form.value.type!== '' &&
      form.value.name !== '' &&
      form.value.description !== ''
  ){
    return true; // 如果所有字段都不为空，则返回true
  } else {
    return false; // 如果有任何一个字段为空，则返回false
  }
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
.previous-button{
  position: fixed;
  bottom: 7%;
  left: 83%;
}
.card_box{
  height:85%;
  overflow-y:auto;
  overflow-x:hidden;
  margin:0 60px 0 40px;
}
.description{
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  margin:10px 30px 20px 30px
}

.img {
  height:200px;
  margin-left: 15%;
  width: 70%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  border: 1.2px solid;
  border-color: darkgray;
}

</style>
