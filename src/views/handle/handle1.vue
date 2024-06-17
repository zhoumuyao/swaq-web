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
<!--          <el-step title="评价与反馈"></el-step>-->
        </el-steps>
      </div>

      <div class="center-container">
        <el-card class="card_box">
          <div style="width: 95%;margin: 20px">
            <el-form :model="form" label-width="100px">
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
                    <el-button type="primary" plain @click="drawer= true">现场处置规程</el-button>
                  </div>
                </el-col>
                <el-col :span="3">
                  <div>
                    <el-button type="primary" plain @click="openSub1">样本的采集与运输</el-button>
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

              <div class="row_box">
                <el-row  :gutter="20">
                  <el-col :span="12">
                    <el-row>
                      <div class="custom-label">环境参数</div>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="空气质量">
<!--                          <el-input v-model="form.airQuality"></el-input>-->
                          <el-select v-model="value1" placeholder="请选择">
                            <el-option
                                v-for="item in airQuality"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              <span style="float: left">{{ item.label }}</span>
                              <span style="float: right; color: #8492a6; font-size: 8px">{{ item.value }}</span>
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="水质状况">
<!--                          <el-input v-model="form.waterQuality"></el-input>-->
                          <el-select v-model="value2" placeholder="请选择">
                            <el-option
                                v-for="item in waterQuality"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              <span style="float: left">{{ item.label }}</span>
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="土壤状况">
<!--                          <el-input v-model="form.soilQuality"></el-input>-->
                          <el-select v-model="value3" placeholder="请选择">
                            <el-option
                                v-for="item in soilQuality"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              <span style="float: left">{{ item.label }}</span>
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>

                  <el-col :span="12">
                    <el-row>
                      <div class="custom-label">人群情况</div>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="人口密度">
<!--                          <el-input v-model="form.population"></el-input>-->
                          <el-cascader
                              v-model="value4"
                              :options="population"
                              placeholder="请选择"
                              :props= "{multiple: true}"
                          ></el-cascader>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="人员活动">
<!--                          <el-input v-model="form.activity"></el-input>-->
                          <el-cascader
                              v-model="value5"
                              :options="activity"
                              placeholder="请选择"
                              :props= "{multiple: true}">
                          </el-cascader>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>

                </el-row>

              </div>

              <div class="row_box">
                <el-row>
                  <el-col :span="2"><div class="custom-label">天气状况</div></el-col>
                  <el-col :span="2"><el-button type="text" @click="getWeatherData" style=" padding: 15px 0 10px 0;">一键获取</el-button></el-col>
                  <el-col :span="20"><div style=" padding: 10px 0 10px 0;font-size: 14px;">{{form.province}}/{{form.city}}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">
                    <el-form-item label="温度数值">
                      <el-input v-model="form.temperature" placeholder="单位为℃"></el-input>
<!--                      <el-select v-model="value8" placeholder="请选择">-->
<!--                        <el-option-->
<!--                            v-for="item in temperature"-->
<!--                            :key="item.value"-->
<!--                            :label="item.label"-->
<!--                            :value="item.value">-->
<!--                          <span style="float: left">{{ item.label }}</span>-->
<!--                          <span style="float: right; color: #8492a6; font-size: 8px">{{ item.value }}</span>-->
<!--                        </el-option>-->
<!--                      </el-select>-->
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="湿度数值">
                      <el-input v-model="form.humidity" placeholder="单位为%"></el-input>
<!--                      <el-select v-model="value9" placeholder="请选择">-->
<!--                        <el-option-->
<!--                            v-for="item in humidity"-->
<!--                            :key="item.value"-->
<!--                            :label="item.label"-->
<!--                            :value="item.value">-->
<!--                          <span style="float: left">{{ item.label }}</span>-->
<!--                          <span style="float: right; color: #8492a6; font-size: 8px">{{ item.value }}</span>-->
<!--                        </el-option>-->
<!--                      </el-select>-->
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="天气现象">
                      <el-input v-model="form.weather"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="风速数值">
                      <el-input v-model="form.windpower"  placeholder="单位为m/s"></el-input>
                      <!--                      <el-select v-model="value7" placeholder="请选择">-->
                      <!--                        <el-option-->
                      <!--                            v-for="item in windpower"-->
                      <!--                            :key="item.value"-->
                      <!--                            :label="item.label"-->
                      <!--                            :value="item.value">-->
                      <!--                          <span style="float: left">{{ item.label }}</span>-->
                      <!--                          <span style="float: right; color: #8492a6; font-size: 8px">{{ item.value }}</span>-->
                      <!--                        </el-option>-->
                      <!--                      </el-select>-->
                    </el-form-item>
                  </el-col>

                  <el-col :span="5">
                    <el-form-item label="环境风向">
                      <el-input v-model="form.winddirection"></el-input>
                      <!--                      <el-select v-model="value6" placeholder="请选择">-->
                      <!--                        <el-option-->
                      <!--                            v-for="item in winddirection"-->
                      <!--                            :key="item.value"-->
                      <!--                            :label="item.label"-->
                      <!--                            :value="item.value">-->
                      <!--                          <span style="float: left">{{ item.label }}</span>-->
                      <!--                        </el-option>-->
                      <!--                      </el-select>-->
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <div class="row_box">
                <el-row>
                  <div class="custom-label">地理信息</div>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="地形和地貌">
                      <el-input type="textarea" v-model="form.desc1" :autosize="{ minRows: 1, maxRows: 3}" placeholder="记录地形特征，如山脉、河流、湖泊等，这些特征可能会影响病原体的传播路径。"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="地表覆盖">
                      <el-input type="textarea" v-model="form.desc2" :autosize="{ minRows: 1, maxRows: 3}" placeholder="记录土壤类型、植被覆盖等地表特征，这些也可能与病原体传播和存活有关。"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <div class="row_box">
                <el-row>
                  <div class="custom-label">其他特殊环境因素</div>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="周边设施">
                      <el-input type="textarea" v-model="form.desc3" :autosize="{ minRows: 2, maxRows: 5}"
                                placeholder="存在的医疗设施、食品供应点等，以便提供应急支持和资源调配。"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="动物情况">
                      <el-input type="textarea" v-model="form.desc4" :autosize="{ minRows: 2, maxRows: 5}"
                                placeholder="记录周边的动物种类和数量，尤其是与疫源动物相关的信息。"></el-input>
                    </el-form-item>

                  </el-col>
                </el-row>
              </div>
            </el-form>
          </div>
        </el-card>
      </div>

      <el-drawer v-model="drawer" title="I am the title" :with-header="false" size="50%">
        <!--                <span>Hi there!</span>-->

        <div style="width: 100%;height: 100%;">
          <embed :src="recordingAndProtection" type="application/pdf"
                 width="100%" height="100%">
        </div>

      </el-drawer>

      <!-- 切换页面-->
<!--      <router-link :to="{path: '/handle2'}">-->
        <el-button class="next-button" type="primary" size="large" @click="next_page">
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
import router from '@/router';
import Sidebar from '@/components/sideBar/SideBar.vue';
import {
  Delete,
} from '@element-plus/icons-vue'
import { InfoFilled } from '@element-plus/icons-vue'
import recordingAndProtection from './PDF/recordingAndProtection.pdf';
import axios from "axios";

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
  desc4 : '',
  humidity: '',
  province:'省份',
  city:'城市',
  temperature: '',
  winddirection: '',
  windpower: '',
  weather:'',
  // airQuality: '',
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

const airQuality = ref([{
  value: '<50',
  label: '优'
}, {
  value: '<100',
  label: '良好'
}, {
  value: '<150',
  label: '轻度污染'
}, {
  value: '<200',
  label: '中度污染'
}, {
  value: '<300',
  label: '重度污染'
}, {
  value: '>300',
  label: '严重污染'
}]);

const waterQuality= ref([{
  value: '1',
  label: 'I类'
}, {
  value: '2',
  label: 'II类'
}, {
  value: '3',
  label: 'III类'
}, {
  value: '4',
  label: 'IV类'
}, {
  value: '5',
  label: 'V类'
}]);

const soilQuality= ref([{
  value: '1',
  label: '一级'
}, {
  value: '2',
  label: '二级',
}, {
  value: '3',
  label: '三级'
}]);

const population = ref([{
  value: '1',
  label: '人员密度',
  children: [{
    value: '11',
    label: '较低'
    }, {
      value: '12',
      label: '一般'
    }, {
      value: '13',
      label: '较高'
    },
    {
      value: '14',
      label: '密集'
    }]
}, {
  value: '2',
  label: '分布情况',
  children: [{
      value: '21',
      label: '稀疏'
    }, {
      value: '22',
      label: '分散'
    }, {
      value: '23',
      label: '较密集'
    }, {
      value: '24',
      label: '密集'
    }, {
      value: '25',
      label: '聚集'
  }]
}]);

const activity = ref([{
  value: '1',
  label: '聚集活动',
  children: [{
    value: '11',
    label: '无聚集活动'
  }, {
    value: '12',
    label: '小范围聚集'
  }, {
      value: '13',
      label: '中规模聚集'
  },
  {
    value: '14',
    label: '大规模聚集'
  }]
}, {
  value: '2',
  label: '交通情况',
  children: [{
      value: '21',
      label: '通畅'
    }, {
      value: '22',
      label: '较通畅'
    }, {
      value: '23',
      label: '不通畅'
    },
    {
      value: '24',
      label: '拥堵'
    }]
}]);

const humidity = ref([{
  value: '≤30%',
  label: '干燥'
}, {
  value: '30%-60%',
  label: '舒适',
}, {
  value: '60%-70%',
  label: '潮湿'
}, {
  value: '70%-90%',
  label: '闷热'
}, {
  value: '≥90%',
  label: '极度潮湿'
}]);

const temperature = ref([{
  value: '<0℃',
  label: '寒冷',
},{
  value: '0℃-10℃',
  label: '微寒',
},{
  value: '10℃-20℃',
  label: '凉爽',
},{
  value: '20℃-15℃',
  label: '舒适'
}, {
  value: '25°C-35°C',
  label: '炎热',
}, {
  value: '≥35°C',
  label: '酷热'
}]);

const winddirection = ref([{
  value: 'N',
  label: '北风'
}, {
  value: 'NNE',
  label: '东北偏北风',
}, {
  value: 'NE',
  label: '东北风'
}, {
  value: 'ENE',
  label: '东北偏东风'
}, {
  value: 'E',
    label: '东风'
}, {
  value: 'ESE',
      label: '东南偏东风'
}, {
  value: 'SE',
      label: '东南风'
}, {
  value: 'SSE',
      label: '东南偏南风'
}, {
  value: 'S',
      label: '南风'
}, {
  value: 'SSW',
      label: '西南偏南风'
}, {
  value: 'SW',
      label: '西南风'
}, {
  value: 'WSW',
      label: '西南偏西风'
}, {
  value: 'W',
      label: '西风'
}, {
  value: 'WNW',
      label: '西北偏西风'
}, {
  value: 'NW',
      label: '西北风'
},
{
  value: 'NNW',
      label: '西北偏北风'
}
]);

const windpower = ref([{
  value: '< 0.5 m/s',
  label: '无风'
}, {
  value: '0.5–1.5 m/s',
  label: '软风',
}, {
  value: '1.6–3.3 m/s',
  label: '轻风'
}, {
  value: '3.4–5.5 m/s',
  label: '微风'
}, {
  value: '5.5–7.9 m/s',
  label: '和风'
}, {
  value: '8–10.7 m/s',
  label: '清风'
}, {
  value: '10.8–13.8 m/s',
  label: '强风'
}, {
  value: '13.9–17.1 m/s',
  label: '疾风'
}, {
  value: '17.2–20.7 m/s',
  label: '大风'
}, {
  value: '20.8–24.4 m/s',
  label: '烈风'
}, {
  value: '24.5–28.4 m/s',
  label: '狂风'
}, {
  value: '28.5–32.6 m/s',
  label: '暴风'
}, {
  value: '≥ 32.7 m/s',
  label: '飓风'
}]);

const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
const value4 = ref('');
const value5 = ref('');
const value6 = ref('');
const value7 = ref('');
const value8 = ref('');
const value9 = ref('');


const removeChoosenButton = () => {
  // 清空下拉框内容
  selectedItems.value = [];
}

const openSub1 = () =>{
  //跳转至现场信息记录与现场保护PDF子页面
  // router.push('/other-page');
  window.open('/identify0', '_blank');
}

const getWeatherData = async () => {
  // 调用高德API获取地理位置和天气信息
  axios.get('https://restapi.amap.com/v3/ip?key=d0d9f1b6ec05f6ece98d3c2900e73f2e')
    .then(function(response) {
      // console.log(response.data);
      // 获取现在的城市的adcode编码
      const adcode = response.data.adcode;

      // 使用adcode的值来获取天气数据
      axios.get(`https://restapi.amap.com/v3/weather/weatherInfo?city=${adcode}&key=d0d9f1b6ec05f6ece98d3c2900e73f2e`)
        .then(function(weatherResponse) {
          console.log(weatherResponse.data); // 处理天气数据
          form.value.temperature = weatherResponse.data.lives[0].temperature;//温度
          form.value.humidity = weatherResponse.data.lives[0].humidity;//湿度
          form.value.weather = weatherResponse.data.lives[0].weather;//天气现象
          form.value.winddirection = weatherResponse.data.lives[0].winddirection;//风向
          form.value.windpower = weatherResponse.data.lives[0].windpower;//风速

          // 显示当前位置
          form.value.province = weatherResponse.data.lives[0].province;
          form.value.city = weatherResponse.data.lives[0].city;

        })
        .catch(function(error) {
          console.error("Error fetching weather data:", error);
        });
    })
    .catch(function(error) {
      console.error(error);
    });
};

const isFormValid = () =>{
  /**
   * name : '',
   *   type : ['记录环境参数', '现场勘察', '生物危险因子检材'],
   *   desc1 : '',
   *   desc2 : '',
   *   desc3 : '',
   *   desc4 : '',
   *   humidity: '',
   *   province:'省份',
   *   city:'城市',
   *   temperature: '',
   *   winddirection: '',
   *   windpower: '',
   *   weather:'',
   *   // airQuality: '',
   *   waterQuality: '',
   *   soilQuality: '',
   *   population:'',
   *   activity:'',
   *   otherSpecial:'',
   *   date1: '',
   *   date2:''
   * */
  if(form.value.desc1.trim() !== '' &&
      form.value.desc2.trim() !== '' &&
      form.value.desc3.trim() !== '' &&
      form.value.desc4.trim() !== ''&&
      form.value.humidity.trim() !== '' &&
      form.value.temperature.trim() !== '' &&
      form.value.winddirection.trim() !== '' &&
      form.value.windpower.trim() !== '' &&
      form.value.weather.trim() !== '' &&
      form.value.date1 !== '' &&
      form.value.date2 !== '' &&
      value1.value.trim() !== '' &&
      value2.value.trim() !== '' &&
      value3.value.trim() !== '' &&
      value4.value !== ''&&
      value5.value !== ''&&
      selectedItems.value !== []){
    return true; // 如果所有字段都不为空，则返回true
  } else {
    return false; // 如果有任何一个字段为空，则返回false
  }
}
const next_page = () =>{
  if (isFormValid()) {
    router.push('/handle2');
  }
  else{
    ElMessage({
      message: '请输入完整的信息',
      type: 'error'
    });
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

.row_box{
  padding: 15px 0 15px 0;
  border-top: Dashed 1px #909399;
}

.custom-label{
  width: 100%;
  font-weight: bold;
  color: #333;
  font-size: 16px;
  padding: 10px 0 10px 0;
}
</style>
