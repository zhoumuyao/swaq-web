<template>
  <div class="app">
    <div class="content">
      <div
        style="padding: 20px; border-bottom: solid 2px; border-color: darkgray"
      >
        <label style="font: 20px Extra large">查看案例</label>
      </div>
      <div class="container">
        <el-card class="card" :body-style="{ height: '95%', padding: '10px' }">
          <div style="margin: 30px">
            <label class="font" style="font-size: 21px">进行案件的查看</label>
          </div>
          <div>
            <el-table :data="allCaseData" style="width: 100%">
              <el-table-column
                prop="id"
                label="id"
                width="60"
              ></el-table-column>
              <el-table-column
                prop="date"
                label="日期"
                width="120"
              ></el-table-column>
              <el-table-column
                prop="time"
                label="时间"
                width="120"
              ></el-table-column>
              <el-table-column label="地址">
                <el-table-column
                  prop="longitude"
                  label="经度"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="latitude"
                  label="纬度"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="country"
                  label="国家"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="province"
                  label="省份"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="urban"
                  label="市区"
                  width="100"
                ></el-table-column>
                <el-table-column
                  prop="description"
                  label="详细地址"
                  width="300"
                ></el-table-column>
              </el-table-column>
              <el-table-column prop="view_details" label="查看详情">
                <template #default="{ row }">
                  <el-button
                    type="success"
                    size="small"
                    @click="viewCase(row.id)"
                    >查看</el-button
                  >
                  <el-button
                    type="primary"
                    size="small"
                    @click="modifyCase(row.id)"
                    >修改</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-dialog
            title="预览"
            v-model="isViewCase"
            :before-close="handleClose"
            width="80vw"
            height="80vh"
          >
            <div>
              <el-card>
                <div style="margin-bottom: 20px">
                  <el-radio-group v-model="modulType">
                    <el-radio-button label="案件信息" value="案件信息" />
                    <el-radio-button
                      label="风险评估信息"
                      value="风险评估信息"
                    />
                    <el-radio-button
                      label="现场处置信息"
                      value="现场处置信息"
                    />
                    <el-radio-button
                      label="检验鉴定信息"
                      value="检验鉴定信息"
                    />
                  </el-radio-group>
                </div>
                <div v-if="modulType == '案件信息'">
                  <div class="caseContent">
                    <div>案件时间：</div>
                    <div>{{ caseData.date }} {{ caseData.time }}</div>
                  </div>
                  <div class="caseContent">
                    <div>案件地点：</div>
                    <div>
                      <div style="display: inline-block; margin-right: 30px">
                        经度：{{ caseData.longitude }}
                      </div>
                      <div style="display: inline-block; margin-right: 30px">
                        纬度：{{ caseData.latitude }}
                      </div>
                      <div style="display: inline-block; margin-right: 30px">
                        国家：{{ caseData.country }}
                      </div>
                      <div style="display: inline-block; margin-right: 30px">
                        省份：{{ caseData.province }}
                      </div>
                      <div style="display: inline-block; margin-right: 30px">
                        市区：{{ caseData.urban }}
                      </div>
                      <div style="display: inline-block; margin-right: 30px">
                        具体描述：{{ caseData.description }}
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="modulType == '风险评估信息'">
                  <div class="caseContent">
                    <div>案件时间：</div>
                    <div>{{ riskData.date }} {{ riskData.time }}</div>
                  </div>
                  <div class="caseContent">
                    <div>案件地点：</div>
                    <div>
                      <div style="display: inline-block; margin-right: 30px">
                        经度：{{ riskData.longitude }}
                      </div>
                      <div style="display: inline-block; margin-right: 30px">
                        纬度：{{ riskData.latitude }}
                      </div>
                      <div style="display: inline-block; margin-right: 30px">
                        国家：{{ riskData.country }}
                      </div>
                      <div style="display: inline-block; margin-right: 30px">
                        省份：{{ riskData.province }}
                      </div>
                      <div style="display: inline-block; margin-right: 30px">
                        市区：{{ riskData.urban }}
                      </div>
                      <div style="display: inline-block; margin-right: 30px">
                        具体描述：{{ riskData.description }}
                      </div>
                    </div>
                  </div>
                  <div class="caseContent">
                    <div>风险评估目标：</div>
                    <div>
                      {{ riskData.type }}
                    </div>
                  </div>
                  <div class="caseContent">
                    <div>风险评估人员：</div>
                    <div>
                      <div
                        v-for="item in riskData.persons"
                        :key="item.id"
                        style="display: inline-block; margin-right: 20px"
                      >
                        {{ item.name }}
                      </div>
                    </div>
                  </div>
                  <div class="caseContent">
                    <div style="display: inline-block">评估装备设备：</div>
                    <div>
                      <div
                        v-for="item in riskData.equipments"
                        :key="item.id"
                        style="display: inline-block; margin-right: 20px"
                      >
                        {{ item.name }}
                      </div>
                    </div>
                  </div>
                  <div class="caseContent">
                    <div>处置对象信息：</div>
                    <div>
                      <div
                        v-for="item in riskData.disposal"
                        :key="item.disposalId"
                        style="display: block; margin-bottom: 10px"
                      >
                        <div style="display: inline-block; margin-right: 20px">
                          处置对象类型：{{ item.objectClass }}
                        </div>
                        <div style="display: inline-block; margin-right: 20px">
                          采样种类：{{ item.sampleType }}
                        </div>
                        <div style="display: inline-block; margin-right: 20px">
                          采样内容：{{ item.sampleContent }}
                        </div>
                        <div style="display: inline-block; margin-right: 20px">
                          快检方法：{{ item.testMethod }}
                        </div>
                        <div style="display: inline-block; margin-right: 20px">
                          快检结果：{{ item.result }}
                        </div>
                        <div style="display: inline-block; margin-right: 20px">
                          采样要求：{{ item.sampleRequirement }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="modulType == '现场处置信息'">
                  <div class="caseContent">
                    <div>风险评估人员：</div>
                    <div>
                      <div
                        v-for="item in handleData.persons"
                        :key="item.id"
                        style="display: inline-block; margin-right: 20px"
                      >
                        {{ item.name }}
                      </div>
                    </div>
                  </div>
                  <div class="caseContent">
                    <div style="display: inline-block">评估装备设备：</div>
                    <div>
                      <div
                        v-for="item in handleData.equipments"
                        :key="item.id"
                        style="display: inline-block; margin-right: 20px"
                      >
                        {{ item.name }}
                      </div>
                    </div>
                  </div>
                  <div class="caseContent">
                    <div>风险等级：</div>
                    <div>{{ handleData.riskLevel }}</div>
                  </div>
                  <div class="caseContent">
                    <div>防护级别：</div>
                    <div>{{ handleData.defendLevel }}</div>
                  </div>
                  <div class="caseContent">
                    <div>现场处置时间：</div>
                    <div>{{ handleData.date1 }} {{ handleData.date2 }}</div>
                  </div>
                  <div class="caseContent">
                    <div>勘察工作:</div>
                    <div>{{ handleData.type.join("") }}</div>
                  </div>
                  <div class="caseContent">
                    <div>环境参数：</div>
                    <div>
                      <div style="display: inline-block; margin-right: 30px">
                        空气质量：{{ handleData.airQuality }}
                      </div>

                      <div style="display: inline-block; margin-right: 30px">
                        水质状况：{{ handleData.waterQuality }}
                      </div>

                      <div style="display: inline-block; margin-right: 30px">
                        土壤状况：{{ handleData.soilQuality }}
                      </div>
                    </div>
                  </div>
                  <div class="caseContent">
                    <div>人群情况</div>
                    <div>
                      <div style="display: inline-block; margin-right: 30px">
                        人口密度：{{ handleData.selectedPopulation }}
                      </div>
                      <div style="display: inline-block; margin-right: 30px">
                        人员活动：{{ handleData.selectedLabels.join("；") }}
                      </div>
                    </div>
                  </div>
                  <div class="caseContent">
                    <div>天气情况</div>
                    <div>
                      <div style="display: inline-block; margin-right: 30px">
                        温度数值：{{ handleData.temperature }}
                      </div>
                      <div style="display: inline-block; margin-right: 30px">
                        湿度数值：{{ handleData.humidity }}
                      </div>
                      <div style="display: inline-block; margin-right: 30px">
                        天气现象：{{ handleData.weather }}
                      </div>
                      <div style="display: inline-block; margin-right: 30px">
                        风速数值：{{ handleData.windpower }}
                      </div>
                      <div style="display: inline-block; margin-right: 30px">
                        环境风向：{{ handleData.winddirection }}
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="modulType == '检验鉴定信息'">
                  <div class="caseContent">
                    <div>风险评估人员：</div>
                    <div>
                      <div
                        v-for="item in identifyData.persons"
                        :key="item.id"
                        style="display: inline-block; margin-right: 20px"
                      >
                        {{ item.name }}
                      </div>
                    </div>
                  </div>
                  <div class="caseContent">
                    <div style="display: inline-block">评估装备设备：</div>
                    <div>
                      <div
                        v-for="item in identifyData.equipments"
                        :key="item.id"
                        style="display: inline-block; margin-right: 20px"
                      >
                        {{ item.name }}
                      </div>
                    </div>
                  </div>
                  <div class="caseContent">
                    <div>检测方法：</div>
                    <div>{{ identifyData.method }}</div>
                  </div>
                  <div class="caseContent">
                    <div>检测结果：</div>
                    <div>{{ identifyData.result }}</div>
                  </div>
                </div>
              </el-card>
            </div>
          </el-dialog>
          <el-dialog
            title="修改"
            v-model="isModifyView"
            :before-close="handleClose"
            width="60vw"
          >
            <div>
              <el-table :data="module" style="width: 100%">
                <el-table-column prop="name" label="版块名" width="400" />
                <el-table-column prop="father" label="所属模块名" width="400" />
                <el-table-column prop="address" label="操作">
                  <template #default="{ row }">
                    <el-button
                      type="primary"
                      size="small"
                      @click="jumpModify(row.url, caseId)"
                      >进入修改</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div style="text-align: center; margin-top: 20px">
              <el-button size="default" type="primary" style="font-size: 14px"
                >保存</el-button
              >
            </div>
          </el-dialog>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount, onMounted } from "vue";
import { get, post } from "@/net";
import axios from "axios";
import { ElMessage } from "element-plus";
import router from "@/router";

onMounted(() => {
  const output = ref("");

  onMounted(() => {
    const childProcess = spawn(
      "C:/Users/dulixin/Desktop/xj_wargame_engine/雄君推演引擎.exe"
    );

    // 监听 stdout 输出
    childProcess.stdout.on("data", (data) => {
      output.value += data.toString();
    });

    // 监听 stderr 输出
    childProcess.stderr.on("data", (error) => {
      console.error(`Error: ${error.toString()}`);
    });

    // 监听 exit 事件
    childProcess.on("exit", (code) => {
      console.log(`Process completed with exit code: ${code}`);
    });
  });
});

onBeforeMount(() => {
  post("/api/case/view_case", {}, (data) => {
    allCaseData.value = data;
    allCaseData.value.forEach(function (item) {
      item.view_details = "src/views/cases_details.pdf";
    });
  });
  post("/api/risk/select_person", {}, (data) => {
    persons.value = data;
  });
  post("/api/risk/select_equipment", {}, (data) => {
    equipments.value = data;
  });
});

const module = [
  {
    id: 1,
    name: "计划与准备",
    father: "风险评估",
    url: "/risk",
  },
  {
    id: 2,
    name: "风险识别",
    father: "风险评估",
    url: "/risk_identification",
  },
  {
    id: 3,
    name: "风险评价",
    father: "风险评估",
    url: "/risk_assessment",
  },
  {
    id: 4,
    name: "现场信息记录",
    father: "现场处置",
    url: "/infoInput0",
  },
  {
    id: 5,
    name: "生物危险因子信息",
    father: "现场处置",
    url: "/dangerInfo",
  },
  {
    id: 6,
    name: "现场详细勘察",
    father: "现场处置",
    url: "/invest",
  },
  {
    id: 8,
    name: "现场无害化处理",
    father: "现场处置",
    url: "/doHandle",
  },
  {
    id: 7,
    name: "生物危险因子检测",
    father: "检验鉴定",
    url: "/identify0",
  },
  {
    id: 9,
    name: "染病个体解剖查验",
    father: "检验鉴定",
    url: "/judge",
  },
  {
    id: 10,
    name: "检验鉴定报告",
    father: "检验鉴定",
    url: "/identify2",
  },
];

// 定义活动数据
const activity = ref([
  {
    value: "1",
    label: "聚集区密度",
    children: [
      { value: "11", label: "≤0.5人/㎡" },
      { value: "12", label: "0.5-1人/㎡" },
      { value: "13", label: "1-2人/㎡" },
      { value: "14", label: ">2人/㎡" },
    ],
  },
  {
    value: "2",
    label: "交通情况",
    children: [
      { value: "21", label: "通畅" },
      { value: "22", label: "较通畅" },
      { value: "23", label: "不通畅" },
      { value: "24", label: "拥堵" },
    ],
  },
]);
const modulType = ref("案件信息");

const caseId = ref(-1);

const isViewCase = ref(false);

const isModifyView = ref(false);

const persons = ref([]);
const personIdList = ref([]);

const equipments = ref([]);
const EquipmentIdList = ref([]);

const allCaseData = ref([]);

const caseData = ref({
  date: "",
  time: "",
  longitude: "",
  latitude: "",
  country: "",
  province: "",
  urban: "",
  description: "",
});

const riskData = ref({
  date: "",
  time: "",
  longitude: "",
  latitude: "",
  country: "",
  province: "",
  urban: "",
  description: "",
  type: "",
  persons: [],
  equipments: [],
  disposal: [],
});

const handleData = ref({
  equipments: [],
  disposal: [],
  defendLevel: "",
  riskLevel: "",
  name: "",
  type: ["记录环境参数", "现场勘察", "生物危险因子检材"],
  province: "省份",
  city: "城市",
  temperature: "",
  humidity: "",
  winddirection: "",
  windpower: "",
  weather: "",
  airQuality: "",
  waterQuality: "",
  soilQuality: "",
  selectedPopulation: "",
  population: "",
  activity: "",
  date1: "",
  date2: "",
  selectedLabels: [],
});

const identifyData = ref({
  method: "",
  description: "",
  result: "",
  persons: [],
  equipments: [],
});

const handleClose = () => {
  modulType.value = "案件信息";
  isViewCase.value = false;
  isModifyView.value = false;
};

const selectCaseMessage = (id) => {
  post(
    "/api/case/search_case",
    {
      id: id,
    },
    (data) => {
      caseData.value = data;
    }
  );
};

const selectRiskMessage = (id) => {
  post(
    "/api/risk/select_riskPlan",
    {
      id: id,
    },
    (data) => {
      post(
        "/api/risk/select_RiskPerson",
        {
          id: id,
        },
        (data) => {
          personIdList.value = data;
          riskData.value.persons = persons.value
            .filter((person) => personIdList.value.includes(person.id))
            .map((item) => ({ id: item.id, name: item.name }));
        }
      );
      post(
        "/api/risk/select_RiskEquipment",
        {
          id: id,
        },
        (data) => {
          EquipmentIdList.value = data;
          riskData.value.equipments = equipments.value
            .filter((equipment) => EquipmentIdList.value.includes(equipment.id))
            .map((item) => ({ id: item.id, name: item.name }));
        }
      );
      post(
        "/api/disposal/search_disposal",
        {
          id: id,
        },
        (data) => {
          riskData.value.disposal = data;
          console.log(riskData.value.disposal);
        }
      );
      riskData.value = data;
      console.log(data.type);
      const typeMap = { 1: "病毒", 2: "细菌", 3: "毒素" };
      const sortedKeys = (data.type || "").split(",").sort();
      const isValid = sortedKeys.every((k) => typeMap[k]);
      riskData.value.type = isValid
        ? sortedKeys.map((k) => typeMap[k]).join(", ")
        : "未知";
      console.log(riskData.value.type);
    },
    (data) => {
      ElMessage.warning("未获取到风险评估信息");
    }
  );
};

const selectHandleMessage = async (id) => {
  post(
    "/api/invest/select_HandlePerson",
    {
      id: id,
    },
    (data) => {
      personIdList.value = data;
      handleData.value.persons = persons.value
        .filter((person) => personIdList.value.includes(person.id))
        .map((item) => ({ id: item.id, name: item.name }));
    }
  );

  post(
    "/api/invest/select_HandleEquipment",
    {
      id: id,
    },
    (data) => {
      EquipmentIdList.value = data;
      handleData.value.equipments = equipments.value
        .filter((equipment) => EquipmentIdList.value.includes(equipment.id))
        .map((item) => ({ id: item.id, name: item.name }));
    }
  );
  post(
    "/api/biologyInfo/find_dangername",
    {
      id: id,
    },
    (res) => {
      post(
        "/api/biologyInfo/searchInfo",
        {
          dangerName: res,
        },
        (data) => {
          handleData.value.riskLevel = data.infectious;
          console.log(handleData.value);
          if (handleData.value.riskLevel == "一级") {
            handleData.value.defendLevel = "高";
          } else if (handleData.value.riskLevel == "二级") {
            handleData.value.defendLevel = "中";
          } else {
            handleData.value.defendLevel = "低";
          }
        }
      );
    }
  );
  const response = await fetch(
    axios.defaults.baseURL + "/api/invest/queryInvest?id=" + id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  // 检查响应是否成功
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  // 解析响应数据
  const data = await response.json();

  // 打印数据并赋值给表单
  console.log("Response data:", data.message);

  // 将后端返回的数据赋值给前端的表单值
  handleData.value.airQuality = data.message.airQuality;
  handleData.value.date1 = data.message.date;
  handleData.value.date2 = data.message.time;
  handleData.value.waterQuality = data.message.water;
  handleData.value.soilQuality = data.message.soil;
  handleData.value.population = data.message.personelDensity;
  handleData.value.activity = data.message.gather;

  handleData.value.temperature = data.message.temperature;
  handleData.value.weather = data.message.weather;
  handleData.value.windpower = data.message.windSpeed;
  handleData.value.winddirection = data.message.windDirection;
  handleData.value.humidity = data.message.humi;

  handleData.value.selectedPopulation = data.message.personelDensity;
  // 解析 JSON 字符串
  const parsedGather = JSON.parse(data.message.gather);
  console.log(parsedGather);
  // 提取每个选中的值
  parsedGather.forEach(([parentValue, childValue]) => {
    // 找到对应的父级
    const parent = activity.value.find((item) => item.value === parentValue);
    if (parent) {
      // 找到对应的子级
      const child = parent.children.find((item) => item.value === childValue);
      if (child) {
        // 将子级的标签添加到结果数组中
        handleData.value.selectedLabels.push(child.label);
      }
    }
  });
};

const selectIdentifyMessage = (id) => {
  post(
    "/api/identify/select_Identify",
    {
      id: id,
    },
    (data) => {
      identifyData.value.method = data.method;
      identifyData.value.result = data.result;
      // post(
      //   "/api/risk/select_RiskPerson",
      //   {
      //     id: id,
      //   },
      //   (data) => {
      //     personIdList.value = data;
      //     identifyData.value.persons = persons.value
      //       .filter((person) => identifyData.value.includes(person.id))
      //       .map((item) => ({ id: item.id, name: item.name }));
      //   }
      // );
      // post(
      //   "/api/risk/select_RiskEquipment",
      //   {
      //     id: id,
      //   },
      //   (data) => {
      //     EquipmentIdList.value = data;
      //     identifyData.value.equipments = equipments.value
      //       .filter((equipment) => identifyData.value.includes(equipment.id))
      //       .map((item) => ({ id: item.id, name: item.name }));
      //   }
      // );
    }
  );
};

const modifyCase = (id) => {
  caseId.value = id;
  isModifyView.value = true;
};

const viewCase = (id) => {
  selectCaseMessage(id);
  selectRiskMessage(id);
  selectHandleMessage(id);
  selectIdentifyMessage(id);
  isViewCase.value = true;
};

const jumpModify = (url, id) => {
  router.push({ path: url, query: { id: id, back: 1 } });
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

.container {
  height: 80%;
  padding: 3% 6%;
}

.caseContent {
  display: grid;
  grid-template-columns: 1fr 8fr;
  margin: 10px;
  font-size: 16px;
}

.font {
  font-family: PingFang SC;
  color: #303133;
  font-size: 15px;
}
</style>
