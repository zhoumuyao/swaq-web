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
                <label class="label" style="margin-left: 45%">环境图片</label>
                <el-divider></el-divider>
                <el-tabs>
                  <el-tab-pane label="方位图片" name="image3">
                    <img :src="images.image3" alt="方位图片" style="width: 100%; height: auto;">
                  </el-tab-pane>
                  <el-tab-pane label="概貌图片" name="image4">
                    <img :src="images.image4" alt="概貌图片" style="width: 100%; height: auto;">
                  </el-tab-pane>
                  <el-tab-pane label="空气图片" name="image5">
                    <img :src="images.image5" alt="空气图片" style="width: 100%; height: auto;">
                  </el-tab-pane>
                  <el-tab-pane label="土壤图片" name="image6">
                    <img :src="images.image6" alt="土壤图片" style="width: 100%; height: auto;">
                  </el-tab-pane>
                  <el-tab-pane label="水源图片" name="image7">
                    <img :src="images.image7" alt="水源图片" style="width: 100%; height: auto;">
                  </el-tab-pane>
                </el-tabs>




              </el-tab-pane>
              <el-tab-pane label="人员勘察" name="second"  style="margin:20px 20px 20px 50px">
                <label class="label" style="margin-left: 45%">人员图片</label>
                <el-divider></el-divider>
                <el-tabs>
                  <el-tab-pane label="尸体图片" name="image1">
                    <img :src="images.image1" alt="尸体图片" style="width: 100%; height: auto;">
                  </el-tab-pane>
                  <el-tab-pane label="伤员图片" name="image2">
                    <img :src="images.image2" alt="伤员图片" style="width: 100%; height: auto;">
                  </el-tab-pane>
                </el-tabs>

              </el-tab-pane>
              <el-tab-pane label="物证勘察" name="third"  style="margin:20px 20px 20px 50px">
                <label class="label" style="margin-left: 45%">物证图片</label>
                <el-divider></el-divider>
                <el-tabs>
                  <el-tab-pane label="指纹图片" name="image8">
                    <img :src="images.image8" alt="指纹图片" style="width: 100%; height: auto;">
                  </el-tab-pane>
                  <el-tab-pane label="足迹图片" name="image9">
                    <img :src="images.image9" alt="足迹图片" style="width: 100%; height: auto;">
                  </el-tab-pane>
                  <el-tab-pane label="生物图片" name="image10">
                    <img :src="images.image10" alt="生物图片" style="width: 100%; height: auto;">
                  </el-tab-pane>
                  <el-tab-pane label="血液图片" name="image11">
                    <img :src="images.image11" alt="血液图片" style="width: 100%; height: auto;">
                  </el-tab-pane>
                  <el-tab-pane label="唾液图片" name="image12">
                    <img :src="images.image12" alt="唾液图片" style="width: 100%; height: auto;">
                  </el-tab-pane>
                    <el-tab-pane label="粪便图片" name="image13">
                      <img :src="images.image13" alt="粪便图片" style="width: 100%; height: auto;">
                    </el-tab-pane>
                    <el-tab-pane label="尿液图片" name="image14">
                      <img :src="images.image14" alt="尿液图片" style="width: 100%; height: auto;">
                    </el-tab-pane>
                    <el-tab-pane label="粉末图片" name="image15">
                      <img :src="images.image15" alt="粉末图片" style="width: 100%; height: auto;">
                    </el-tab-pane>
                    <el-tab-pane label="纤维图片" name="image16">
                      <img :src="images.image16" alt="纤维图片" style="width: 100%; height: auto;">
                    </el-tab-pane>
                    <el-tab-pane label="手机图片" name="image17">
                      <img :src="images.image17" alt="手机图片" style="width: 100%; height: auto;">
                    </el-tab-pane>
                  <el-tab-pane label="手表图片" name="image18">
                    <img :src="images.image18" alt="手表图片" style="width: 100%; height: auto;">
                  </el-tab-pane>
                  <el-tab-pane label="摄像机图片" name="image19">
                    <img :src="images.image19" alt="摄像机图片" style="width: 100%; height: auto;">
                  </el-tab-pane>

                </el-tabs>

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
      <router-link :to="{path: '/invest', query: { id: id }}">
        <el-button class="previous-button" type="primary" size="large">
          上一步
        </el-button>
      </router-link>

      <router-link :to="{path: '/doHandle',query: { id: id }}">
        <el-button class="next-button" type="primary" size="large" @click="createInfo">
          下一步
        </el-button>
      </router-link>

    </div>
  </div>
</template>

<script setup >
// type="text/javascript" src="https://webapi.amap.com/maps?v=2.0&key=5c913b8a517b8b143534b263a4b3b066"
import axios from "axios";
import {onBeforeMount, onMounted,reactive} from "vue";
import { ref } from 'vue';
import {get, post} from "@/net";
import { ElMessage } from "element-plus";
import {useRoute, useRouter} from "vue-router";
import InvestigationAndInquest from './PDF/InvestigationAndInquest.pdf';
import example from './PDF/example.pdf';
// import Sidebar from '../components/sideBar/SideBar.vue';
import {Location} from "@element-plus/icons-vue";
import MapLoader from "@/util/util";

onBeforeMount(async() => {
  console.log(111)
  await post("/api/infoInput/queryInfo?",
      {
        id: id
      },
      (data) => {
        // 检查 data 是否有效并更新 images 对象
        console.log(data)

        // 遍历数据并赋值给 images 对象
        for (let i = 1; i <= 19; i++) {
          // 使用 `[` 来动态访问属性
          images[`image${i}`] = axios.defaults.baseURL + data[i.toString()] || ''; // 如果 data[i] 为 undefined，赋值为空字符串
        }
        console.log(images.image3)
      });

});
const route = useRoute();
const id = route.query.id;
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


const persons = ref([]);
const images = reactive({
  image1: '',
  image2: '',
  image3: '',
  image4: '',
  image5: '',
  image6: '',
  image7: '',
  image8: '',
  image9: '',
  image10: '',
  image11: '',
  image12: '',
  image13: '',
  image14: '',
  image15: '',
  image16: '',
  image17: '',
  image18: '',
  image19: ''
});

onMounted(() => {
  console.log("mounted...")
  // queryInfo()
})

const queryInfo = async () => {
  console.log("执行查询并显示info");
  try {
    const response = await axios.post(axios.defaults.baseURL + "/api/infoInput/queryInfo", {
      id: id, // 在请求体中发送 id
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response.data);
  } catch (error) {
    console.error("请求出错:", error);
  }
};
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
