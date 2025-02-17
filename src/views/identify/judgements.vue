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

        <el-card class="card_container" v-if="back === undefined">
          <div style="font-size: large;font-weight: bolder;margin: 30px;">
            您即将跳转至 【染病个体解剖检查板块】 请选择
          </div>
          <div>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-button type="primary" size="large" @click="handleClick(true)">
                  是，本次检测包含染病尸体
                </el-button>
              </el-col>
              <el-col :span="12">
                <el-button type="primary" size="large"  @click="handleClick(false)">
                  否，本次检测不包含染病尸体
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>

        <el-card class="card_container" v-else>
          <div>
            <div v-if="form.judge">
              <span>本次检测包含染病尸体</span>
              <div style="color: #409EFF;font-size: small;margin: 50px 0 50px 0">如需修改，请在3秒内点击下方按钮，页面将自动跳转...</div>
              <el-button type="primary" size="large" @click="handleUpdate(false)">
                否，本次检测不包含染病尸体
              </el-button>
            </div>
            <div v-else>
              <span>本次检测不包含染病尸体</span>
              <div style="color: #409EFF;font-size: small;margin: 50px 0 50px 0">如需修改，请在3秒内点击下方按钮，页面将自动跳转...</div>
              <el-button type="primary" size="large" @click="handleUpdate(true)">
                是，本次检测包含染病尸体
              </el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import {useRoute} from "vue-router";
import {onMounted, ref, reactive} from "vue";
import { useCounterStore } from '@/stores/counter';
import {post} from "@/net";
import {ElMessage} from "element-plus";
const counterStore = useCounterStore()

const activeIndex = ref('/judge')
const route = useRoute();
const id = route.query.id;
const back = route.query.back;
const today = new Date();
const form = reactive({
  id: id,
  date: today.toISOString().split('T')[0],
  method: "",
  result: "",
  labResult: "",
  description: "",
  baseSequence: "",
  judge: false,
});

onMounted(async() => {
  if(id){
    await post("/api/identify/select_Identify", {
      id: id,
    }, (data) => {
      console.log(data)
      form.judge = data.judge;
      form.method = data.method;
      form.result = data.result;
      form.labResult = data.labResult;
      form.baseSequence = data.baseSequence;
      form.description = data.description;
      if(back !== undefined){
        setTimeout(() => {
          if(form.judge){
            router.push({path: '/identify1', query: {id: id, back: back}});
          }
          else{
            router.push({path: '/identify2', query: {id: id, back: back}});
          }
        }, 3000) //3s
      }

    });

  }

})

const handleSelect = (index) => {
  // 跳转到对应的路由并带上参数
  router.push({ path: index, query: { id: route.query.id, back: route.query.back } });
}

const handleUpdate = (value) => {
  handleClick(value);
}

const handleClick = (value) => {
  form.judge = value;

  if(!form.judge){
    //如果不包含尸检，删除所有尸检部分内容
    form.result="";
    form.method="";
    form.description="";
    //删除尸检人员名单
    post(
        "/api/identify/delete_autopsyPerson",
        {id:id},
        (data) => {
          console.log("删除案件尸检相关人员");
        }
    )
  }

  // 在这里你可以执行其他的逻辑
  post(
      "/api/identify/create_identify",
      {
        id: id,
        date: form.date,
        method: form.method,
        result: form.result,
        labResult: form.labResult,
        description: form.description,
        judge: form.judge,
        baseSequence: form.baseSequence,
        isUpdate: true,
      },
      (data) => {
        if(value){
          router.push({ path: "/identify1", query: { id: id, back: back } });
        }
        else{
          router.push({ path: "/identify2", query: { id: id, back: back } });
        }
      },
      (data) => {
        ElMessage.warning(data);
      }
  );
};

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
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
}

.el-menu-demo :deep(.el-menu-item) {
  font-size: 20px;
}


.vertical-tabs :deep(.el-tabs__item) {
  font-size: 16px !important;
  margin-bottom: 20px !important;
  /* 改变这个值来改变字体大小 */
}


</style>