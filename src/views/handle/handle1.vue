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
                    <el-col :span="4">
                      <div class="custom-label">环境参数</div>
                    </el-col>
                    <el-col :span="6">
                      <el-popover placement="right" :width="400" trigger="click">
                        <template #reference>
                          <el-link type="primary" :underline="false" style="padding: 10px 0 5px 0;">空气质量指数AQI</el-link>
                        </template>
                        <img src="./image/IQA.png" alt="Image" style="width: 500px; height: auto;display: block;" />
                      </el-popover>
                    </el-col>
                    <el-col :span="6">
                      <el-popover placement="right" :width="400" trigger="click">
                        <template #reference>
                          <el-link type="primary" :underline="false" style="padding: 10px 0 5px 0;">地表水质量标准</el-link>
                        </template>
                        <img src="./image/water.png" alt="Image" style="width:400px; height: auto;display: block;" />
                      </el-popover>
                    </el-col>
                    <el-col :span="8">
                      <el-popover placement="right" :width="400" trigger="click">
                        <template #reference>
                          <el-link type="primary" :underline="false" style="padding: 10px 0 5px 0;">土壤环境量标准</el-link>
                        </template>
                        <img src="./image/soil.png" alt="Image" style="width:400px; height: auto;display: block;" />
                      </el-popover>
                    </el-col>

                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="空气质量">
<!--                          <el-input v-model="form.airQuality"></el-input>-->
                        <el-select v-model="form.airQuality" placeholder="请选择">
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
                        <el-select v-model="form.waterQuality" placeholder="请选择">
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
                        <el-select v-model="form.soilQuality" placeholder="请选择">
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
                            v-model="form.population"
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
                            v-model="form.activity"
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
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="湿度数值">
                    <el-input v-model="form.humidity" placeholder="单位为%"></el-input>
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
                  </el-form-item>
                </el-col>

                <el-col :span="5">
                  <el-form-item label="环境风向">
                    <el-input v-model="form.winddirection"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <div class="baidumap" id="allmap"></div>

          </el-form>
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
import {onMounted,onBeforeMount, ref} from 'vue';
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
import myBMap from "@/util/myBMap";
import { ElNotification } from 'element-plus'


// 当前步骤
const active = ref(0);
const checkboxValue = ref(0)
const drawer = ref(false);

const form = ref({
  name : '',
  type : ['记录环境参数', '现场勘察', '生物危险因子检材'],
  province:'省份',
  city:'城市',
  temperature: '',
  humidity: '',
  winddirection: '',
  windpower: '',
  weather:'',
  airQuality : '',
  waterQuality: '',
  soilQuality: '',
  population:'',
  activity:'',
  date1: '',
  date2:'',
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

const open2 = () => {
  ElNotification({
    title: 'Prompt',
    dangerouslyUseHTMLString: true,
    message: '<strong><img src="./image/IQA.png" alt="Image"></strong>',
  })
}

const showPopup = ref(false);

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

let lat = ref('');
let lon = ref('');

onBeforeMount(() => {
  console.log("组件挂载前");
  getLocation();
});

onMounted(() => {
  console.log("mounted...")

})


function getLocation() {
  console.log("getlocation")
  myBMap.init().then(() => {
    let geolocation = new BMap.Geolocation();
    // 创建百度地理位置实例，代替 navigator.geolocation
    geolocation.getCurrentPosition(function (e) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        // 百度 geolocation 的经纬度属性不同，此处是 point.lat 而不是 coords.latitude
        let point = new BMap.Point(e.point.lng, e.point.lat);
        lat.value = e.point.lat
        console.log(111)
        console.log(lat.value)
        lon.value = e.point.lng
        console.log(222)
        console.log(lon.value)
        initMap1(lon.value,lat.value)
      } else {
        Toast("定位失败");
        this.showloading = false;
      }
    });
  });

}
function initMap1 (lng, lat) {
//1.创建地图实例
  var map = new BMap.Map("allmap");//创建地图实例
  // console.log(lon.value)
  console.log("init map" )
  var point = new BMap.Point(lng, lat); // 创建点坐标

  map.centerAndZoom(point, 12); // 初始化地图，设置中心点坐标和地图级别
  map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

  map.addControl(new BMap.NavigationControl());//添加导航控件
  map.addControl(new BMap.ScaleControl());// 添加比例尺控件
  map.addControl(new BMap.OverviewMapControl());//添加地图缩略图
  map.addControl(new BMap.MapTypeControl());//添加地图类型
  //map.setMapStyle({ style: 'midnight' }) //地图风格

  var marker = new BMap.Marker(point); // 创建标注
  map.addOverlay(marker); // 将标注添加到地图中
  //提示信息
  var infoWindow = new BMap.InfoWindow("这是提示信息");
  // 鼠标移上标注点要发生的事
  marker.addEventListener("mouseover", function () {
    this.openInfoWindow(infoWindow);
  });

  // 鼠标移开标注点要发生的事
  marker.addEventListener("mouseout", function () {
    this.closeInfoWindow(infoWindow);
  });
}
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
  // 调用高德API获取adcode编码
  axios.get('https://restapi.amap.com/v3/ip?key=d0d9f1b6ec05f6ece98d3c2900e73f2e')
      .then(function(response) {
        console.log(response.data);
        // 获取现在的城市的adcode编码
        const adcode = response.data.adcode;
        // 调用百度API通过adcode获取天气信息
        axios.get(`http://localhost:8082/api/weather/${adcode}`)
            .then(response => {
              // 请求成功，将后端返回的数据赋值给 weapons 数组
              console.log(response.data);
              // location位置信息 weather天气信息
              const location = response.data.result.location;
              const weather = response.data.result.now;

              form.value.temperature = weather.temp;//温度
              form.value.humidity = weather.rh;//湿度
              form.value.weather = weather.text;//天气现象
              form.value.winddirection = weather.wind_dir;//风向
              form.value.windpower = weather.wind_class;//风速

              // 显示当前位置
              form.value.province = location.province;//省份
              form.value.city = location.city;//城市

              ElMessage({
                message: '成功获取天气状况',
                type: 'success',
              });
            })
            .catch(error => {
              console.error('获取数据失败：', error);
            });
      // 使用adcode的值来获取天气数据
      // axios.get(`https://restapi.amap.com/v3/weather/weatherInfo?city=${adcode}&key=d0d9f1b6ec05f6ece98d3c2900e73f2e`)
      //   .then(function(weatherResponse) {
      //     console.log(weatherResponse.data); // 处理天气数据
      //     form.value.temperature = weatherResponse.data.lives[0].temperature;//温度
      //     form.value.humidity = weatherResponse.data.lives[0].humidity;//湿度
      //     form.value.weather = weatherResponse.data.lives[0].weather;//天气现象
      //     form.value.winddirection = weatherResponse.data.lives[0].winddirection;//风向
      //     form.value.windpower = weatherResponse.data.lives[0].windpower;//风速
      //
      //     // 显示当前位置
      //     form.value.province = weatherResponse.data.lives[0].province;
      //     form.value.city = weatherResponse.data.lives[0].city;
      //
      //   })
      //   .catch(function(error) {
      //     console.error("Error fetching weather data:", error);
      //   });
      })
}

const isFormValid = () =>{
  // 确保所有选项不为空
  if(selectedItems.value !== []&&
      form.value.date1 !== '' &&
      form.value.date2 !== '' &&
      form.value.airQuality.trim() !== '' &&
      form.value.waterQuality.trim() !== '' &&
      form.value.soilQuality.trim() !== '' &&
      form.value.population !== '' &&
      form.value.activity !== '' &&
      form.value.temperature.trim() !== '' &&
      form.value.humidity.trim() !== '' &&
      form.value.weather.trim() !== '' &&
      form.value.windpower.trim() !== '' &&
      form.value.winddirection.trim() !== ''
      ){
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
  right: 5%;
}
.center-container{
  position: fixed;
  top: 100px;
  width: 89%;
  height: 100%;
}

.card_box{
  height:80%;
  overflow-y:auto;
  overflow-x:hidden;
  margin:0 60px 0 40px;
  padding: 20px;

}

.baidumap {
  width: 70%;
  height: 295px;
  border: 1px solid red;

  left: 15%;
  //left: 0;
  //top: 30%;
  //right: 0;
  //bottom: 0;
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
.baidumap > .BMap_cpyCtrl {
  display: none !important;
}
.BMap_noprint{
  display: block !important;
}
.anchorBL{
  display: none;
}
.BMap_scaleCtrl{
  display: none !important;
}

.image-container {
  position: relative;
  display: inline-block;
}

.image-trigger {
  cursor: pointer;
  border: 1px solid #ccc;
  padding: 10px;
}

.image-popup {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  display: none; /* 默认隐藏 */
}
</style>
