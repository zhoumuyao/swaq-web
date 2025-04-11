<template>
  <div class="app">
    <div class="content">
      <router-view></router-view>
      <div>
        <!-- 检验鉴定模块-->
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          :router="true"
        >
          <el-menu-item index="/identify0">生物危险因子检测</el-menu-item>
          <el-menu-item index="/identify1">染病个体解剖查验</el-menu-item>
          <el-menu-item index="/identify2">检验鉴定报告</el-menu-item>
        </el-menu>
        <el-tabs
          v-model="activeName"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane label="具备条件" name="first">
            <!-- 具备条件步骤条 -->
            <div>
              <el-steps
                :active="active1"
                finish-status="success"
                align-center
                style="margin-top: 20px"
              >
                <el-step title="解剖员与解剖条件"></el-step>
                <el-step title="规章\规范与应急预案"></el-step>
              </el-steps>
            </div>
            <div style="
                display: flex;
                justify-content: center;
                align-items: flex-start;
                margin-top: 2vh;
              ">
              <el-card class="card_container">
                <!-- 解剖员基本要求 -->
                <div v-if="active1 === 0" class="center-container">
                  <el-card style="
                      width: 30%;
                      height: 55vh;
                      margin-left: 40px;
                      display: flex;
                    ">
                    <div style="width: 100%;margin:10px;">
                      <label>解剖员：</label>
                      <el-button
                          type="primary"
                          :icon="Plus"
                          circle
                          @click="dialogPerson = true"
                      ></el-button>
                    </div>
                    <el-table
                        :data="prosectors"
                        :key = "tableKey"
                        style="width: 400px; height: 40vh"
                    >
                      <el-table-column prop="id" label="警务号" />
                      <el-table-column prop="name" label="姓名" />
                    </el-table>
                  </el-card>
                  <el-card style="width: 60%; height: 55vh;margin-right: 40px; overflow: auto;">
                    <div style="width: 100%; height: 50vh">
                      <TreeWithContent :dataSource="LabRequirements" />
                    </div>
                  </el-card>
                </div>
                <!-- 实验室 -->
                <div v-if="active1 === 1" class="center-container">
                  <el-card style="width: 47%; height: 55vh;margin-right: 40px; overflow: auto;">
                    <div style="width: 100%; height: 50vh">
                      <TreeWithContent :dataSource="EAP" />
                    </div>
                  </el-card>
                  <el-card style="width: 47%; height: 55vh;margin-right: 40px; overflow: auto;">
                    <div style="width: 100%; height: 50vh">
                      <TreeWithContent :dataSource="RAR" />
                    </div>
                  </el-card>
                </div>
                <el-button
                  v-if="active1 > 0"
                  class="back-button"
                  size="large"
                  @click="back1"
                  type="primary"
                >
                  上一步
                </el-button>
                <el-button
                  v-if="active1 < 2"
                  class="next-button"
                  size="large"
                  @click="next1"
                  type="primary"
                >
                  下一步
                </el-button>
                <!-- <el-button v-if="active1 === 8" class="exit-button" size="large" @click="back">
                    返回
                  </el-button> -->
              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane label="尸检操作" name="second">
            <!-- 尸检操作步骤条 -->
            <div>
              <el-steps
                :active="active2"
                finish-status="success"
                align-center
                style="margin-top: 20px"
              >
                <el-step title="尸检操作原则"></el-step>
                <el-step title="脏器检查与尸检标本规定"></el-step>
              </el-steps>
            </div>
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: flex-start;
                margin-top: 2vh;
              "
            >
              <el-card class="card_container">
                <!--尸检操作原则 -->
                <div v-if="active2 === 0" class="center-container">
                  <el-card
                    style="
                      width: 30%;
                      height: 55vh;
                      margin-left: 40px;
                      align-items: center;
                      display: flex;
                    "
                  >
                    <img
                      src="./image/sj.jpg"
                      style="object-fit: cover; width: 100%; height: 100%"
                      alt="实验室生物安全"
                    />

                    <!-- <label>显示图片</label> -->
                  </el-card>
                  <el-card style="width: 60%; height: 55vh; margin-right: 40px">
                    <!-- <label>尸检操作原则 </label> -->
                    <!-- <div v-for="(text, index) in text5" :key="index" style="margin-top: 15px">{{ text }}</div> -->
                    <div style="width: 100%; height: 50vh">
                      <TreeWithContent :dataSource="PM" />
                    </div>
                  </el-card>
                </div>
                <!-- 脏器检查 -->
                <div v-if="active2 === 1" class="center-container">
                  <el-card style="width: 47%; height: 55vh;margin-right: 40px; overflow: auto;">
                    <div style="width: 100%; height: 50vh">
                      <TreeWithContent :dataSource="OrganExamination" />
                    </div>
                  </el-card>
                  <el-card style="width: 47%; height: 55vh;margin-right: 40px; overflow: auto;">
                    <div style="width: 100%; height: 50vh">
                      <TreeWithContent :dataSource="PreservationGuidelines" />
                    </div>
                  </el-card>
                </div>

                <el-button
                  v-if="active2 > -1"
                  class="back-button"
                  size="large"
                  @click="back2"
                  type="primary"
                >
                  上一步
                </el-button>
                <el-button
                  v-if="active2 < 2"
                  class="next-button"
                  size="large"
                  @click="next2"
                  type="primary"
                >
                  下一步
                </el-button>
                <!-- <el-button v-if="active2 === 3" class="exit-button" size="large" @click="back">
                  返回
                </el-button> -->
              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane label="器械及标本处理" name="third">
            <!-- 器械及标本处理步骤条 -->
            <div>
              <el-steps
                :active="active3"
                finish-status="success"
                align-center
                style="margin-top: 20px"
              >
                <el-step title="医疗废物与解剖器械处理原则"></el-step>
                <el-step title="标本与尸检废弃物、污水的处理原则"></el-step>
              </el-steps>
            </div>
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: flex-start;
                margin-top: 2vh;
              "
            >
              <el-card class="card_container">
                <!--医疗废物处理原则 -->
                <div v-if="active3 === 0" class="center-container">
                  <el-card style="width: 47%; height: 55vh;margin-right: 40px; overflow: auto;">
                    <div style="width: 100%; height: 50vh">
                      <TreeWithContent :dataSource="MWMP" />
                    </div>
                  </el-card>
                  <el-card style="width: 47%; height: 55vh;margin-right: 40px; overflow: auto;">
                    <div style="width: 100%; height: 50vh">
                      <TreeWithContent :dataSource="ADP" />
                    </div>
                  </el-card>
                </div>

                <!-- 标本的处理原则 -->
                <div v-if="active3 === 1" class="center-container">
                  <el-card style="width: 47%; height: 55vh;margin-right: 40px; overflow: auto;">
                    <div style="width: 100%; height: 50vh">
                      <TreeWithContent :dataSource="SPP" />
                    </div>
                  </el-card>
                  <el-card style="width: 47%; height: 55vh;margin-right: 40px; overflow: auto;">
                    <div style="width: 100%; height: 50vh">
                      <TreeWithContent :dataSource="PMWTP" />
                    </div>
                  </el-card>

                </div>

                <el-button
                  v-if="active3 > -1"
                  class="back-button"
                  size="large"
                  @click="back3"
                  type="primary"
                >
                  上一步
                </el-button>
                <el-button
                  v-if="active3 < 2"
                  class="next-button"
                  size="large"
                  @click="next3"
                  type="primary"
                >
                  下一步
                </el-button>
              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane label="尸检制样及采用的技术" name="fourth">
            <!-- 尸检操作步骤条 -->
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: flex-start;
                margin-top: 8vh;
              "
            >
              <el-card class="card_container">
                <!--标本形态学、病理学特征和分析技术 -->
                <div style="margin-left: 0">
                  <el-button plain @click="PMSTDialogVisible = true">
                    查看说明
                  </el-button>
                </div>
                <div class="description">
                  <el-card class="text" style="margin: 20px 20px 10px 20px">
                    <label style="margin-left: 42%">待检测图片</label>
                    <el-divider></el-divider>
                    <div class="img">
                      <div
                        v-show="showLabel"
                        style="
                          margin-left: 40%;
                          margin-top: 30%;
                          color: darkgray;
                        "
                      >
                        <label style="font: 14px Extra Small"
                          >请上传需检测图片</label
                        >
                      </div>
                      <img
                        v-show="showImg"
                        id="image-display"
                        src=""
                        style="height: 100%; width: 100%"
                        alt="/"
                      />
                    </div>
                    <el-button
                      type="primary"
                      id="upload-button"
                      @click="handleUpload"
                      style="margin-left: 38%; margin-top: 3%"
                    >
                      上传检测图片
                      <input
                        type="file"
                        title="上传图片"
                        id="upload-input"
                        style="display: none"
                      />
                    </el-button>
                  </el-card>
                  <el-card class="text" style="margin: 20px 30px 20px 30px">
                    <label class="label" style="margin-left: 42%"
                      >检测信息录入</label
                    >
                    <el-divider></el-divider>
                    <div style="margin: 0 30px">
                      病理学特征描述：
                      <el-input
                        placeholder="请输入病理学特征描述"
                        type="textarea"
                        style="display: block; margin: 10px 0"
                        v-model="form.description"
                        :autosize="{ minRows: 6, maxRows: 6 }"
                      ></el-input>
                    </div>
                    <div style="margin: 10px 30px 0 30px">
                      <span>分析识别方法：</span>
                      <el-select
                        v-model="form.method"
                        placeholder="请选择分析技术"
                      >
                        <el-option
                          v-for="(technique, index) in techniques"
                          :key="index"
                          :label="technique"
                          :value="technique"
                        ></el-option>
                      </el-select>
                      <div v-if="form.method === '碱基序列分析'">
                        <span>碱基序列：</span>
                        <el-input
                          v-model="form.baseSequence"
                          style="width: 220px; margin: 15px 15px 15px 30px"
                          placeholder="请输入碱基序列"
                        />
                      </div>
                    </div>
                  </el-card>
                </div>

                <el-dialog
                  v-model="PMSTDialogVisible"
                  title="说明"
                  width="800px"
                  destroy-on-close
                  draggable
                >
                  <div style="width: 100%; height: 50vh">
                    <TreeWithContent :dataSource="PMST" />
                  </div>
                </el-dialog>

                <el-button
                  class="back-button"
                  size="large"
                  @click="back4"
                  type="primary"
                >
                  上一步
                </el-button>
                <el-button
                  class="next-button"
                  size="large"
                  @click="next4"
                  type="primary"
                >
                  下一步
                </el-button>
                <!-- <el-button v-if="active2 === 3" class="exit-button" size="large" @click="back">
                  返回
                </el-button> -->
              </el-card>
            </div>
          </el-tab-pane>
        </el-tabs>

        <el-dialog
          v-model="dialogPerson"
          title="选择解剖员"
          width="600px"
          draggable
        >
          <div style="display: flex; align-items: center">
            <el-input
              style="display: inline-block; width: 30%; margin: 0 10px 0 60%"
              v-model="personID"
              placeholder="请输入警务号"
            ></el-input>
            <el-button
              type="primary"
              :icon="Search"
              @click="handleSearch"
              style="display: inline-block"
              circle
            ></el-button>
            <el-button
              type="primary"
              :icon="Plus"
              circle
              @click="dialogAutopsyPerson = true"
              style="display: inline-block"
            ></el-button>
          </div>

          <div>
            <el-table :data="persons" style="width: 100%;" type="selection" height="550">
              <el-table-column
                prop="id"
                label="警务号"
                width="180"
                fixed="left"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180"
                fixed="left"
              ></el-table-column>
              <el-table-column
                label="是否选中"
                width="180"
                fixed="right"
                prop="checked"
              >
                <template #default="{ row }">
                  <el-checkbox v-model="row.checked"></el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogPerson = false">取消</el-button>
              <el-button type="primary" @click="addPerson">确认</el-button>
            </span>
          </template>
        </el-dialog>
        <el-dialog
          v-model="dialogAutopsyPerson"
          title="新增解剖员"
          width="600px"
          draggable
        >
          <el-form
            :model="newAutopsypeople"
            style="display: flex; flex-direction: column"
          >
            <el-form-item label="警务号">
              <el-input
                v-model="newAutopsypeople.newid"
                style="width: 10rem; margin-left: 5px"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input
                v-model="newAutopsypeople.newname"
                style="width: 10rem; margin-left: 20px"
              ></el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogAutopsyPerson = false">取消</el-button>
              <el-button type="primary" @click="addAutopsyPeople">确认</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount, onMounted } from "vue";
import { Plus, Search } from "@element-plus/icons-vue";
import { post } from "@/net";
import { ElMessage } from "element-plus";
import axios from "axios";

//-----------start--用到的PDF
import {ADP} from "./PDF/ADP.js";
import {EAP} from "./PDF/EAP.js";
import {LabRequirements} from "./PDF/LabRequirements.js";
import {MWMP} from "./PDF/MWMP.js";
import {OrganExamination} from "./PDF/OrganExamination.js";
import {PM} from "./PDF/PM.js";
import {PMST} from "./PDF/PMST.js";
import {PMWTP} from "./PDF/PMWTP.js";
import {PreservationGuidelines} from "./PDF/PreservationGuidelines.js";
import {RAR} from "./PDF/RAR.js";
import {SampleSubmission} from "./PDF/SampleSubmission.js";
import {SPP} from "./PDF/SPP.js";
//-----------end--用到的PDF

//案件相关id
import router from "@/router";
import { useRoute } from "vue-router";
const route = useRoute();
const id = route.query.id;
const back = route.query.back;

import { inject } from 'vue';
import TreeWithContent from "@/components/TreeWithContent.vue";
const modelURL = inject('modelURL');

// 存放图片
const imageFile = ref();

//存放已选择的人员与仪器
const personIdList = ref([]);
const EquipmentIdList = ref([]);

//存放数据库内所有的人员与仪器
const persons = ref([]);
const equipments = ref([]);

//新增实验室人员
const newAutopsypeople = reactive({
  newid: "",
  newname: "",
});
const personID = ref();

//实验室人员信息-弹窗
const dialogPerson = ref(false);
const dialogAutopsyPerson = ref(false);

// 获取当前日期
const today = new Date();

const form = reactive({
  id: id,
  date: today.toISOString().split("T")[0],
  method: "",
  result: "",
  labResult: "",
  description: "",
  baseSequence: "",
  judge: true,
});

const prosectors = ref([]);

const activeName = ref("first");
const active1 = ref(0);
const active2 = ref(0);
const active3 = ref(0);
const description = ref("");
const activeIndex = ref("/identify1");
const showLabel = ref(true);
const showImg = ref(false);
const imageUrl = ref("");

const PMSTDialogVisible = ref(false);

const techniques = ref([
  "HE染色",
  "CT检查",
  "免疫组化染色",
  "电镜染色",
  "碱基序列分析",
]);

const tableKey = ref(0);

onBeforeMount(() => {
  post("/api/identify/select_equipment", {}, (data) => {
    equipments.value = data;
    equipments.value.forEach(function (item) {
      item.checked = false;
    });
  });

  if (id) {
    post(
      "/api/identify/select_Identify",
      {
        id: id,
      },
      (data) => {
        form.method = data.method;
        form.description = data.description;
        form.baseSequence = data.baseSequence;
        form.result = data.result;
      }
    );
    post("/api/identify/select_person", {}, (data) => {
      persons.value = data;
      persons.value.forEach(function (item) {
        item.checked = false;
      });
      post(
        "/api/identify/select_autopsyPerson",
        {
          id: id,
        },
        (data) => {
          personIdList.value = data;
          prosectors.value.splice(
            0,
            prosectors.value.length,
            ...persons.value.filter((person) =>
              personIdList.value.includes(person.id)
            )
          );
          persons.value.forEach((item) => {
            if (personIdList.value.includes(item.id)) {
              item.checked = true;
            }
          });
          tableKey.value++;
        }
      );
    });
  }
});

const addPerson = () => {
  dialogPerson.value = false;
  personIdList.value = [];
  persons.value.forEach((person) => {
    if (person.checked) {
      personIdList.value.push(person.id);
    }
  });
  prosectors.value = persons.value.filter((person) =>
    personIdList.value.includes(person.id)
  );
  post(
    "/api/identify/delete_autopsyPerson",
    {
      id: id,
    },
    (data) => {
      post(
        "/api/identify/add_autopsyPerson",
        {
          id: id,
          persons: personIdList.value,
        },
        (data) => {
          ElMessage.success("解剖员更新成功");
        }
      );
    }
  );
};

const addAutopsyPeople = () => {
  if(newAutopsypeople.newid && newAutopsypeople.newname){
    dialogAutopsyPerson.value = false;
    console.log(newAutopsypeople.newid);
    console.log(newAutopsypeople.newname);
    post(
        "/api/identify/add_newIdentifyPerson",
        {
          id: newAutopsypeople.newid,
          name: newAutopsypeople.newname,
        },
        (data) => {
          ElMessage.warning(data);
          post("/api/identify/select_person", {}, (data) => {
            persons.value = data;
            persons.value.forEach(function (item) {
              item.checked = false;
            });
          });
        }
    );
  }
  else{
    ElMessage.warning("请输入完整的信息")
  }


};


const handleSelect = (index) => {
  // 跳转到对应的路由并带上参数
  router.push({
    path: index,
    query: { id: route.query.id, back: route.query.back },
  });
};

const handleClick = (index) => {};

function handleUpload() {
  let imageDisplay = document.getElementById("image-display");
  let uploadInput = document.getElementById("upload-input");
  uploadInput.addEventListener("change", function (event) {
    let files = event.target.files; // 获取选择的文件列表
    if (files.length > 0) {
      let file = files[0]; // 获取第一个文件
      imageFile.value = file;
      let fileReader = new FileReader();
      showImg.value = true;
      showLabel.value = false;
      fileReader.onload = function (e) {
        imageUrl.value = e.target.result;
        imageDisplay.src = imageUrl.value;
      };
      fileReader.readAsDataURL(file);
    }
  });
  uploadInput.click();
}

const next1 = () => {
  if (active1.value++ > 0) activeName.value = "second";
};
const back1 = () => {
  if (active1.value-- < 0) active1.value = 0;
};
const next2 = () => {
  if (active2.value++ > 0) activeName.value = "third";
};
const back2 = () => {
  if (active2.value-- < 1) {
    active2.value = 0;
    activeName.value = "first";
    console.log(activeName.value);
  }
};
const next3 = () => {
  if (active3.value++ > 0) activeName.value = "fourth";
};
const back3 = () => {
  if (active3.value-- < 1) {
    active3.value = 0;
    activeName.value = "second";
    console.log(activeName.value);
  }
};
const next4 = async () => {
  if (form.method !== "") {
    const formData = new FormData();
    formData.append("image", imageFile.value);
    console.log(modelURL);
    if (form.method === "CT检查") {
      await axios
        .post(modelURL + "/classification/convid", formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          form.result = response.data.message.class;
        })
        .catch((error) => {
          console.error("比对失败", error);
        });
    }
    if (form.method === "HE染色") {
      await axios
        .post(modelURL + "/classification/he", formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          form.result = response.data.message.class;
        })
        .catch((error) => {
          console.error("比对失败", error);
        });
    }
    if (
      (form.method === "碱基序列分析" && form.baseSequence !== "") ||
      form.method !== "碱基序列分析"
    ) {
      console.log(form.result);
      await post(
        "/api/identify/create_identify",
        {
          id: id,
          date: form.date,
          method: form.method,
          result: form.result,
          labResult: form.labResult,
          description: form.description,
          baseSequence: form.baseSequence,
          judge: form.judge,
          isUpdate: true,
        },
        (data) => {
          router.push({
            path: "/identify2",
            query: { id: route.query.id, back: route.query.back },
          });
        },
        (data) => {
          ElMessage.warning(data);
        }
      );
    } else {
      ElMessage.warning("请填写碱基序列");
    }
  } else {
    ElMessage.warning("请选择分析识别方法");
  }
};

const back4 = () => {
  activeName.value = "third";
};

onMounted(() => {
  post("/api/identify/select_Identify", {
    id: id,
  }, (data) => {

    form.labResult = data.labResult;

    if(back !== undefined){
      setTimeout(() => {
        if(form.judge){
          router.push({path: '/identify1', query: {id: id, back: back}});
        }
        else{
          router.push({path: '/identify2', query: {id: id, back: back}});
        }
      }, 3000) //3s
    }

  });

});
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

.demo-tabs :deep(.el-tabs__item) {
  margin-left: 30px;
  font-size: 16px !important;
  /* 设置你想要的字体大小 */
}

.card_container {
  justify-content: center;
  height: 70vh;
  width: 80vw;
  position: relative;
}

.el-menu-demo :deep(.el-menu-item) {
  font-size: 20px;
}

.back-button {
  position: absolute;
  bottom: 10px;
  /* 距离底部的间距 */
  right: 100px;
}

.next-button {
  position: absolute;
  bottom: 10px;
  /* 距离底部的间距 */
  right: 10px;
  /* 距离右侧的间距 */
}


.search-content {
  width: 100%;
  /* background-color: black; */
  display: flex;
  justify-content: center;
}

.center-container {
  display: flex;
  justify-content: space-between;
}

.vertical-tabs :deep(.el-tabs__item) {
  font-size: 16px !important;
  margin-bottom: 20px !important;
  /* 改变这个值来改变字体大小 */
}

.img {
  height: 340px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  border: 1.2px solid;
  border-color: darkgray;
}

.description {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin: 0;
}

.text {
  height: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  border: 1.2px solid;
  border-color: darkgray;
}
</style>
