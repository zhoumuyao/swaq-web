<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <div style="padding: 20px; border-bottom:solid 2px ; border-color: darkgray;">
        <label style="font: 20px Extra large;">新建案件</label>
      </div>
      <div class="container">
        <el-card class="card" :body-style="{ height: '95%', padding: '0px' }">
          <div style="margin: 40px;">
            <label class="font" style="font-size:21px">进行案件的建立</label>
          </div>
          <div class="case_form">
            <el-form :model="form" label-width="auto" size="large">
              <el-form-item>
                <label class="font" style="font-size:19px; color: #606266;">案件建立时间:</label>
                <el-date-picker
                  v-model="form.date"
                  type="date"
                  placeholder="选择日期"
                  size="large"
                  format="YYYY/MM/DD"
                  value-format="YYYY-MM-DD"
                  style="margin: 0 30px;"
                />
                <el-time-picker
                  v-model="form.time"
                  placeholder="选择时间"
                  size="large"
                  format="HH:mm:ss"
                  value-format="HH:mm:ss"
                />
              </el-form-item>
              <el-form-item style="margin-top: 30px;">
                <div>
                  <label class="font" style="font-size:19px; color: #606266;">案件建立地点:</label>
                </div>
                <el-button type="primary" style="margin-left: 20%" @click="getPosition">
                  <el-icon>
                    <Location />
                  </el-icon>
                  {{Position}}
                </el-button>
                <div style="margin-top: 20px; width: 100%; padding: 10px; ">
                  <label class="font" style="font-size:16px; color: #606266;">经度:</label>
                  <el-input class="position" placeholder="请输入经度" v-model="form.position.longitude"></el-input>
                  <label class="font" style="font-size:16px; color: #606266;">纬度:</label>
                  <el-input class="position" placeholder="请输入经度" v-model="form.position.latitude"></el-input>
                  <label class="font" style="font-size:16px; color: #606266;">国家:</label>
                  <el-input class="position" placeholder="请输入国家" v-model="form.position.country"></el-input>
                  <label class="font" style="font-size:16px; color: #606266;">省份:</label>
                  <el-input class="position" placeholder="请输入省份" v-model="form.position.province"></el-input>
                  <label class="font" style="font-size:16px; color: #606266;">市区:</label>
                  <el-input class="position" placeholder="请输入市区" v-model="form.position.urban"></el-input>
                </div>
                <div style="margin-top: 20px; width: 100%;padding: 10px; ">
                  <div>
                    <label class="font" style="font-size:16px; color: #606266;">具体位置描述:</label>
                  </div>
                  <el-input
                    style="width: 90%; margin-top: 10px;"
                    type="textarea"
                    :autosize="{ minRows: 8, maxRows: 8 }"
                    placeholder="请输入具体地点描述"
                    v-model="form.position.description"
                  ></el-input>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <el-footer class="footer">
            <div class="btn">
              <el-button type="primary" size="large" @click="createCase">新建案件</el-button>
            </div>
          </el-footer>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { ref, reactive, onMounted } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";
import { post, get } from "@/net";
import { Location } from "@element-plus/icons-vue";
import MapLoader from "@/util/util";

onMounted(() => {
  getCurrentTime();
  getCurrentDate();
});

let Position = ref("获取定位");
const result = ref();

const form = reactive({
  date: "",
  time: "",
  position: {
    longitude: "",
    latitude: "",
    country: "",
    province: "",
    urban: "",
    description: "",
  },
});

const getCurrentTime = () => {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0"); // 小时补零
  const minutes = String(date.getMinutes()).padStart(2, "0"); // 分钟补零
  const seconds = String(date.getSeconds()).padStart(2, "0"); // 秒数补零
  form.time = `${hours}:${minutes}:${seconds}`;
  console.log(form.time);
};

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始，需要加1，并且补零
  const day = String(date.getDate()).padStart(2, "0"); // 补零
  form.date = `${year}-${month}-${day}`;
  console.log(form.date);
};

function getPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // 使用经纬度获取国家信息
        fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        )
          .then((response) => response.json())
          .then((data) => {
            const country = data.countryName;

            console.log("经度：", longitude);
            console.log("纬度：", latitude);
            console.log("国家：", country);
            form.position.longitude = longitude;
            form.position.latitude = latitude;
            if (country == "China") {
              form.position.country = "中国";
            }

            MapLoader()
              .then((formattedAddress) => {
                console.log(formattedAddress);
                Position.value = formattedAddress;
                console.log("定位成功，地址为：", Position.value);

                // 使用split方法按照"省"、"市"进行分割
                let result = Position.value
                  .split(/省|市/)
                  .map((part) => part.trim());
                form.position.province = result[0];
                form.position.urban = result[1];
                form.position.description = result[2];
                console.log(result);
              })
              .catch((error) => {
                console.error("定位失败：", error);
              });
          })
          .catch((error) => {
            console.error("无法获取国家信息：", error);
          });
      },
      (error) => {
        console.error("定位失败：", error);
      }
    );
  } else {
    console.error("浏览器不支持 Geolocation API");
  }
}

const createCase = () => {
  console.log(form);
  post(
    "/api/case/create_case",
    {
      date: form.date,
      time: form.time,
      longitude: form.position.longitude,
      latitude: form.position.latitude,
      country: form.position.country,
      province: form.position.province,
      urban: form.position.urban,
      description: form.position.description,
    },
    (message) => {
      ElMessage.success("新建成功");
      router.push({ path: "/risk", query: { id: message } });
    },
    (message) => {
      console.log(message);
      if (message == -1) {
        ElMessage.warning("请填写所有参数");
      } else {
        ElMessage.warning(message);
      }
    }
  );
};

// function getPosition() {
//   MapLoader()
//     .then((formattedAddress) => {
//       Position.value = formattedAddress;
//       console.log("定位成功，地址为：", Position);

//       // 使用split方法按照"省"、"市"、"区"进行分割
//       let result = Position.value.split(/省|市/).map((part) => part.trim());
//       form.position.province = result[0];
//       form.position.urban = result[1];
//       form.position.description = result[2];
//       console.log(result);
//     })
//     .catch((error) => {
//       console.error("定位失败：", error);
//     });
// }
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

.container {
  height: 80%;
  padding: 3% 6%;
}

.card {
  height: 100%;
}

.font {
  font-family: PingFang SC;
  color: #303133;
}

.case_form {
  height: 80%;
  margin: 0 40px;
  margin-top: 30px;
}

.footer {
  height: 8%;
}

.btn {
  height: 100%;
  margin-left: 90%;
  display: flex;
  align-items: center;
}

.position {
  margin-left: 10px;
  margin-right: 20px;
  width: 12%;
}
</style>