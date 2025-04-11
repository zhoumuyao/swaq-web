<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div>
        <!-- 检验鉴定模块-->
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
          <el-menu-item index="/identify0">生物危险因子检测</el-menu-item>
          <el-menu-item index="/judge">染病个体解剖查验</el-menu-item>
          <el-menu-item index="/identify2">检验鉴定报告</el-menu-item>
        </el-menu>

        <el-row>
          <el-col :span="12">
            <el-card class="card_container">
              <span style="font-weight: bolder;font-size: 20px">
                生物危险因子检测
              </span>
              <div style="width: 100%;margin-top: 50px;">
                <span>实验室检验人员</span>
                <el-table v-if="Labspeople.length > 0" :data="Labspeople" height="150" style="width: 100%;margin-top: 20px;">
                  <el-table-column prop="id" label="警务号" />
                  <el-table-column prop="name" label="姓名" />
                </el-table>
               <div v-else class="empty_style">
                 暂无
               </div>

              </div>
              <div style="width: 100%;margin-top: 50px;">
                <span>检验内容</span>
                <el-table v-if="LabsData.length > 0" :data="LabsData">
                  <el-table-column prop="objectClass" label="处置对象" width="80"/>
                  <el-table-column prop="sampleType" label="采样种类" width="80"/>
                  <el-table-column prop="sampleContent" label="采样内容" />
                  <el-table-column prop="testMethod" label="快检方法" />
                  <el-table-column prop="result" label="快检结果" />
                </el-table>
                <div v-else class="empty_style">
                  暂无
                </div>
              </div>

              <div style="width: 100%;margin-top: 50px;">
                <span>实验室检测结果</span>
                <div v-if="labResult!==null && labResult.trim().length > 0" style="margin: 20px 0 0 15px;font-weight: bold;color: #666666">
                  {{labResult}}
                </div>
                <div v-else class="empty_style">
                  暂无
                </div>
              </div>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card class="card_container">
              <span style="font-weight: bolder;font-size: 20px">
                染病个体解剖查验
              </span>
              <div v-if="judge">
                <div style="width: 100%;margin-top: 50px;">
                  <span>解剖人员</span>
                  <el-table v-if="prosectors.length > 0" :data="prosectors" height="150" style="width: 100%;margin-top: 20px;">
                    <el-table-column prop="id" label="警务号" />
                    <el-table-column prop="name" label="姓名" />
                  </el-table>
                  <div v-else class="empty_style">
                    暂无
                  </div>
                </div>

                <div style="width: 100%;margin-top: 50px;">
                  <span>检验内容</span>
                  <el-table v-if="DissectData.length > 0" :data="DissectData">
                    <el-table-column prop="date" label="鉴定日期" width="110"/>
                    <el-table-column prop="method" label="分析识别方法" width="110" />
                    <el-table-column prop="result" label="检验结果" />
                    <el-table-column prop="description" label="鉴定意见" />
                  </el-table>
                  <div v-else class="empty_style">
                    暂无
                  </div>
                </div>


              </div>
              <div v-else style="align-items: center;">
                <el-empty description="本次检测不包含染病实体" />
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-button
            class="back-button"
            size="large"
            @click="pre"
            type="primary"
        >上一步</el-button>
        <el-button
            class="next-button"
            size="large"
            @click="next"
            type="primary"
        >下一步</el-button>

      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import router from "@/router";
import {useRoute} from "vue-router";
import {post} from "@/net";

const activeIndex =ref("/identify2")
const route = useRoute();
const id = route.query.id;
const back = route.query.back;
const judge = ref(false);

const Labspeople = ref([]);

const prosectors = ref([]);

const LabsData = ref([]);
const DissectData = ref([]);

//存放已选择的人员
const labsPersonIdList = ref([]);
const autopsyPersonIdList = ref([]);
//存放数据库内所有的人员与仪器
const persons = ref([]);

//实验室检测结果
const labResult = ref("");

const handleSelect = (index) => {
  // 跳转到对应的路由并带上参数
  router.push({ path: index, query: { id: route.query.id, back: route.query.back } });
}

const pre = () =>{
  if(judge.value){
    router.push({ path: "/identify1", query: { id: route.query.id, back: route.query.back } });
  }
  else{
    router.push({ path: "/identify0", query: { id: route.query.id, back: route.query.back } });
  }
}


const next = () =>{
  router.push({ path: "/feedback", query: { id: route.query.id, back: route.query.back } });
}

onMounted(() => {
  if(id){
    post(
        "/api/disposal/search_disposal",
        {
          id: id,
        },
        (data) => {
          LabsData.value = data;
          console.log(data);
        }
    );

    post("/api/identify/select_Identify",  {
      id: id,
    }, (data) => {
      console.log(data)
      judge.value = data.judge;
      DissectData.value = [data];
      labResult.value = data.labResult;
    });

    post("/api/identify/select_person", {}, (data) => {
      persons.value = data;
      post(
          "/api/identify/select_labsPerson",
          {
            id: id,
          },
          (data) => {
            labsPersonIdList.value = data;
            Labspeople.value = persons.value.filter((person) =>
                labsPersonIdList.value.includes(person.id)
            );
          }
      );
      post(
          "/api/identify/select_autopsyPerson",
          {
            id: id,
          },
          (data) => {
            autopsyPersonIdList.value = data;
            prosectors.value = persons.value.filter((person) =>
                autopsyPersonIdList.value.includes(person.id)
            );
          }
      );
    });
  }

});

</script>

<style scoped>
.app {
  display: flex;
  height: 100vh;
}

.content {
  flex: 1;
  margin-left: 200px;
  /* 与侧边栏宽度对应 */
  /* 添加其他样式，如内容区域的填充等 */
}

.demo-tabs :deep(.el-tabs__item) {
  margin-left: 30px;
  font-size: 16px !important;
  /* 设置你想要的字体大小 */
}

.card_container {
  /* //display: flex;
  //justify-content: center;
  //align-items: center; */
  margin: 30px;
  height: 75vh;
  overflow-y: auto;
}

.back-button {
  position: absolute;
  bottom: 50px;
  /* 距离底部的间距 */
  right: 120px;
}

.next-button {
  position: absolute;
  bottom: 50px;
  /* 距离底部的间距 */
  right: 30px;
  /* 距离右侧的间距 */
}

.el-menu-demo :deep(.el-menu-item) {
  font-size: 20px;
}


.vertical-tabs :deep(.el-tabs__item) {
  font-size: 16px !important;
  margin-bottom: 20px !important;
  /* 改变这个值来改变字体大小 */
}

.empty_style{
  margin: 20px 0 0 15px;
  font-weight: bold;
  color: #666666
}
</style>