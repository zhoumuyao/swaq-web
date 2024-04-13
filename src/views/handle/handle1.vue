<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div>
        <!--        现场详细勘察模块-->
        <el-steps :active="active" finish-status="success" align-center style="margin-top: 20px">
          <el-step title="现场详细勘察" ></el-step>
          <el-step title="现场信息智能录入"></el-step>
          <el-step title="现场无害化处理"></el-step>
          <el-step title="评价与反馈"></el-step>
        </el-steps>
      </div>

      <div class="center-container">
        <el-card class="card_box">
          <div style="width: 92%;margin: 20px">
            <el-form :model="form" label-width="100px">
              <el-form-item label="生物危险因子">
                <el-col :span="18">
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
                <el-col :span="4">
<!--                  这个按钮是新建一个单独的PDF页面，对应handle_sub1，暂时先放着-->
<!--                  <div>-->
<!--                    <el-button type="primary" plain @click="openSub1">查看操作规程</el-button>-->
<!--                  </div>-->
                      <div>
                        <el-button type="primary" plain @click="drawer= true">查看操作规程</el-button>
                      </div>
                </el-col>
              </el-form-item>

              <el-form-item label="案件时间">
                <el-row>
                  <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                  </el-col>
                  <el-col :span="2" > </el-col>
                  <el-col :span="11">
                    <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                  </el-col>
                </el-row>
              </el-form-item>


              <el-form-item label="勘察工作">
                <el-checkbox-group v-model="form.type">
                  <el-checkbox label="记录环境参数" name="type" v-model="checkboxValue"></el-checkbox>
                  <el-checkbox label="现场勘察" name="type" v-model="checkboxValue"></el-checkbox>
                  <el-checkbox label="生物危险因子检材" name="type" v-model="checkboxValue"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>

              <div>
                <el-row>
                  <div class="custom-label">天气状况</div>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-form-item label="湿度数值">
                      <el-input v-model="form.humidity"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="温度数值">
                      <el-input v-model="form.temperature"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="环境风向">
                      <el-input v-model="form.windDirection"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="风速数值">
                      <el-input v-model="form.windSpeed"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <div>
                <el-row>
                  <div class="custom-label">地理信息</div>
                </el-row>
                <el-form-item label="地形和地貌">
                  <el-input type="textarea" v-model="form.desc1" :autosize="{ minRows: 1, maxRows: 3}" placeholder="记录地形特征，如山脉、河流、湖泊等，这些特征可能会影响病原体的传播路径。"></el-input>
                </el-form-item>
                <el-form-item label="地表覆盖">
                  <el-input type="textarea" v-model="form.desc2" :autosize="{ minRows: 1, maxRows: 3}" placeholder="记录土壤类型、植被覆盖等地表特征，这些也可能与病原体传播和存活有关。"></el-input>
                </el-form-item>
              </div>

              <div>
                <el-row>
                  <div class="custom-label">环境参数</div>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="空气质量">
                      <el-input v-model="form.airQuality"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="水质状况">
                      <el-input v-model="form.waterQuality"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="土壤状况">
                      <el-input v-model="form.soilQuality"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <div>
                <el-row>
                  <div class="custom-label">人群情况</div>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="人口密度">
                      <el-input v-model="form.population"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="人员活动">
                      <el-input v-model="form.activity"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--                  <el-col :span="8">-->
                  <!--                    <el-form-item label="其他特殊">-->
                  <!--                      <el-input v-model="form.otherSpecial"></el-input>-->
                  <!--                    </el-form-item>-->
                  <!--                  </el-col>-->
                </el-row>
              </div>

              <div>
                <el-row>
                  <div class="custom-label">其他特殊环境因素</div>
                </el-row>
              <el-row>
                <el-input type="textarea" v-model="form.desc3" :autosize="{ minRows: 2, maxRows: 5}"
                          placeholder="周边设施：存在的医疗设施、食品供应点等，以便提供应急支持和资源调配；动物情况：记录周边的动物种类和数量，尤其是与疫源动物相关的信息。"></el-input>
              </el-row>
                </div>
            </el-form>
          </div>
        </el-card>
      </div>

      <el-drawer v-model="drawer" title="I am the title" :with-header="false" size="50%">
        <!--                <span>Hi there!</span>-->

          <div style="width: 100%;height: 100%;">
            <embed src="src/views/handle/PDF/recordingAndProtection.pdf" type="application/pdf"
                   width="100%" height="100%">
          </div>

      </el-drawer>

      <!-- 切换页面-->
      <router-link :to="{path: '/handle2'}">
        <el-button class="next-button" type="primary" size="large">
          下一步
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { get } from "@/net";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import Sidebar from '@/components/sideBar/SideBar.vue';
import {
  Delete,
} from '@element-plus/icons-vue'
import { InfoFilled } from '@element-plus/icons-vue'

// 当前步骤
const active = ref(0);
const checkboxValue = ref(0)
const drawer = ref(false);

const form = ref({
  name : '',
  type : ['记录环境参数', '现场勘察', '生物危险因子检材'],
  desc1 : '',
  desc2 : '',
  desc3 : '',
  humidity: '',
  temperature: '',
  windDirection: '',
  windSpeed: '',
  airQuality: '',
  waterQuality: '',
  soilQuality: '',
  population:'',
  activity:'',
  otherSpecial:'',
  date1: '',
  date2:''
})
const selectedItems = ref([]);
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
      value: 'Pathogen',
      label: '致病菌'
    }, {
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

const removeChoosenButton = () => {
  // 清空下拉框内容
  selectedItems.value = [];
}

const openSub1 = () =>{
  //跳转至现场信息记录与现场保护PDF子页面
  // router.push('/other-page');
  window.open('/handle_sub1', '_blank');
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

.card_box{
  height:85%;
  overflow-y:auto;
  overflow-x:hidden;
  margin:0px 100px 0px 40px;
}

.scrollbar-wrapper {
  margin-left: 360px;
  margin-top: 50px;
  width: 30%;
}

.custom-label{
  width: 100%;
  font-weight: bold;
  color: #333;
  font-size: 16px;
  padding: 10px 0 10px 0;
  border-top: Dashed 1px #909399;
}
</style>
