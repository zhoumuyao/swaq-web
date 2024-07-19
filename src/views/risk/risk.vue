<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div style="padding: 20px; border-bottom:solid 2px ; border-color: darkgray;">
        <label style="font: 20px Extra large;">风险评估模块</label>
      </div>
      <div class="steps">
        <el-steps :active="0" finish-status="success" style="width: 50%; margin-left: 25%;">
          <el-step title="计划和准备"></el-step>
          <el-step title="风险识别"></el-step>
          <el-step title="风险评价"></el-step>
        </el-steps>
      </div>
      <div class="prepare-container">
        <el-card class="prepare-form">
          <div style="width: 100%;">
            <label class="label">设立初步的评估方案:</label>
            <div style="margin-top: 10px; width: 100%;">
              <el-form :model="form" :inline="true" style="width: 100%;">
                <el-form-item label="风险评估时间：">
                  <el-date-picker
                    v-model="form.date"
                    type="date"
                    placeholder="选择日期"
                    format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD"
                    style="margin: 0 30px;"
                  />
                  <el-time-picker
                    v-model="form.time"
                    placeholder="选择时间"
                    format="HH:mm:ss"
                    value-format="HH:mm:ss"
                  />
                </el-form-item>
                <div style="width: 100%;">
                  <el-form-item label="风险评估地点：">
                    <div style=" width: 90%;">
                      <label class="font" style="font-size:14px; color: #606266;">经度:</label>
                      <el-input
                        class="position"
                        placeholder="请输入经度"
                        v-model="form.position.longitude"
                      ></el-input>
                      <label class="font" style="font-size:14px; color: #606266;">纬度:</label>
                      <el-input
                        class="position"
                        placeholder="请输入经度"
                        v-model="form.position.latitude"
                      ></el-input>
                      <label class="font" style="font-size:14px; color: #606266;">国家:</label>
                      <el-input
                        class="position"
                        placeholder="请输入国家"
                        v-model="form.position.country"
                      ></el-input>
                      <label class="font" style="font-size:14px; color: #606266;">省份:</label>
                      <el-input
                        class="position"
                        placeholder="请输入省份"
                        v-model="form.position.province"
                      ></el-input>
                      <label class="font" style="font-size:14px; color: #606266;">市区:</label>
                      <el-input class="position" placeholder="请输入市区" v-model="form.position.urban"></el-input>
                      <div style="display: block;margin-top: 0.5em;">
                        <label class="font" style="font-size:14px; color: #606266;">具体描述:</label>
                        <el-input
                          class="position"
                          placeholder="具体描述"
                          v-model="form.position.description"
                          style="width: 70%; margin-right: 0;"
                        ></el-input>
                      </div>
                    </div>
                  </el-form-item>
                </div>
                <div style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 20px;">
                  <el-form-item label="风险评估目标：" prop="type">
                    <el-radio-group v-model="form.type">
                      <el-radio :label="1">病毒</el-radio>
                      <el-radio :label="2">细菌</el-radio>
                      <el-radio :label="3">毒素</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
                <div class="person_equiment">
                  <div>
                    <div style="margin-bottom: 10px;">
                      <label class="smalllabel">风险评估人员：</label>
                      <el-button type="primary" :icon="Plus" circle @click="addperson = true;"></el-button>
                    </div>
                    <el-card class="card">
                      <el-table :data="form.person" style="width: 100%; height: 45vh">
                        <el-table-column prop="id" label="警务号" width />
                        <el-table-column prop="name" label="姓名" width />
                      </el-table>
                    </el-card>
                  </div>
                  <div>
                    <div style="margin-bottom: 10px;">
                      <label class="smalllabel">评估装备设备：</label>
                      <el-button
                        el-button
                        type="primary"
                        :icon="Plus"
                        circle
                        @click="addequiment = true"
                      ></el-button>
                    </div>
                    <el-card class="card">
                      <el-table :data="form.equipment" style="width: 100%; height: 45vh">
                        <el-table-column prop="id" label="设备号" width />
                        <el-table-column prop="name" label="设备名" width />
                        <el-table-column prop="guide" label="使用说明" width="120">
                          <template #default="{ row }">
                            <el-button
                              v-show="row.showButton"
                              type="primary"
                              size="small"
                              @click="viewGuide(row.guide)"
                            >查看</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-card>
                  </div>
                </div>
              </el-form>
            </div>
            <div class="next-button">
              <!--   btn    -->

              <el-button
                type="primary"
                style="margin-left: 10%; width:"
                @click="jumpAnalysis"
                size="large"
              >进行风险分析</el-button>
            </div>
            <el-dialog v-model="addperson" title="选择风险评估人员" width="600px" draggable>
              <el-input
                style="display: inline-block; width: 30%; margin:0 10px 0 60%;"
                v-model="personID"
                placeholder="请输入警务号"
              ></el-input>
              <el-button
                type="primary"
                :icon="Search"
                @click="handleSearch"
                style="display: inline-block;"
                circle
              ></el-button>
              <div>
                <el-table :data="persons" style="width: 100%" type="selection">
                  <el-table-column prop="id" label="警务号" width="180" fixed="left"></el-table-column>
                  <el-table-column prop="name" label="姓名" width="180" fixed="left"></el-table-column>
                  <el-table-column label="是否选中" width="180" fixed="right" prop="checked">
                    <template #default="{ row }">
                      <el-checkbox v-model="row.checked"></el-checkbox>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="addperson = false">取消</el-button>
                  <el-button type="primary" @click="addPerson">确认</el-button>
                </span>
              </template>
            </el-dialog>
            <el-dialog v-model="addequiment" title="选择风险评估设备" width="600px" draggable>
              <div>
                <el-select v-model="equipment" placeholder="请选择设备种类" style="width: 30%;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <div style="display: inline;" v-if="equipment != '选项1'">
                  <el-input
                    style="display: inline-block; width: 30%; margin:0px 10px 0 30%;"
                    v-model="personID"
                    placeholder="请输入设备号"
                  ></el-input>
                  <el-button type="primary" :icon="Search" @click="handleSearch" circle></el-button>
                </div>
                <div style="display: inline;" v-if="equipment == '选项1'">
                  <el-select
                    v-model="grade"
                    placeholder="请选择设备种类"
                    style="width: 25%; margin-left: 5%"
                  >
                    <el-option
                      v-for="item in gradeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-input
                    style="display: inline-block; width: 25%; margin:0px 10px 0 5%"
                    v-model="personID"
                    placeholder="请输入设备号"
                  ></el-input>
                  <el-button type="primary" :icon="Search" @click="handleSearch" circle></el-button>
                </div>
              </div>
              <div>
                <el-table
                  v-if="equipment == '选项1' || equipment == '选项2' || equipment == '选项3' || equipment == '选项4' || equipment == ''"
                  :data="getRiskEquipmentData()"
                  style="width: 100%; margin-top: 10px; "
                  type="selection"
                  height="40vh"
                >
                  <el-table-column prop="id" label="设备号" width="180" fixed="left"></el-table-column>
                  <el-table-column prop="name" label="设备名" width="180" fixed="left"></el-table-column>
                  <el-table-column label="是否选中" width="180" fixed="right" prop="checked">
                    <template #default="{ row }">
                      <el-checkbox v-model="row.checked"></el-checkbox>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="addequiment = false">取消</el-button>
                  <el-button type="primary" @click="addEquiment">确认</el-button>
                </span>
              </template>
            </el-dialog>
            <el-dialog title="预览文件" v-model="isViewPdf20" :before-close="handleClose" width="80vw">
              <iframe :src="PDFsrc" frameborder="0" style="width: 75vw; height: 70vh"></iframe>
            </el-dialog>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { get, post } from "@/net";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import Sidebar from "../../components/sideBar/SideBar.vue";
import router from "@/router";
import { ref, reactive, onBeforeMount } from "vue";
import { Search, Plus } from "@element-plus/icons-vue";
import airCondition from "./device_guide/air_condition.pdf";
import a from "./device_guide/1.pdf";
import b from "./device_guide/2.pdf";
import c from "./device_guide/3.pdf";
import d from "./device_guide/4.pdf";
import e from "./device_guide/5.pdf";
import f from "./device_guide/6.pdf";
import g from "./device_guide/7.pdf";
import h from "./device_guide/8.pdf";
import i from "./device_guide/9.pdf";
import j from "./device_guide/10.pdf";
import k from "./device_guide/11.pdf";
import l from "./device_guide/12.pdf";
import m from "./device_guide/13.pdf";
import n from "./device_guide/14.pdf";
import o from "./device_guide/15.pdf";
import p from "./device_guide/16.pdf";
import q from "./device_guide/17.pdf";
import r from "./device_guide/18.pdf";
import s from "./device_guide/19.pdf";
import t from "./device_guide/20.pdf";
import u from "./device_guide/21.pdf";
import v from "./device_guide/22.pdf";
import w from "./device_guide/23.pdf";
import x from "./device_guide/24.pdf";
import y from "./device_guide/25.pdf";
import z from "./device_guide/26.pdf";

onBeforeMount(() => {
  post("/api/risk/select_person", {}, (data) => {
    persons.value = data;
    persons.value.forEach(function (item) {
      item.checked = false;
    });
  });

  post("/api/risk/select_equipment", {}, (data) => {
    equipments.value = data;
    equipments.value.forEach(function (item) {
      item.checked = false;
    });
  });

  post("/api/case/search_case", { id: id }, (data) => {
    form.date = data.date;
    form.time = data.time;
    form.position.longitude = String(data.longitude);
    form.position.latitude = String(data.latitude);
    form.position.country = data.country;
    form.position.province = data.province;
    form.position.urban = data.urban;
    form.position.description = data.description;
  });

  if (id && back) {
    post(
      "/api/risk/select_riskPlan",
      {
        id: id,
      },
      (data) => {
        form.date = data.date;
        form.time = data.time;
        form.position.longitude = String(data.longitude);
        form.position.latitude = String(data.latitude);
        form.position.country = data.country;
        form.position.province = data.province;
        form.position.urban = data.urban;
        form.position.description = data.description;
        form.type = data.type;
      }
    );

    post(
      "/api/risk/select_RiskPerson",
      {
        id: id,
      },
      (data) => {
        personIdList.value = data;
        form.person = persons.value.filter((person) =>
          personIdList.value.includes(person.id)
        );
        persons.value.forEach((item) => {
          if (personIdList.value.includes(item.id)) {
            item.checked = true;
          }
        });
      }
    );

    post(
      "/api/risk/select_RiskEquipment",
      {
        id: id,
      },
      (data) => {
        EquipmentIdList.value = data;
        form.equipment = equipments.value.filter((equipment) =>
          EquipmentIdList.value.includes(equipment.id)
        );
        form.equipment.forEach((item) => {
          item.showButton = true;
        });
        equipments.value.forEach((item) => {
          if (EquipmentIdList.value.includes(item.id)) {
            item.checked = true;
          }
        });
      }
    );
  }
});

const personIdList = ref([]);
const EquipmentIdList = ref([]);

const persons = ref([]);
const equipments = ref([]);

const route = useRoute();
const id = route.query.id;
const back = route.query.back;

const gradeOptions = ref([
  {
    value: "选项1",
    label: "特殊防护",
  },
  {
    value: "选项2",
    label: "一般防护",
  },
  {
    value: "选项3",
    label: "基础防护",
  },
]);

const grade = ref("");

const options = ref([
  {
    value: "选项1",
    label: "防护装备",
  },
  {
    value: "选项2",
    label: "交通装备",
  },
  {
    value: "选项3",
    label: "取样装备",
  },
  {
    value: "选项4",
    label: "记录装备",
  },
]);

const equipment = ref("");
const PDFsrc = ref("");
const isViewPdf20 = ref(false);
const addperson = ref(false);
const addequiment = ref(false);
const personID = ref();

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
  type: 1,
  person: [],
  equipment: [],
});

const getRiskEquipmentData = () => {
  switch (equipment.value) {
    case "选项1":
      switch (grade.value) {
        case "选项1":
          return equipments.value.filter((equipment) => equipment.type1 === 1);
        case "选项2":
          return equipments.value.filter((equipment) => equipment.type2 === 1);
        case "选项3":
          return equipments.value.filter((equipment) => equipment.type3 === 1);
        default:
          return [];
      }
    case "选项2":
      return equipments.value.filter((equipment) => equipment.type4 === 1);
    case "选项3":
      return equipments.value.filter((equipment) => equipment.type5 === 1);
    case "选项4":
      return equipments.value.filter((equipment) => equipment.type6 === 1);
    default:
      return [];
  }
};

const createRiskPEList = () => {
  post(
    "/api/risk/delete_riskPerson",
    {
      id: id,
    },
    (data) => {
      post(
        "/api/risk/add_riskPerson",
        {
          id: id,
          persons: personIdList.value,
        },
        (data) => {
          router.push({ path: "/risk_identification", query: { id: id } });
        },
        (data) => {
          ElMessage.warning(data);
        }
      );
    },
    (data) => {
      ElMessage.warning(data);
    }
  );
  post(
    "/api/risk/delete_riskEquipment",
    {
      id: id,
    },
    (data) => {
      post(
        "/api/risk/add_riskEquipment",
        {
          id: id,
          equipments: EquipmentIdList.value,
        },
        (data) => {
          router.push({ path: "/risk_identification", query: { id: id } });
        },
        (data) => {
          ElMessage.warning(data);
        }
      );
    },
    (data) => {
      ElMessage.warning(data);
    }
  );
};

const jumpAnalysis = () => {
  if (back != 1) {
    post(
      "/api/risk/create_plan",
      {
        id: id,
        date: form.date,
        time: form.time,
        longitude: form.position.longitude,
        latitude: form.position.latitude,
        country: form.position.country,
        province: form.position.province,
        urban: form.position.urban,
        description: form.position.description,
        type: form.type,
        isUpdate: false,
      },
      (data) => {
        createRiskPEList();
      },
      (data) => {
        ElMessage.warning(data);
      }
    );
  } else {
    post(
      "/api/risk/create_plan",
      {
        id: id,
        date: form.date,
        time: form.time,
        longitude: form.position.longitude,
        latitude: form.position.latitude,
        country: form.position.country,
        province: form.position.province,
        urban: form.position.urban,
        description: form.position.description,
        type: form.type,
        isUpdate: true,
      },
      (data) => {
        createRiskPEList();
      },
      (data) => {
        ElMessage.warning(data);
      }
    );
  }
};

const handleClose = () => {
  PDFsrc.value = "";
  isViewPdf20.value = false;
};
const viewGuide = (guide) => {
  switch (guide) {
    case "1":
      PDFsrc.value = a;
      break;
    case "2":
      PDFsrc.value = b;
      break;
    case "3":
      PDFsrc.value = c;
      break;
    case "4":
      PDFsrc.value = d;
      break;
    case "5":
      PDFsrc.value = e;
      break;
    case "6":
      PDFsrc.value = f;
      break;
    case "7":
      PDFsrc.value = j;
      break;
    case "8":
      PDFsrc.value = h;
      break;
    case "9":
      PDFsrc.value = i;
      break;
    case "10":
      PDFsrc.value = j;
      break;
    case "11":
      PDFsrc.value = k;
      break;
    case "12":
      PDFsrc.value = l;
      break;
    case "13":
      PDFsrc.value = m;
      break;
    case "14":
      PDFsrc.value = n;
      break;
    case "15":
      PDFsrc.value = o;
      break;
    case "16":
      PDFsrc.value = p;
      break;
    case "17":
      PDFsrc.value = q;
      break;
    case "18":
      PDFsrc.value = r;
      break;
    case "19":
      PDFsrc.value = s;
      break;
    case "20":
      PDFsrc.value = t;
      break;
    case "21":
      PDFsrc.value = u;
      break;
    case "22":
      PDFsrc.value = v;
      break;
    case "23":
      PDFsrc.value = w;
      break;
    case "24":
      PDFsrc.value = x;
      break;
    case "25":
      PDFsrc.value = y;
      break;
    case "26":
      PDFsrc.value = z;
      break;
  }
  isViewPdf20.value = true;
};

const addPerson = () => {
  addperson.value = false;
  personIdList.value = [];
  persons.value.forEach((person) => {
    if (person.checked) {
      personIdList.value.push(person.id);
    }
  });
  form.person = persons.value.filter((person) =>
    personIdList.value.includes(person.id)
  );
};

const addEquiment = () => {
  console.log(equipments.value);
  addequiment.value = false;
  EquipmentIdList.value = [];
  equipments.value.forEach((equipment) => {
    if (equipment.checked) {
      EquipmentIdList.value.push(equipment.id);
    }
  });
  form.equipment = equipments.value.filter((equipment) =>
    EquipmentIdList.value.includes(equipment.id)
  );
  form.equipment.forEach((item) => {
    item.showButton = true;
  });
};

const onSubmit = () => {
  console.log("submit!");
};
</script>

<style scoped>
.app {
  display: flex;
}

.content {
  flex: 1;
  margin-left: 200px;
  /* 与侧边栏宽度对应 */
  /* 添加其他样式，如内容区域的填充等 */
}

.description {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin: 0px;
}

#file {
  opacity: 0;
}

.img {
  height: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  border: 1.2px solid;
  border-color: darkgray;
}

.text {
  height: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  border: 1.2px solid;
  border-color: darkgray;
}

.label {
  font: 18px large;
  font-family: "PingFang SC";
  margin: 0 10px 20px 0;
  display: block;
}

.prepare-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 10px;
  /* 上边界距离 */
}

.prepare-card {
  display: flex;
  justify-content: center;
  height: 96vh;
  width: 80vw;
}

.prepare-form {
  height: 80vh;
  width: 80vw;
  position: relative;
}

.steps {
  margin-left: 30px;
  margin-top: 30px;
}

.inputlocal {
  width: 1000px;
}

.table {
  display: block;
  width: 30vw;
}

.person_equiment {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}

.smalllabel {
  font-size: 14px;
  color: rgb(96, 98, 102);
}

.next-button {
  position: absolute;
  bottom: 15px;
  /* 距离底部的间距 */
  right: 20px;
  /* 距离右侧的间距 */
}

.position {
  margin-left: 10px;
  margin-right: 20px;
  width: 10%;
}

.card {
  height: 80%;
}
</style>