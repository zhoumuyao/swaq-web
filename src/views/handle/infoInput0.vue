<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div>
        <!--        现场详细勘察模块-->
        <el-steps :active="active" finish-status="success" align-center style="margin-top: 20px">
          <el-step title="现场信息记录" ></el-step>
          <el-step title="生物危险因子信息" ></el-step>
          <el-step title="现场详细勘察"></el-step>
          <el-step title="现场无害化处理"></el-step>
          <!--          <el-step title="评价与反馈"></el-step>-->
        </el-steps>
      </div>

      <div class="center-container">
        <el-card class="card_box">
          <el-form :model="form" label-width="100px">
            <div class="person_equiment">
              <div>
                <div style="margin-bottom: 10px;">
                  <label class="smalllabel">现场处置人员：</label>
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
                  <label class="smalllabel">处置装备设备：</label>
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
                        <el-button type="primary" size="small" @click="viewGuide(row.guide)">查看</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-card>
              </div>
            </div>
          </el-form>

          <div class="row_box" style="margin-top: 5%">
            <el-row>
              <el-col :span="5" style="margin-left: 10%">
                <el-form-item label="风险等级">
                  <el-input v-model="form.riskLevel" placeholder="一级/二级/三级/无明确风险等级"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5" style="margin-left: 30%">
                <el-form-item label="防护级别">
                  <el-input v-model="form.defendLevel"  placeholder="高/中/低"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>

          <el-dialog v-model="addperson" title="选择现场处置人员" width="600px" draggable>
            <div style="display: flex; align-items: center;">
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
              <el-button
                  type="primary"
                  :icon="Plus"
                  circle
                  @click="addHandlePerson = true;"
                  style="display: inline-block;"
              ></el-button>
            </div>

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
          <el-dialog v-model="addHandlePerson" title="新增现场处置人员" width="600px" draggable>
            <el-form :model="newHandlePeople" style="display: flex; flex-direction: column;">
              <el-form-item label="警务号">
                <el-input v-model="newHandlePeople.newid" style="width:10rem; margin-left: 5px;"></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="newHandlePeople.newname" style="width:10rem; margin-left: 20px"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                  <el-button @click="addHandlePerson = false">取消</el-button>
                  <el-button type="primary" @click="addHandlePeople">确认</el-button>
                </span>
            </template>
          </el-dialog>
          <el-dialog v-model="addequiment" title="选择现场处置设备" width="600px" draggable>
            <div style="display: flex; align-items: center;">
              <el-select v-model="equipment" placeholder="请选择设备种类" style="width: 30%;">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
              </el-select>
              <div
                  style="display: flex; text-align: center;width: 100%;"
                  v-if="equipment != '选项1'"
              >
                <el-input
                    style="width: 30%; margin:0px 20px 0 30%;"
                    v-model="personID"
                    placeholder="请输入设备号"
                ></el-input>
                <el-button type="primary" :icon="Search" @click="handleSearch" circle></el-button>
                <el-button type="primary" :icon="Plus" circle @click="addHandleEquipment = true;"></el-button>
              </div>
              <div style="display: flex;" v-if="equipment == '选项1'">
                <el-select
                    v-model="grade"
                    placeholder="请选择设备种类"
                    style="width: 35%; margin-left: 5%"
                >
                  <el-option
                      v-for="item in gradeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  ></el-option>
                </el-select>
                <el-input
                    style="display: flex; width: 25%; margin:0px 20px 0 5%"
                    v-model="personID"
                    placeholder="请输入设备号"
                ></el-input>
                <el-button type="primary" :icon="Search" @click="handleSearch" circle></el-button>
                <el-button type="primary" :icon="Plus" circle @click="addHandleEquipment = true;"></el-button>
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
          <el-dialog v-model="addHandleEquipment" title="新增现场处置设备" width="600px" draggable>
            <el-form :model="equipmentform" label-width="80px">
              <el-form-item label="设备种类">
                <div style="display: flex; align-items: center;width: 100%;">
                  <el-select
                      v-model="equipmentform.equipment"
                      placeholder="请选择设备种类"
                      style="width: 50%;"
                  >
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                  </el-select>
                  <div style="display: flex;" v-if="equipmentform.equipment == '选项1'">
                    <el-select
                        v-model="equipmentform.grade"
                        placeholder="请选择设备种类"
                        style="width: 100%; margin-left: 10px"
                    >
                      <el-option
                          v-for="item in gradeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="设备号">
                <el-input v-model="equipmentform.id"></el-input>
              </el-form-item>
              <el-form-item label="设备名">
                <el-input v-model="equipmentform.name"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                  <el-button @click="addHandleEquipment = false">取消</el-button>
                  <el-button type="primary" @click="newEquiment">确认</el-button>
                </span>
            </template>
          </el-dialog>
        </el-card>
      </div>




      <!-- 切换页面-->
      <router-link :to="{path: '/infoInput',query: { id: id }}">
        <el-button class="next-button" type="primary" size="large" @click="createHandlePEList">
          下一步
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import {onMounted, onBeforeMount, ref, reactive} from 'vue';
import {get, post} from "@/net";
import { ElMessage } from "element-plus";
import router from '@/router';
import Sidebar from '@/components/sideBar/SideBar.vue';
import {
  Delete, Plus, Search,
} from '@element-plus/icons-vue'
import { InfoFilled } from '@element-plus/icons-vue'
import recordingAndProtection from './PDF/recordingAndProtection.pdf';
import axios from "axios";
import myBMap from "@/util/myBMap";
import { ElNotification } from 'element-plus'
import {useRoute} from "vue-router";


onBeforeMount(() => {

  console.log("...........onBeforeMount")
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
  console.log("元数据初始化")
  post(
      "/api/invest/select_HandlePerson",
      {
        id: id,
      },
      (data) => {
        console.log("6666666")
        console.log(data)
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
      "/api/invest/select_HandleEquipment",
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
  console.log("该案件的数据")
});
const personIdList = ref([]);

const EquipmentIdList = ref([]);

const persons = ref([]);
const personID = ref();
const addperson = ref(false);
const addequiment = ref(false);
const addHandlePerson = ref(false);
const addHandleEquipment = ref(false);
// 当前步骤
const active = ref(0);

const route = useRoute();
const id = route.query.id;
const selectedGather = ref([]);
const selectedPopulation = ref([]);

const form = reactive({
  riskLevel:"一级",
  defendLevel:"高",
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
  type: [],
  person: [],
  equipment: [],
  objectDescription: "",
});
const equipments = ref([]);
const newHandlePeople = reactive({
  newid: "",
  newname: "",
});

const equipment = ref("");
const type1 = ref(0);
const type2 = ref(0);
const type3 = ref(0);
const type4 = ref(0);
const type5 = ref(0);
const type6 = ref(0);
const equipmentform = reactive({
  equipment: "",
  grade: "",
  id: "",
  name: "",
});
let lat = ref('');
let lon = ref('');
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

const tableData1 = ref([
  {
    id: 1,
    virue: "无明确生物风险",
  },
  {
    id: 2,
    virue: "三级生物风险",
  },
  {
    id: 3,
    virue: "二级生物风险",
  },
  {
    id: 4,
    virue: "一级生物风险",
  },
]);
const tableData2 = ref([
  {
    id: 1,
    place: "低",
    checked: true,
  },
  {
    id: 2,
    place: "中",
    checked: false,
  },
  {
    id: 3,
    place: "高",
    checked: false,
  },
]);


const newEquiment = () => {
  addHandleEquipment.value = false;
  console.log(equipmentform);
  if (equipmentform.grade == "选项1") {
    type1.value = 1;
  }
  if (equipmentform.grade == "选项2") {
    type2.value = 1;
  }
  if (equipmentform.grade == "选项3") {
    type3.value = 1;
  }
  if (equipmentform.equipment == "选项2") {
    type4.value = 1;
  }
  if (equipmentform.equipment == "选项3") {
    type5.value = 1;
  }
  if (equipmentform.equipment == "选项4") {
    type6.value = 1;
  }
  console.log(typeof type1.value);
  console.log(newequimentkind);
  post(
      "/api/risk/add_newEquipment",
      {
        id: equipmentform.id,
        name: equipmentform.name,
        type1: type1.value,
        type2: type2.value,
        type3: type3.value,
        type4: type4.value,
        type5: type5.value,
        type6: type6.value,
      },
      (data) => {
        ElMessage.warning(data);
        post("/api/risk/select_equipment", {}, (data) => {
          equipments.value = data;
          equipments.value.forEach(function (item) {
            item.checked = false;
          });
        });
      }
  );
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
const addHandlePeople = () => {
  addHandlePerson.value = false;
  console.log(newHandlePeople.newid);
  console.log(newHandlePeople.newname);
  post(
      "/api/risk/add_newriskPerson",
      {
        id: newHandlePeople.newid,
        name: newHandlePeople.newname,
      },
      (data) => {
        ElMessage.warning(data);
        post("/api/risk/select_person", {}, (data) => {
          persons.value = data;
          persons.value.forEach(function (item) {
            item.checked = false;
          });
        });
      }
  );
};

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

const createHandlePEList = () => {
  console.log(666)
  post(
      "/api/invest/delete_HandlePerson",
      {
        id: id,
      },
      (data) => {
        post(
            "/api/invest/add_HandlePerson",
            {
              id: id,
              persons: personIdList.value,
            }
        );
      },
      (data) => {
        ElMessage.warning(data);
      }
  )


      post(
      "/api/invest/delete_HandleEquipment",
      {
        id: id,
      },
      (data) => {
        post(
            "/api/invest/add_HandleEquipment",
            {
              id: id,
              equipments: EquipmentIdList.value,
            }
        );
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
.baidumap > .BMap_cpyCtrl {
  display: none !important;
}

.person_equiment {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}
</style>
