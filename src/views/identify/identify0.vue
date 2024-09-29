<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
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
          <el-menu-item index="/judge">染病个体解剖查验</el-menu-item>
          <el-menu-item index="/identify2">检验鉴定报告</el-menu-item>
        </el-menu>


        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="样本运输" name="first">
            <!-- 样本运输步骤条 -->
            <div>
              <el-steps
                  :active="active1"
                  finish-status="success"
                  align-center
                  style="margin-top: 20px"
              >
                <el-step title="样本包装和保存"></el-step>
                <el-step title="标本送检"></el-step>
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
                <!-- 实验室检测人员 -->
                <!-- 样本包装和保存 -->
                <div v-if="active1 === 0" class="center-container">
                  <el-card
                      style="
                      width: 45%;
                      height: 55vh;
                      margin-left: 40px;
                      display: flex;
                      justify-content: center;
                    "
                  >
                    <!-- <label>显示图片</label> -->
                    <img
                        src="./image/yp.jpg"
                        style="object-fit: cover; width: 100%; height: 100%;"
                        alt="实验室生物安全"
                    />
                  </el-card>
                  <el-card style="width: 45%; height: 55vh; margin-right: 40px">
                    <!-- <label>样本包装和保存</label>
                    <div v-for="(text, index) in text4" :key="index" style="margin-top: 15px">{{ index + 1 }}、{{ text }}
                    </div>-->
                    <div style="width: 100%;height: 50vh;">
                      <embed
                          :src="SamplePackagingAndStorage"
                          type="application/pdf"
                          width="100%"
                          height="100%"
                      />
                    </div>
                  </el-card>
                </div>
                <!-- 标本送检 -->
                <div v-if="active1 === 1" class="center-container">
                  <el-card
                      style="
                      width: 45%;
                      height: 55vh;
                      margin-left: 40px;
                      display: flex;
                      justify-content: center;
                    "
                  >
                    <img
                        src="./image/bbsj.webp"
                        style="object-fit: cover; width: 100%; height: 100%;"
                        alt="实验室生物安全"
                    />
                  </el-card>
                  <el-card style="width: 45%; height: 55vh; margin-right: 40px">
                    <!-- <label>标本送检</label>
                    <div v-for="(text, index) in text5" :key="index" style="margin-top: 15px">{{ index + 1 }}、{{ text }}</div>-->
                    <div style="width: 100%;height: 50vh;">
                      <embed
                          :src="SampleSubmission"
                          type="application/pdf"
                          width="100%"
                          height="100%"
                      />
                    </div>
                  </el-card>
                </div>
                <el-button
                    v-if="active1 > 0"
                    class="back-button"
                    size="large"
                    @click="back1"
                    type="primary"
                >上一步</el-button>
                <el-button
                    v-if="active1 < 2"
                    class="next-button"
                    size="large"
                    @click="next1"
                    type="primary"
                >下一步</el-button>
                <!-- <el-button v-if="active1 === 8" class="exit-button" size="large" @click="back">
                    返回
                </el-button>-->
              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane label="实验室检测" name="second">
            <!-- 实验室检测步骤条 -->
            <div>
              <el-steps
                  :active="active2"
                  finish-status="success"
                  align-center
                  style="margin-top: 20px"
              >
                <el-step title="实验室检测人员"></el-step>
                <el-step title="病原微生物实验室生物安全管理"></el-step>
                <el-step title="检测人员要求"></el-step>
                <el-step title="检测方法"></el-step>
                <el-step title="检测仪器"></el-step>
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
                <!-- 实验室活动生物安全要求 -->
                <div v-if="active2 === 0">
                  <div style="margin-bottom: 10px;">
                    <label>实验室检测人员：</label>
                    <el-button type="primary" :icon="Plus" circle @click="dialogPerson = true;"></el-button>
                  </div>
                  <div>
                    <el-table :data="form.person" style="width: 100%; height: 45vh">
                      <el-table-column prop="id" label="警务号" />
                      <el-table-column prop="name" label="姓名" />
                    </el-table>
                  </div>

                </div>
                <div v-if="active2 === 1" class="center-container">
                  <el-card
                      style="width: 45%;height: 55vh;margin-left: 40px;align-items: center;display: flex"
                  >
                    <img
                        src="./image/lab.jpeg"
                        style="object-fit: cover; width: 100%; height: 100%;"
                        alt="实验室生物安全"
                    />
                  </el-card>
                  <el-card style="width: 45%; height: 55vh; margin-right: 40px">
                    <!-- <label>实验室活动生物安全要求 </label>
                    <div v-for="(text, index) in text6" :key="index" style="margin-top: 15px">{{ index + 1 }}、{{ text }}</div>-->
                    <div style="width: 100%;height: 50vh;">
                      <embed :src="security" type="application/pdf" width="100%" height="100%" />
                    </div>
                  </el-card>
                </div>
                <!-- 检测人员要求 -->
                <div v-if="active2 === 2">
                  <!-- <span>样本采样基本要求</span> -->
                  <div style="margin-top: 15px; font-size: 20px; text-indent: 2em">{{ text7 }}</div>
                </div>
                <!-- 检测方法 -->
                <div v-if="active2 === 3" style>
                  <div style="margin-left: 0">
                    <el-button plain @click="centerDialogVisible = true">查看说明</el-button>
                  </div>
                  <div class="text-center">
                    <span style="margin-right: 10px; font-size: 16px;">检测方法：</span>
                    <el-select v-model="selectedOption" placeholder="请选择" style="width: 300px">
                      <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item"
                      ></el-option>
                    </el-select>
                    <!-- 毒素 -->
                    <span
                        v-if="selectedOption.value === 'toxin'"
                        style="margin-left: 400px;margin-right: 10px; font-size: 16px;"
                    >毒素选择：</span>
                    <el-select
                        v-if="selectedOption.value === 'toxin'"
                        v-model="toxinselectedOption"
                        placeholder="请选择毒素"
                        style="width: 300px"
                    >
                      <el-option
                          v-for="toxin in toxin_list"
                          :key="toxin"
                          :label="toxin.label"
                          :value="toxin.value"
                      ></el-option>
                    </el-select>
                    <!-- 细菌 -->
                    <span
                        v-if="selectedOption.value === 'bacteria'"
                        style="margin-left: 400px;margin-right: 10px; font-size: 16px;"
                    >细菌选择：</span>
                    <el-select
                        v-if="selectedOption.value === 'bacteria'"
                        v-model="bacteriaselectedOption"
                        placeholder="请选择细菌"
                        style="width: 300px"
                    >
                      <el-option
                          v-for="bacteria in bacteria_list"
                          :key="bacteria"
                          :label="bacteria.label"
                          :value="bacteria.value"
                      ></el-option>
                    </el-select>
                    <!-- 病毒 -->
                    <span
                        v-if="selectedOption.value === 'virus'"
                        style="margin-left: 400px;margin-right: 10px; font-size: 16px;"
                    >病毒选择：</span>
                    <el-select
                        v-if="selectedOption.value === 'virus'"
                        v-model="virusselectedOption"
                        placeholder="请选择病毒"
                        style="width: 300px"
                    >
                      <el-option
                          v-for="virus in virus_list"
                          :key="virus"
                          :label="virus.label"
                          :value="virus.value"
                      ></el-option>
                    </el-select>
                  </div>

                  <div v-if="selectedOption" class="mt-4">
                    <div v-if="selectedOption.value === 'bacteria'" style="height: 100%;">
                      <div
                          v-if="selectedOption.value === 'bacteria' && !(bacteriaselectedOption === '')"
                          style="height: 100%;"
                      >
                        <div
                            style="height: 100%;display: flex; justify-content: center;align-items: center;"
                        >
                          <span>暂无内容</span>
                        </div>
                      </div>
                      <!-- <el-tabs tab-position="left" class="vertical-tabs">
                        <el-tab-pane label="检测方法">
                          <p>{{ selectedOption.method }}</p>
                        </el-tab-pane>
                        <el-tab-pane label="实验室要求">
                          <p>{{ selectedOption.labRequirements }}</p>
                        </el-tab-pane>
                        <el-tab-pane label="试剂存储、准备、制备、分析等">
                          <p>{{ selectedOption.reagentInfo }}</p>
                        </el-tab-pane>
                        <el-tab-pane label="基因组测定（标本选择、测序要求）">
                          <p>{{ selectedOption.genomeInfo }}</p>
                        </el-tab-pane>
                        <el-tab-pane label="阳性确定标准">
                          <p>{{ selectedOption.positiveStandard }}</p>
                        </el-tab-pane>
                        <el-tab-pane label="质控">
                          <p>{{ selectedOption.qualityControl }}</p>
                        </el-tab-pane>
                      </el-tabs>-->
                    </div>
                    <div v-if="selectedOption.value === 'virus'" style="height: 100%;">
                      <div
                          v-if="selectedOption.value === 'virus' && !(virusselectedOption === '')"
                          style="height: 100%;"
                      >
                        <div
                            style="height: 100%;display: flex; justify-content: center;align-items: center;"
                        >
                          <span>暂无内容</span>
                        </div>
                      </div>
                      <!-- <el-tabs tab-position="left" class="vertical-tabs">
                        <el-tab-pane label="检测方法">
                          <p>{{ selectedOption.method }}</p>
                        </el-tab-pane>
                        <el-tab-pane label="实验室要求">
                          <p>{{ selectedOption.labRequirements }}</p>
                        </el-tab-pane>
                        <el-tab-pane label="试剂存储、准备、制备、分析等">
                          <p>{{ selectedOption.reagentInfo }}</p>
                        </el-tab-pane>
                        <el-tab-pane label="基因组测定（标本选择、测序要求）">
                          <p>{{ selectedOption.genomeInfo }}</p>
                        </el-tab-pane>
                        <el-tab-pane label="阳性确定标准">
                          <p>{{ selectedOption.positiveStandard }}</p>
                        </el-tab-pane>
                        <el-tab-pane label="质控">
                          <p>{{ selectedOption.qualityControl }}</p>
                        </el-tab-pane>
                      </el-tabs>-->
                    </div>
                    <div
                        v-if="selectedOption.value === 'toxin' && !(toxinselectedOption === 'ricin') && !(toxinselectedOption === '')"
                        style="height: 100%;"
                    >
                      <div
                          style="height: 100%;display: flex; justify-content: center; align-items: center;"
                      >
                        <span>暂无内容</span>
                      </div>
                    </div>

                    <div
                        v-if="selectedOption.value === 'toxin' && toxinselectedOption === 'ricin'"
                        class="mt-4"
                        style="  display: flex;"
                    >
                      <div style="width: 40%;height: 100%;display: flex; flex-direction: column;">
                        <div style="display: flex;justify-content: center;align-items: center;">
                          <img
                              src="./image/1.jpg"
                              alt="试剂图片"
                              style="max-width: 100%; max-height: 100%; object-fit: contain;"
                          />
                        </div>
                        <div style="display: flex;justify-content: center;align-items: center;">
                          <img
                              src="./image/2.jpg"
                              alt="试剂图片"
                              style="max-width: 100%; max-height: 100%; object-fit: contain;"
                          />
                        </div>
                      </div>
                      <div style=" width: 60%;height: 100%;">
                        <embed :src="readMe" type="application/pdf" width="100%" height="100%;" />
                      </div>
                    </div>
                  </div>

                  <el-dialog
                      v-model="centerDialogVisible"
                      title="说明"
                      width="800px"
                      destroy-on-close
                      draggable
                  >
                    <div style=" width: 100%;height: 50vh;">
                      <embed :src="LTA" type="application/pdf" width="100%" height="100%;" />
                    </div>
                  </el-dialog>
                </div>
                <!-- 检测仪器 -->
                <div v-if="active2 === 4">
                  <div>
                    <div style="margin-bottom: 10px">
                      <label class="smalllabel">检测装备设备：</label>
                      <el-button
                          el-button
                          type="primary"
                          :icon="Plus"
                          circle
                          @click="addequiment = true"
                      ></el-button>
                    </div>
                    <el-card>
                      <el-table :data="form.equipment" style="width: 100%; height: 45vh">
                        <el-table-column prop="id" label="设备号" />
                        <el-table-column prop="name" label="设备名" />
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

                  <el-dialog v-model="addequiment" title="选择检测仪器" width="600px" draggable>
                    <div>
                      <el-input
                          style="
                          display: inline-block;
                          width: 30%;
                          margin: 7px 10px 0 50%;
                        "
                          v-model="personID"
                          placeholder="请输入设备号"
                      ></el-input>
                      <el-button
                          type="primary"
                          :icon="Search"
                          @click="handleSearch"
                          style="
                          display: inline-block;
                          margin-top: 7px;
                          margin-right: 0;
                        "
                          circle
                      ></el-button>
                    </div>
                    <div>
                      <el-table
                          :data="LabEquiment"
                          style="width: 100%; margin-top: 10px"
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
                  <el-dialog
                      title="预览文件"
                      v-model="isViewPdf20"
                      :before-close="handleClose"
                      width="80vw"
                  >
                    <iframe :src="PDFsrc" frameborder="0" style="width: 75vw; height: 70vh"></iframe>
                  </el-dialog>
                </div>
                <el-button
                    v-if="active2 > -1"
                    class="back-button"
                    size="large"
                    @click="back2"
                    type="primary"
                >上一步</el-button>
                <el-button
                    v-if="active2 < 4"
                    class="next-button"
                    size="large"
                    @click="next2"
                    type="primary"
                >下一步</el-button>

                <div v-if="active2 === 4">
                  <router-link :to="{path: '/judge',query: { id: id, back: back }}">
                    <el-button class="next-button" size="large" type="primary">跳转</el-button>
                  </router-link>
                </div>
                <!-- <el-button v-if="active2 === 3" class="exit-button" size="large" @click="back">
                  返回
                </el-button>-->
              </el-card>
            </div>
          </el-tab-pane>
        </el-tabs>

        <el-dialog v-model="dialogPerson" title="选择实验室检测人员" width="600px" draggable>
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
                @click="dialogLabsPerson = true;"
                style="display: inline-block;"
            ></el-button>
          </div>

          <div>
            <el-table :data="persons" style="width: 100%" type="selection">
              <el-table-column label="选中" width="180" fixed="right" prop="checked">
                <template #default="{ row }">
                  <el-checkbox v-model="row.checked"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column prop="id" label="警务号" width="180" fixed="left"></el-table-column>
              <el-table-column prop="name" label="姓名" width="180" fixed="left"></el-table-column>

            </el-table>
          </div>
          <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogPerson = false">取消</el-button>
                  <el-button type="primary" @click="addPerson">确认</el-button>
                </span>
          </template>
        </el-dialog>
        <el-dialog v-model="dialogLabsPerson" title="新增实验室检测人员" width="600px" draggable>
          <el-form :model="newLabspeople" style="display: flex; flex-direction: column;">
            <el-form-item label="警务号">
              <el-input v-model="newLabspeople.newid" style="width:10rem; margin-left: 5px;"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="newLabspeople.newname" style="width:10rem; margin-left: 20px"></el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogLabsPerson = false">取消</el-button>
              <el-button type="primary" @click="addLabsPeople">确认</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive, onBeforeMount} from "vue";
import {
  Search,
  Plus,
} from "@element-plus/icons-vue";

//-----------start--用到的PDF
// import LSBR from "./PDF/LSBR.pdf";
import security from "./PDF/病原微生物实验室生物安全管理条例-2018修订版.pdf";
import LTA from "./PDF/LTA.pdf";
import readMe from "./PDF/readMe.pdf";
import SamplePackagingAndStorage from "./PDF/SamplePackagingAndStorage.pdf";
import SampleSubmission from "./PDF/SampleSubmission.pdf";
//-----------end--用到的PDF

import {post} from "@/net";
import {ElMessage} from "element-plus";
import router from "@/router";

//案件相关id
import {useRoute} from "vue-router";
const route = useRoute();
const id = route.query.id;
const back = route.query.back;

//存放已选择的人员与仪器
const personIdList = ref([]);
const EquipmentIdList = ref([]);

//存放数据库内所有的人员与仪器
const persons = ref([]);
const equipments = ref([]);

//新增实验室人员
const newLabspeople = reactive({
  newid: "",
  newname: "",
});
const personID = ref();

//实验室人员信息-弹窗
const dialogPerson = ref(false);
const dialogLabsPerson = ref(false);

//实验室设备信息-弹窗
const addequiment = ref(false);


const PDFsrc = ref("");
const isViewPdf20 = ref(false);
const form = reactive({
  province: "",
  city: "",
  cellname: "",
  range: "",
  type: [],
  method: "",
  person: [{}],
  equipment: [{}],
});

//实验室器材
const LabEquiment = ref([
  {
    id: 1,
    name: "PCR分析仪",
    checked: false,
    guide: "src/views/risk/device_guide/PCR_condition_detectiver.pdf",
  },
  {
    id: 2,
    name: "荧光显微镜光谱仪",
    checked: false,
    guide: "src/views/risk/device_guide/micro_condition_detectiver.pdf",
  },
  {
    id: 3,
    name: "质谱仪",
    checked: false,
    guide: "src/views/risk/device_guide/mass_spectra_condition_detectiver.pdf",
  },
  {
    id: 4,
    name: "酶标仪",
    checked: false,
    guide: "src/views/risk/device_guide/ELIASA_condition_detectiver.pdf",
  },
  {
    id: 5,
    name: "离心机",
    checked: false,
    guide: "src/views/risk/device_guide/centrifugal_condition_detectiver.pdf",
  },
  {
    id: 6,
    name: "PCR仪",
    checked: false,
    guide: "src/views/risk/device_guide/PCR__detectiver.pdf",
  },
  {
    id: 7,
    name: "ELISA分析仪",
    checked: false,
    guide: "src/views/risk/device_guide/ELISA__detectiver.pdf",
  },
]);

const toxin_list = [
  { value: "botulinum", label: "肉毒毒素" },
  { value: "ricin", label: "蓖麻毒素" },
  { value: "tetrodotoxin", label: "石房蛤毒素" },
  { value: "aconitine", label: "乌头碱" },
  { value: "enterotoxin-b", label: "葡萄球菌肠毒素 B" },
];
const bacteria_list = [
  { value: "yersinia-pestis", label: "鼠疫耶尔森菌" },
  { value: "bacillus-anthracis", label: "炭疽芽胞杆菌" },
  {
    value: "methicillin-resistant-staphylococcus-aureus",
    label: "耐甲氧西林金黄色葡萄球菌",
  },
  { value: "drug-resistant-genes", label: "耐药基因" },
  { value: "virulence-genes", label: "毒力基因" },
  { value: "maker-genes", label: "Maker基因" },
];
const virus_list = [
  { value: "novel-coronavirus", label: "新型冠状病毒" },
  { value: "influenza-virus", label: "流感病毒" },
  { value: "adenovirus", label: "腺病毒" },
];
const toxinselectedOption = ref("");
const bacteriaselectedOption = ref("");
const virusselectedOption = ref("");
const centerDialogVisible = ref(false);
const options = ref([
  {
    value: "bacteria",
    label: "检测细菌核酸",
    method:
        "采用PCR方法进行细菌核酸检测。首先提取样本中的总RNA，然后进行逆转录生成cDNA，最后进行PCR扩增。",
    labRequirements:
        "实验室需要具备PCR仪器、离心机、显微镜等设备，以及RNA提取试剂盒、逆转录试剂盒、PCR试剂等。",
    labImage: "实验室图片URL",
    reagentInfo:
        "试剂需要存储在-20℃的冷冻环境中。在使用前需要进行适当的制备和预处理。",
    genomeInfo: "基因组测定的信息...",
    positiveStandard:
        "阳性判断标准为PCR产物在预期大小处有明显的条带，且对照阳性样本也同样有明显的条带。",
    positiveStandardImage: "阳性确定标准的图片URL",
    qualityControl: "质控的信息...",
  },
  {
    value: "virus",
    label: "检测病毒核酸",
    method:
        "采用qPCR方法进行病毒核酸检测。首先提取样本中的总RNA，然后进行逆转录生成cDNA，最后进行qPCR扩增并实时监测荧光信号。",
    labRequirements:
        "实验室需要具备qPCR仪器、离心机等设备，以及RNA提取试剂盒、逆转录试剂盒、qPCR试剂等。",
    labImage: "实验室图片URL",
    reagentInfo:
        "试剂需要存储在-20℃的冷冻环境中。在使用前需要进行适当的制备和预处理。",
    genomeInfo: "基因组测定的信息...",
    positiveStandard:
        "阳性判断标准为qPCR的Ct值低于预设的阈值，且对照阳性样本的Ct值也低于阈值。",
    positiveStandardImage: "阳性确定标准的图片URL",
    qualityControl: "质控的信息...",
  },
  {
    value: "toxin",
    label: "检测毒素",
    method:
        "采用ELISA方法进行毒素检测。首先准备好毒素特异性的抗体，然后将样本加入孔板中进行孵育，最后通过检测荧光信号来判断毒素的存在。",
    labRequirements:
        "实验室需要具备ELISA阅读器、离心机等设备，以及ELISA试剂盒等。",
    labImage: "实验室图片URL",
    reagentInfo:
        "试剂需要存储在4℃的冷藏环境中。在使用前需要进行适当的制备和预处理。",
    genomeInfo: "基因组测定的信息...",
    positiveStandard:
        "阳性判断标准为ELISA的OD值高于预设的阈值，且对照阳性样本的OD值也高于阈值。",
    positiveStandardImage: "阳性确定标准的图片URL",
    qualityControl: "质控的信息...",
  },
]);
const selectedOption = ref(options.value[2]);
const activeName = ref("first");
const active1 = ref(0);
const active2 = ref(0);
const description = ref("");
const activeIndex = ref("/identify0");

const text7 = ref(
    "实验室检测技术人员应当具备实验室工作经历以及相关专业技术技能，接受过致病性病原相关检验检测技能培训。此外检测机构应当按照所开展检测项目及标本量配备实验室检测人员，以保证及时、高效完成检测和结果报告。"
);

const handleSelect = (index) => {
  // 跳转到对应的路由并带上参数
  router.push({ path: index, query: { id: route.query.id, back: route.query.back } });
}

const viewGuide = (guide) => {
  isViewPdf20.value = true;
  PDFsrc.value = guide;
};
const addEquiment = () => {
  addequiment.value = false;
  LabEquiment.value.forEach((equipment) => {
    if (equipment.checked) {
      if (equipment.guide != null) {
        form.equipment.push({
          id: equipment.id,
          name: equipment.name,
          guide: equipment.guide,
          showButton: true,
        });
      } else
        form.equipment.push({
          id: equipment.id,
          name: equipment.name,
          guide: equipment.guide,
          showButton: false,
        });
      equipment.checked = false;
    }
  });
};

// const wupin = ref(["手套", "防护服", "实验室器皿", "实验室样本管"]);

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

  if (id && back) {
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

const addPerson = () => {
  dialogPerson.value = false;
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

const addLabsPeople = () => {
  dialogLabsPerson.value = false;
  console.log(newLabspeople.newid);
  console.log(newLabspeople.newname);
  post(
      "/api/risk/add_newriskPerson",
      {
        id: newLabspeople.newid,
        name: newLabspeople.newname,
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

const next1 = () => {
  if (active1.value++ > 0) activeName.value = "second";
};
const back1 = () => {
  if (active1.value-- < 0) active1.value = 0;
};
const next2 = () => {
  if (active2.value++ > 5) active2.value = 0;
  console.log(active2.value);
};
const back2 = () => {
  if (active2.value-- < 1) {
    active2.value = 0;
    activeName.value = "first";
    console.log(activeName.value);
  }
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

.demo-tabs :deep(.el-tabs__item) {
  margin-left: 30px;
  font-size: 16px !important;
  /* 设置你想要的字体大小 */
}

.el-menu-demo :deep(.el-menu-item) {
  font-size: 20px;
}

.card_container {
  justify-content: center;
  height: 70vh;
  width: 80vw;
  position: relative;
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

.center-container {
  display: flex;
  justify-content: space-between;
}

.text-center {
  display: flex;
  justify-content: center;
  height: 5vh;
  align-items: center;
  /* background-color: antiquewhite; */
}

.mt-4 {
  margin-top: 1rem;
  height: 50vh;
  /* background-color: aquamarine; */
}

.vertical-tabs :deep(.el-tabs__item) {
  font-size: 16px !important;
  margin-bottom: 20px !important;
  /* 改变这个值来改变字体大小 */
}
</style>
