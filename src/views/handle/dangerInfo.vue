<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div>
        <!--        现场信息智能录入模块-->
        <el-steps :active="active" finish-status="success" align-center style="margin-top: 20px">
          <el-step title="现场信息智能录入" ></el-step>
          <el-step title="生物危险因子信息" ></el-step>
          <el-step title="现场详细勘察"></el-step>
          <el-step title="现场无害化处理"></el-step>
          <!--          <el-step title="评价与反馈"></el-step>-->
        </el-steps>
      </div>
      <div  class="center-container">

        <el-card class="card_box">
          <el-form-item label="生物危险因子">
            <el-col :span="16">
              <div>
                <el-scrollbar wrap-class="scrollbar-wrapper">
                  <el-cascader
                      placeholder="添加/搜索生物危险因子信息"
                      :options="options"
                      v-model="selectedItems"
                      :props="{ multiple: true }"
                      filterable
                      style="width: 100%;"></el-cascader>
                </el-scrollbar>
              </div>
            </el-col>
            <el-col :span="2">
              <div>
                <el-popconfirm
                    width="250"
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    :icon="InfoFilled"
                    icon-color="#626AEF"
                    title="确定清空所有生物危险因子吗？"
                    @confirm="removeChoosenButton">
                  <template #reference>
                    <el-button>清空</el-button>
                  </template>
                </el-popconfirm>
              </div>
            </el-col>
            <el-col :span="3">
              <!--                  这个按钮是新建一个单独的PDF页面，对应handle_sub1，暂时先
              放着-->
              <!--                  <div>-->
              <!--                    <el-button type="primary" plain @click="openSub1">查看操作规程</el-button>-->
              <!--                  </div>-->
              <div>
                <el-button type="primary" plain @click="drawer2= true">现场处置规程</el-button>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <el-button type="primary" plain @click="openSub1">样本的采集与运输</el-button>
              </div>
            </el-col>
          </el-form-item>
          <div class="twice">
            <el-card type="border-card">
              <img src="https://th.bing.com/th/id/OIP.HAiAGXrT4GRoAeoNfS5e6QHaEL?rs=1&pid=ImgDetMain" alt="Image Description" style="width: 100%; height: auto;">
            </el-card>
            <el-card>
              <p style="font-size: 20px; font-weight: bold; color: #333; line-height: 1.6;">炭疽杆菌（Bacillus anthracis）:
              </p>
              <p> 是一种革兰氏阳性、形成孢子的杆状细菌，是炭疽病的病原体。它能够在自然环境中形成休眠孢子，具备高度的环境耐受性。炭疽杆菌主要通过接触受污染的动物产品、吸入孢子或食用被感染的动物而感染人体，感染形式包括皮肤炭疽、肺炭疽和肠炭疽，均可能引发严重甚至致命的症状。该菌还因其潜在的生物武器用途而备受关注
              </p>
        </el-card>

          </div>
          <el-card style="margin-left: 2%;margin-right: 2%;margin-bottom: 5%">
            <p style="font-size: 16px;  line-height: 1.6;">
              炭疽杆菌 (Bacillus anthracis) 的基因组是一条环状双链 DNA，大小约为5.23百万碱基对（Mb），其染色体包含多个重要基因，决定了它的致病性和生存能力。该菌的基因组具有两个质粒，分别为 pXO1 和 pXO2，这两个质粒携带了关键的毒力基因。

              pXO1 质粒（约181 kb）携带编码炭疽毒素（包括保护性抗原、致死因子和水肿因子）的基因，这些毒素是导致炭疽病致命性的关键。
              pXO2 质粒（约96 kb）包含编码荚膜合成的基因，使细菌能够抵抗宿主的免疫反应。
              炭疽杆菌的核酸序列具有高度保守性，因此在基因检测中通常通过 PCR 技术靶向其毒素基因和荚膜基因进行鉴定。
            </p>
          </el-card>
        </el-card>



        <el-drawer v-model="drawer2" title="I am the title" :with-header="false" size="50%">
          <!--                <span>Hi there!</span>-->

          <div style="width: 100%;height: 100%;">
            <embed :src="recordingAndProtection" type="application/pdf"
                   width="100%" height="100%">
          </div>

        </el-drawer>


      </div>


      <!-- 切换页面-->
      <router-link :to="{path: '/infoInput', query: { id: id }}">
        <el-button class="previous-button" type="primary" size="large">
          上一步
        </el-button>
      </router-link>

      <!-- 切换页面-->
      <router-link :to="{path: '/invest',query: { id: id }}">
        <el-button class="next-button" type="primary" size="large" @click="createInfo">
          下一步
        </el-button>
      </router-link>

    </div>
  </div>
</template>

<script setup >


import { onMounted } from "vue";
import { ref } from 'vue';
import {get, post} from "@/net";
import { ElMessage } from "element-plus";
import {useRoute, useRouter} from "vue-router";
import InvestigationAndInquest from './PDF/InvestigationAndInquest.pdf';
import example from './PDF/example.pdf';

import {InfoFilled, Location} from "@element-plus/icons-vue";
import MapLoader from "@/util/util";

const route = useRoute();
const id = route.query.id;
import axios from "axios";
import myBMap from "/src/util/myBMap";
import router from "@/router";
import recordingAndProtection from "@/views/handle/PDF/recordingAndProtection.pdf";
const drawer2 = ref(false);

const imageUrl = ref("");

const text = ref("");

// 当前步骤
const active = ref(1);

const form = ref({
  name : ' ',
  type : ' ',
  description : '',
})
const selectedItems = ref([
  'Infectiousness',  // 选择了传染性
  'high',            // 选择了高
  'Airborne' ,      // 选择了空气气溶胶传播
  'global','pathogenic', 'Very High Mortality',
]);

// const selectedItems = ref([]);
const value = ref('');

const options = ref([{
  value: 'chuanbo',
  label: '传播信息',
  children: [{
    value: 'Infectiousness',
    label: '传染性',
    children: [{
      value: 'high',
      label: '高'
    }, {
      value: 'medium',
      label: '中'
    }, {
      value: 'low',
      label: '低'
    }, {
      value: 'null',
      label: '无'
    }]
  }, {
    value: 'pathway',
    label: '传播途径',
    children: [{
      value: 'Airborne',
      label: '空气气溶胶传播'
    }, {
      value: 'Waterborne',
      label: '水源传播'
    },{
      value: 'Droplet',
      label: '飞沫传播'
    },{
      value: 'Contact',
      label: '接触传播'
    },{
      value: 'Foodborne',
      label: '食物源传播'
    },]
  },{
    value: 'scope',
    label: '传播范围',
    children: [{
      value: 'global',
      label: '全球传播'
    }, {
      value: 'area',
      label: '地区传播'
    }, {
      value: 'street',
      label: '街区传播'
    }, {
      value: 'home',
      label: '家庭传播'
    }]
  }]
}, {
  value: 'tezheng',
  label: '特征信息',
  children: [{
    value: 'Pathogenicity',
    label: '病原性',
    children: [{
      value: 'pathogenic',
      label: '致病性'
    }, {
      value: 'Non-pathogenic',
      label: '非致病性'
    }]
  }, {
    value: 'Toxicity',
    label: '毒性',
    children: [{
      value: 'high',
      label: '高'
    }, {
      value: 'medium',
      label: '中'
    }, {
      value: 'low',
      label: '低'
    }, {
      value: 'null',
      label: '无毒'
    }]
  }, {
    value: 'Invasiveness',
    label: '侵袭性',
    children: [{
      value: 'high',
      label: '高'
    }, {
      value: 'medium',
      label: '中'
    }, {
      value: 'low',
      label: '低'
    }]
  }, {
    value: 'Death Rate',
    label: '致死率',
    children: [{
      value: 'Very Low Mortality',
      label: '小于1%'
    }, {
      value: 'Low Mortality',
      label: '1%-5%'
    }, {
      value: 'Moderate Mortality',
      label: '5%-10%'
    }, {
      value: 'High Mortality',
      label: '10%-20%'
    }, {
      value: 'Very High Mortality',
      label: '大于20%'
    }]
  }, {
    value: 'Incidence Rate',
    label: '发病率',
    children: [{
      value: 'Very Low Mortality',
      label: '小于1%'
    }, {
      value: 'Low Mortality',
      label: '1%-5%'
    }, {
      value: 'Moderate Mortality',
      label: '5%-10%'
    }, {
      value: 'High Mortality',
      label: '10%-20%'
    }, {
      value: 'Very High Mortality',
      label: '大于20%'
    }]
  }, {
    value: 'virulence',
    label: '活性',
    children: [{
      value: 'high',
      label: '高'
    }, {
      value: 'medium',
      label: '中'
    }, {
      value: 'low',
      label: '低'
    }]
  }]
}, ]) ;

onMounted(() => {
  console.log("mounted...")
})

const openSub1 = () =>{
  //跳转至现场信息记录与现场保护PDF子页面
  // router.push('/other-page');
  window.open('/identify0', '_blank');
}
const removeChoosenButton = () => {
  // 清空下拉框内容
  selectedItems.value = [];
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
.card_box{
  height:85%;
  overflow-y:auto;
  overflow-x:hidden;
  margin:0 60px 0 40px;
}
.previous-button{
  position: fixed;
  bottom: 7%;
  left: 83%;
}

.card_box{
  height:80%;
  overflow-y:auto;
  overflow-x:hidden;
  margin:0 60px 0 40px;
  padding: 20px;

}
.twice{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  min-height: 350px;
  margin:5% 30px 20px 30px
}
.twice el-card {
  min-height: 200px; /* 设置卡片的最小高度 */
}
</style>
