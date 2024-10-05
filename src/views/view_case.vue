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
                <div class="caseContent">
                  <div>风险评估目标：</div>
                  <div>
                    {{ caseData.type }}
                  </div>
                </div>
                <div class="caseContent">
                  <div>风险评估人员：</div>
                  <div>
                    <div
                      v-for="item in caseData.persons"
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
                      v-for="item in caseData.equipments"
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
                      v-for="item in caseData.disposal"
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
import { ElMessage } from "element-plus";
import router from "@/router";

onMounted(() => {
  const output = ref("");

  onMounted(() => {
    const childProcess = spawn("C:/Users/dulixin/Desktop/xj_wargame_engine/雄君推演引擎.exe");

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
    name: "生物危险因子样本采集与运输",
    father: "检验鉴定",
    url: "/identify0",
  },
  {
    id: 9,
    name: "染病个体解剖查验",
    father: "检验鉴定",
    url: "/identify1",
  },
];

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
  type: "",
  persons: [],
  equipments: [],
  disposal: [],
});

const selectCaseMessage = (id) => {
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
          caseData.value.persons = persons.value
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
          caseData.value.equipments = equipments.value
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
          caseData.value.disposal = data;
          console.log(caseData.value.disposal);
        }
      );
      caseData.value = data;
      console.log(data.type);
      switch (data.type) {
        case 1:
          caseData.value.type = "病毒";
          break;
        case 2:
          caseData.value.type = "细菌";
          break;
        case 3:
          caseData.value.type = "毒素";
          break;
        default:
          caseData.value.type = "未知";
      }
    },
    (data) => {
      ElMessage.warning("获得数据失败");
    }
  );
};
const modifyCase = (id) => {
  selectCaseMessage(id);
  caseId.value = id;
  isModifyView.value = true;
};

const viewCase = (id) => {
  selectCaseMessage(id);
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
