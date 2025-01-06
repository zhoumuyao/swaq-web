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
              <img src="/public/bacteria/anthracis.png"  style="width: 100%; height: auto;">
            </el-card>

            <el-card>
              <p style="font-size: 20px; font-weight: bold; color: #333; line-height: 1.6;">
                生物危险因子名称：{{ dangerName }}
              </p>

              <!-- 传播途径输入框 -->
              <el-form-item label="传播途径">
                <el-input
                    v-model="transmissionRoute"
                    placeholder="请输入传播途径"
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 3 }"
                    style="width: 400px;">
                </el-input>
              </el-form-item>
              <!-- 传播范围输入框 -->
              <el-form-item label="传播范围">
                <el-input
                    v-model="transmissionRange"
                    placeholder="请输入传播范围"
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 3 }"
                    style="width: 400px;">
                </el-input>
              </el-form-item>

              <el-form-item label="活性">
                <el-input
                    v-model="activity"
                    placeholder="请输入活性"
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 3 }"
                    style="width: 400px;margin-left: 30px">
                </el-input>
              </el-form-item>
            </el-card>

          </div>
<!--          <el-card style="margin-left: 2%;margin-right: 2%;margin-bottom: 5%">-->
<!--            <p style="font-size: 16px;  line-height: 1.6;">-->
<!--              炭疽杆菌 (Bacillus anthracis) 的基因组是一条环状双链 DNA，大小约为5.23百万碱基对（Mb），其染色体包含多个重要基因，决定了它的致病性和生存能力。该菌的基因组具有两个质粒，分别为 pXO1 和 pXO2，这两个质粒携带了关键的毒力基因。-->

<!--              pXO1 质粒（约181 kb）携带编码炭疽毒素（包括保护性抗原、致死因子和水肿因子）的基因，这些毒素是导致炭疽病致命性的关键。-->
<!--              pXO2 质粒（约96 kb）包含编码荚膜合成的基因，使细菌能够抵抗宿主的免疫反应。-->
<!--              炭疽杆菌的核酸序列具有高度保守性，因此在基因检测中通常通过 PCR 技术靶向其毒素基因和荚膜基因进行鉴定。-->
<!--            </p>-->
<!--          </el-card>-->
        </el-card>



        <el-drawer v-model="drawer2" title="I am the title" :with-header="false" size="50%">
          <!--                <span>Hi there!</span>-->

          <div style="width: 100%;height: 100%;">
            <embed :src="recordingAndProtection" type="application/pdf"
                   width="100%" height="100%">
          </div>

        </el-drawer>


      </div>

      <router-link :to="{path: '/infoInput', query: { id: id }}">
        <el-button class="previous-button" type="primary" size="large">
          上一步
        </el-button>
      </router-link>

      <!-- 切换页面-->
      <router-link :to="{path: '/invest',query: { id: id }}">
        <el-button class="next-button" type="primary" size="large" @click="updateDangerInfo()">
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

const dangerName = ref(""); // 存储名称
const transmissionRange = ref(""); // 存储传播范围
const transmissionRoute = ref(""); // 存储传播途径
const activity = ref(""); // 存储活性

// 是否显示默认的以上三点 ，0为是，1为否
const flag = ref(0)


// 当前步骤
const active = ref(1);

const form = ref({
  name : ' ',
  type : ' ',
  description : '',
})
const selectedItems = ref([
]);

const value = ref('');

const options = ref([{
  value: 'chuanbo',
  label: '传播信息',
  children: [{
    value: 'infectious',
    label: '传染性',
    children: [{
      value: '一级',
      label: '一级'
    }, {
      value: '二级',
      label: '二级'
    }, {
      value: '三级',
      label: '三级'
    }]
  }]
}, {
  value: 'tezheng',
  label: '特征信息',
  children: [{
    value: 'pathogenicity',
    label: '致病性',
    children: [{
      value: '致病',
      label: '致病'
    }, {
      value: '非致病',
      label: '非致病'
    }]
  }, {
    value: 'toxicity',
    label: '毒性',
    children: [{
      value: '高',
      label: '高'
    }, {
      value: '中',
      label: '中'
    }, {
      value: '低',
      label: '低'
    }, {
      value: '较强',
      label: '较强'
    }, {
      value: '强',
      label: '强'
    }]
  }, {
    value: 'invasiveness',
    label: '侵袭性',
    children: [{
      value: '高',
      label: '高'
    }, {
      value: '中',
      label: '中'
    }, {
      value: '低',
      label: '低'
    }, {
      value: '较强',
      label: '较强'
    }, {
      value: '强',
      label: '强'
    }]
  }, {
    value: 'fatalityRate',
    label: '致死率',
    children: [{
      value: '高',
      label: '高'
    }, {
      value: '中',
      label: '中'
    }, {
      value: '低',
      label: '低'
    }, {
      value: '较高',
      label: '较高'
    }, {
      value: '较低',
      label: '较低'
    }]
  }, {
    value: 'incidenceRate',
    label: '发病率',
    children: [{
      value: '高',
      label: '高'
    }, {
      value: '中',
      label: '中'
    }, {
      value: '低',
      label: '低'
    }, {
      value: '较高',
      label: '较高'
    }, {
      value: '较低',
      label: '较低'
    }]
  }]
}]);


onMounted(() => {
  console.log("mounted...")
  queryDanger()
  queryBiologyInfo()

})

const queryBiologyInfo = async () => {
  console.log("执行查询并显示danger");

// 发送第一个请求
  fetch(axios.defaults.baseURL + "/api/biologyInfo/find_dangername?id=" + id, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
  })
      .then(response => {
        // 检查响应是否成功
        if (!response.ok) {
          return Promise.reject("First request network response was not ok");
        }

        // 解析第一个请求的响应数据
        return response.json();
      })
      .then(firstData => {
        // 打印第一个请求返回的数据

        // 假设你需要从第一个请求的数据中提取字段（如 `firstData.message`），然后用它来作为第二个请求的参数
        // this.dangerName = firstData.message;
        console.log("First response data:", firstData.message);
        dangerName.value = firstData.message;

        // 发送第二个请求
        return fetch(axios.defaults.baseURL + "/api/biologyInfo/searchInfo?dangerName=" + firstData.message, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
        });
      })
      .then(secondResponse => {
        // 检查第二个请求的响应是否成功
        if (!secondResponse.ok) {
          return Promise.reject("Second request network response was not ok");
        }

        // 解析第二个请求的响应数据
        return secondResponse.json();
      })
      .then(secondData => {
        console.log("flag=" + flag.value)
        console.log("执行显示默认值")
        if(flag.value === 0) transmissionRange.value = secondData.message.transmissionRange;
        if(flag.value === 0)activity.value = secondData.message.activity;
        if(flag.value === 0)transmissionRoute.value = secondData.message.transmissionRoute
        // 打印第二个请求返回的数据
        console.log("Second response data:", secondData.message);


        // 提取 secondData.message 中的指标值
        const { infectious, pathogenicity, toxicity, invasiveness, fatalityRate, incidenceRate } = secondData.message;
        console.log(toxicity)

        // 设置 selectedItems，自动选择匹配的项
        selectedItems.value = [
          'infectious', infectious,       // 'infectious' => '二级'
          'pathogenicity', pathogenicity, // 'pathogenicity' => '致病'
          'toxicity', toxicity,           // 'toxicity' => '中'
          'invasiveness', invasiveness,   // 'invasiveness' => '高'
          'fatalityRate', fatalityRate,         // 'deathRate' => '较低'
          'incidenceRate', incidenceRate  // 'incidenceRate' => '低'
        ];


      });

};
const queryDanger = async () => {
  console.log("执行查询是否已经存了，如存 flag == 1");

  try {
    // 发送 GET 请求获取数据
    const response = await fetch(axios.defaults.baseURL + "/api/dangerInfo/queryDanger?id=" + id, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    console.log(data.success)
    // 检查响应是否成功
    if (!data.success) {
      return;
    }
    console.log("执行显示修改值")
    flag.value =1
    // 解析响应数据
    // 打印数据并赋值给表单
    console.log("Response data:", data.message);

    transmissionRange.value = data.message.transmissionRange;
    activity.value = data.message.activity;
    transmissionRoute.value = data.message.transmissionRoute

    // 将后端返回的数据赋值给前端的表单值

  } catch (error) {
    // 捕捉错误并打印
    console.error("Error:", error);
  }
};

const updateDangerInfo = async () => {
  console.log("更新dangerinfo，根据id");
  const dangerVO = {
    caseId: id,  // 假设你已经从组件中获取了 id
    transmissionRoute: transmissionRoute.value,  // 使用你的 Vue ref 或 data 属性
    transmissionRange: transmissionRange.value,  // 同上
    activity: activity.value,  // 同上
  };
  try {
    // 发送 GET 请求获取数据
    const response = await fetch(axios.defaults.baseURL + "/api/dangerInfo/updateDanger", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dangerVO),  // 将对象转化为 JSON 字符串
    });
    // 检查响应状态
    if (response.ok) {
      const data = await response.json();
      console.log("更新成功:", data);
    } else {
      console.error("更新失败，状态码:", response.status);
    }

  } catch (error) {
    // 捕捉错误并打印
    console.error("Error:", error);
  }
};

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
