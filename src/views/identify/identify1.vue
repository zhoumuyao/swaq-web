<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div>
        <!-- 检验鉴定模块-->
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
          <el-menu-item index="/identify0">生物危险因子采集和检测技术</el-menu-item>
          <el-menu-item index="/identify1">染病个体解剖查验</el-menu-item>
        </el-menu>
        <!-- <div style="display: flex;">
          <router-link to="/identify0" :class="{ 'active-link': $route.path === '/identify0' }">
            <h3>生物危险因子采集和检测技术</h3>
          </router-link>
          <router-link to="/identify1" style="margin-left: 20px;" :class="{ 'active-link': $route.path === '/identify1' }">
            <h3>染病个体解剖查验</h3>
          </router-link>
        </div> -->
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="具备条件" name="first">
            <!-- 具备条件步骤条 -->
            <div>
              <el-steps :active="active1" finish-status="success" align-center style="margin-top: 20px">
                <el-step title="实验室"></el-step>
                <el-step title="解剖员"></el-step>
                <el-step title="规章制度和规范操作规程"></el-step>
                <el-step title="应急预案"></el-step>
              </el-steps>
            </div>
            <div style="  display: flex;justify-content: center;align-items: flex-start; margin-top: 2vh;">
              <el-card class="card_container">
                <!-- 实验室 -->
                <div v-if="active1 === 0" class="center-container">
                  <el-card style="width: 45%;height: 55vh;margin-left: 40px;display: flex;justify-content: center;">
                    <!-- <label>显示图片</label> -->
                    <img src="./image/lab2.webp" style="object-fit: cover; width: 100%; height: 100%;" alt="实验室生物安全">

                  </el-card>
                  <el-card style="width: 45%;height: 55vh;margin-right: 40px;overflow: auto;">
                    <!-- <label>相应的设备</label>
                    <div style="margin-top: 15px;">{{ device }}</div> -->
                    <div style=" width: 100%;height: 50vh;">
                      <embed :src="LabRequirements" type="application/pdf" width="100%" height="100%;">
                    </div>
                  </el-card>
                </div>
                <!-- 解剖员基本要求 -->
                <div v-if="active1 === 1">
                  <!-- <span>解剖员文字规程</span> -->
                  <div v-for="(text, index) in text2" :key="index" style="margin-top: 15px;font-size: 20px;">{{ index +
                    1 }}、{{ text }}
                  </div>
                </div>
                <!-- 规章制度和规范操作规程 -->
                <div v-if="active1 === 2" style="overflow: auto;">
                  <!-- <span>规章制度和规范操作规程 </span> -->
                  <!-- <div v-for="(text, index) in text3" :key="index" style="margin-top: 15px">{{ text }}
                  </div> -->
                  <div style=" width: 100%;height: 60vh;">
                    <embed :src="RAR" type="application/pdf" width="100%" height="100%;">
                  </div>
                </div>
                <!-- 应急预案 -->
                <div v-if="active1 === 3" style="overflow: auto;">
                  <!-- <span>应急预案 </span> -->
                  <!-- <div v-for="(text, index) in text4" :key="index" style="margin-top: 15px">{{ text }}
                  </div> -->
                  <div style=" width: 100%;height: 60vh;">
                    <embed :src="EAP" type="application/pdf" width="100%" height="100%;">
                  </div>
                </div>
                <el-button v-if="active1 > 0" class="back-button" size="large" @click="back1" type="primary">
                  上一步
                </el-button>
                <el-button v-if="active1 < 4" class="next-button" size="large" @click="next1" type="primary">
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
              <el-steps :active="active2" finish-status="success" align-center style="margin-top: 20px">
                <el-step title="尸检操作原则"></el-step>
                <el-step title="解剖查验操作及病变检查程序"></el-step>
                <el-step title="脏器检查"></el-step>
                <el-step title="尸检标本的采集与留取规定"></el-step>
              </el-steps>
            </div>
            <div style="  display: flex;justify-content: center;align-items: flex-start; margin-top: 2vh;">
              <el-card class="card_container">
                <!--尸检操作原则 -->
                <div v-if="active2 === 0" class="center-container">
                  <el-card style="width: 45%;height: 55vh;margin-left: 40px;align-items: center;display: flex">
                    <img src="./image/sj.jpg" style="object-fit: cover; width: 100%; height: 100%;" alt="实验室生物安全">

                    <!-- <label>显示图片</label> -->
                  </el-card>
                  <el-card style="width: 45%;height: 55vh;margin-right: 40px;">
                    <!-- <label>尸检操作原则 </label> -->
                    <!-- <div v-for="(text, index) in text5" :key="index" style="margin-top: 15px">{{ text }}</div> -->
                    <div style=" width: 100%;height: 50vh;">
                      <embed :src="PM" type="application/pdf" width="100%" height="100%;">
                    </div>
                  </el-card>
                </div>
                <!-- 解剖查验操作及病变检查程序 -->
                <div v-if="active2 === 1">
                  <!-- <span>解剖查验操作及病变检查程序</span> -->
                  <!-- <div v-for="(text, index) in text6" :key="index" style="margin-top: 15px">{{ text }}
                  </div> -->
                  <div style=" width: 100%;height: 60vh;">
                    <embed :src="SampleSubmission" type="application/pdf" width="100%" height="100%;">
                  </div>
                </div>
                <!-- 脏器检查 -->
                <div v-if="active2 === 2">
                  <!-- <span>脏器检查</span> -->
                  <!-- <div v-for="(text, index) in text7" :key="index" style="margin-top: 15px">{{ text }}
                  </div> -->
                  <div style=" width: 100%;height: 60vh;">
                    <embed :src="OrganExamination" type="application/pdf" width="100%" height="100%;">
                  </div>
                </div>
                <!-- 尸检标本的采集与留取规定 -->
                <div v-if="active2 === 3">
                  <!-- <span>尸检标本的采集与留取规定</span> -->
                  <!-- <div v-for="(text, index) in text7" :key="index" style="margin-top: 15px">{{ text }}
                  </div> -->
                  <div style=" width: 100%;height: 60vh;">
                    <embed :src="PreservationGuidelines" type="application/pdf" width="100%" height="100%;">
                  </div>
                </div>




                <el-button v-if="active2 > -1" class="back-button" size="large" @click="back2" type="primary">
                  上一步
                </el-button>
                <el-button v-if="active2 < 4" class="next-button" size="large" @click="next2" type="primary">
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
              <el-steps :active="active3" finish-status="success" align-center style="margin-top: 20px">
                <el-step title="医疗废物处理原则"></el-step>
                <el-step title="解剖器械处理原则"></el-step>
                <el-step title="标本的处理原则"></el-step>
                <el-step title="尸检废弃物及污水处理原则"></el-step>
              </el-steps>
            </div>
            <div style="  display: flex;justify-content: center;align-items: flex-start; margin-top: 2vh;">
              <el-card class="card_container">
                <!--医疗废物处理原则 -->
                <div v-if="active3 === 0">
                  <!-- <span>医疗废物处理原则</span> -->
                  <!-- <div v-for="(text, index) in medicalWastePrinciples" :key="index" style="margin-top: 15px">{{ text }}
                  </div> -->
                  <div style=" width: 100%;height: 60vh;">
                    <embed :src="MWMP" type="application/pdf" width="100%" height="100%;">
                  </div>
                </div>
                <!-- 解剖器械处理原则 -->
                <div v-if="active3 === 1">
                  <!-- <span>解剖器械处理原则</span> -->
                  <!-- <div v-for="(text, index) in anatomicalInstrumentPrinciples" :key="index" style="margin-top: 15px">{{ text }}
                  </div> -->
                  <div style=" width: 100%;height: 60vh;">
                    <embed :src="ADP" type="application/pdf" width="100%" height="100%;">
                  </div>
                </div>
                <!-- 标本的处理原则 -->
                <div v-if="active3 === 2">
                  <!-- <span>标本的处理原则</span> -->
                  <!-- <div v-for="(text, index) in specimenHandlingPrinciples" :key="index" style="margin-top: 15px">{{ text }}
                  </div> -->
                  <div style=" width: 100%;height: 60vh;">
                    <embed :src="SPP" type="application/pdf" width="100%" height="100%;">
                  </div>
                </div>
                <!-- 尸检废弃物及污水处理原则 -->
                <div v-if="active3 === 3">
                  <!-- <span>尸检废弃物及污水处理原则</span> -->
                  <!-- <div v-for="(text, index) in autopsyWasteAndWastewaterPrinciples" :key="index" style="margin-top: 15px">{{ text }}
                  </div> -->
                  <div style=" width: 100%;height: 60vh;">
                    <embed :src="PMWTP" type="application/pdf" width="100%" height="100%;">
                  </div>
                </div>
                <el-button v-if="active3 > -1" class="back-button" size="large" @click="back3" type="primary">
                  上一步
                </el-button>
                <el-button v-if="active3 < 4" class="next-button" size="large" @click="next3" type="primary">
                  下一步
                </el-button>
                <!-- <el-button v-if="active2 === 3" class="exit-button" size="large" @click="back">
                  返回
                </el-button> -->
              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane label="尸检指标及采用的技术" name="fourth">
            <!-- 尸检操作步骤条 -->
            <div>
              <el-steps :active="active4" finish-status="success" align-center style="margin-top: 20px">
                <el-step title="标本形态学、病理学特征和分析技术"></el-step>
                <el-step title="数据的保存、分析和报告"></el-step>
              </el-steps>
            </div>
            <div style="  display: flex;justify-content: center;align-items: flex-start; margin-top: 2vh;">
              <el-card class="card_container">
                <!--标本形态学、病理学特征和分析技术 -->

                <div v-if="active4 === 0">
                  <div style="margin-left: 0;">
                    <el-button plain @click="PMSTDialogVisible = true">
                      查看说明
                    </el-button>
                  </div>
                  <div class="description">
                    <el-card class="text" style="margin:20px 20px 20px 50px;">
                      <label class="label" style="margin-left: 42%">待检测图片</label>
                      <el-divider></el-divider>
                      <div class="img">
                        <div v-show="showLabel" style="margin-left: 40%; margin-top:30%; color: darkgray;">
                          <label style="font:14px Extra Small">请上传需检测图片</label>
                        </div>
                        <img v-show="showImg" id="image-display" src="" style="height: 100%; width: 100%;">
                      </div>
                      <el-button type="primary" id="upload-button" @click="handleUpload" style="margin-left: 38%;margin-top: 3%">
                        上传检测图片
                        <input type="file" title="上传图片" id="upload-input" style="display:none" />
                      </el-button>
                    </el-card>
                    <el-card class="text" style="margin:20px 30px 20px 30px;">
                      <label class="label" style="margin-left: 42%; ">检测信息录入</label>
                      <el-divider></el-divider>
                      <div style="margin:0 30px;">
                        病理学特征描述：
                        <el-input placeholder="请输入病理学特征描述" type="textarea" style="display: block; margin:10px 0;" v-model="pathologicalFeatures" :autosize="{ minRows: 6, maxRows: 6 }"></el-input>
                      </div>
                      <div style="margin:10px 30px 0 30px;">
                        分析识别方法：
                        <div style="margin-top: 10px;">
                          <el-select v-model="method" placeholder="请选择分析技术">
                            <el-option v-for="(technique, index) in techniques" :key="index" :label="technique" :value="technique"></el-option>
                          </el-select>
                        </div>
                      </div>
                    </el-card>
                  </div>
                </div>

                <!-- 数据的保存、分析和报告 -->
                <div v-if="active4 === 1">
                  <label>显示报告</label>
                </div>

                <el-dialog v-model="PMSTDialogVisible" title="说明" width="800px" destroy-on-close draggable>
                  <div style=" width: 100%;height: 50vh;">
                    <embed src="PMST" type="application/pdf" width="100%" height="100%;">
                  </div>
                </el-dialog>

                <el-button v-if="active4 > -1" class="back-button" size="large" @click="back4" type="primary">
                  上一步
                </el-button>
                <el-button v-if="active4 < 2" class="next-button" size="large" @click="next4" type="primary">
                  下一步
                </el-button>
                <!-- <el-button v-if="active2 === 3" class="exit-button" size="large" @click="back">
                  返回
                </el-button> -->
              </el-card>
            </div>
          </el-tab-pane>
        </el-tabs>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { get } from "@/net";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import Sidebar from '../../components/sideBar/SideBar.vue';
import { Delete, RefreshRight, Search, Plus, Filter } from "@element-plus/icons-vue"
import { ElConfigProvider } from "element-plus";
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import ADP from './PDF/ADP.pdf';
import EAP from './PDF/EAP.pdf';
import LabRequirements from './PDF/LabRequirements.pdf';
import LSBR from './PDF/LSBR.pdf';
import LTA from './PDF/LTA.pdf';
import MWMP from './PDF/MWMP.pdf';
import OrganExamination from './PDF/OrganExamination.pdf';
import PM from './PDF/PM.pdf';
import ADPMSTP from './PDF/PMST.pdf';
import PMWTP from './PDF/PMWTP.pdf';
import PreservationGuidelines from './PDF/PreservationGuidelines.pdf';
import RAR from './PDF/RAR.pdf';
import readMe from './PDF/readMe.pdf';
import SamplePackagingAndStorage from './PDF/SamplePackagingAndStorage..pdf';
import SampleSubmission from './PDF/SampleSubmission.pdf';
import SPP from './PDF/SPP.pdf';


const selectedOption = ref(null)
const options = ref([
  {
    value: 'bacteria',
    label: '检测细菌核酸',
    method: '采用PCR方法进行细菌核酸检测。首先提取样本中的总RNA，然后进行逆转录生成cDNA，最后进行PCR扩增。',
    labRequirements: '实验室需要具备PCR仪器、离心机、显微镜等设备，以及RNA提取试剂盒、逆转录试剂盒、PCR试剂等。',
    labImage: '实验室图片URL',
    reagentInfo: '试剂需要存储在-20℃的冷冻环境中。在使用前需要进行适当的制备和预处理。',
    genomeInfo: '基因组测定的信息...',
    positiveStandard: '阳性判断标准为PCR产物在预期大小处有明显的条带，且对照阳性样本也同样有明显的条带。',
    positiveStandardImage: '阳性确定标准的图片URL',
    qualityControl: '质控的信息...'
  },
  {
    value: 'virus',
    label: '检测病毒核酸',
    method: '采用qPCR方法进行病毒核酸检测。首先提取样本中的总RNA，然后进行逆转录生成cDNA，最后进行qPCR扩增并实时监测荧光信号。',
    labRequirements: '实验室需要具备qPCR仪器、离心机等设备，以及RNA提取试剂盒、逆转录试剂盒、qPCR试剂等。',
    labImage: '实验室图片URL',
    reagentInfo: '试剂需要存储在-20℃的冷冻环境中。在使用前需要进行适当的制备和预处理。',
    genomeInfo: '基因组测定的信息...',
    positiveStandard: '阳性判断标准为qPCR的Ct值低于预设的阈值，且对照阳性样本的Ct值也低于阈值。',
    positiveStandardImage: '阳性确定标准的图片URL',
    qualityControl: '质控的信息...'
  },
  {
    value: 'toxin',
    label: '检测毒素',
    method: '采用ELISA方法进行毒素检测。首先准备好毒素特异性的抗体，然后将样本加入孔板中进行孵育，最后通过检测荧光信号来判断毒素的存在。',
    labRequirements: '实验室需要具备ELISA阅读器、离心机等设备，以及ELISA试剂盒等。',
    labImage: '实验室图片URL',
    reagentInfo: '试剂需要存储在4℃的冷藏环境中。在使用前需要进行适当的制备和预处理。',
    genomeInfo: '基因组测定的信息...',
    positiveStandard: '阳性判断标准为ELISA的OD值高于预设的阈值，且对照阳性样本的OD值也高于阈值。',
    positiveStandardImage: '阳性确定标准的图片URL',
    qualityControl: '质控的信息...'
  },
])

const activeName = ref('first')
const active0 = ref(0)
const active1 = ref(0)
const active2 = ref(0)
const active3 = ref(0)
const active4 = ref(0)
const description = ref('')
const activeIndex = ref('/identify1')
const showLabel = ref(true);
const showImg = ref(false);
const imageUrl = ref("");
const method = ref([])
const pathologicalFeatures = ref('')
const PMSTDialogVisible = ref(false)

const device = ref('尸检台、切片机、脱水机、吸引器、显微镜、照相设备、计量设备、消毒隔离设备、个人防护设备、病理组织取材工作台、储存和运送标本设备、尸体保存设施、污水和污物处理设施等。');

const text2 = ref([
  "医学背景：解剖人员需要具备法医学或临床医学背景，并且有解剖学、病理学或相关专业的知识和经验。",
  "专业培训：解剖人员需要接受专门的生物危险尸体解剖培训，包括解剖工作的技术操作、安全规程、个人防护措施等方面的培训。",
  "安全意识：解剖人员应具备良好的安全意识，了解生物危险因子的风险，并能够正确使用个人防护装备和消毒设备，以最大程度地减少对自身和他人的伤害。",
  "操作经验：解剖人员需要具备一定的解剖工作经验，熟悉解剖过程中的技术操作和注意事项，以确保解剖工作的准确性和安全性。",
  "持证资质：解剖人员需要持有法医鉴定职业资格证书，以证明其具备从事生物危险尸体解剖工作的资质和能力。参加尸检工作的人员限制在5个人以内，其中至少有二名具有副高级以上病理专业技术职务任职资格的医师，其中有一名具有正高级病理专业技术职务任职资格的医师作为主检人员。"
]);
const text3 = ref([
  "染病个体解剖查验规章制度：",
  "1. 染病个体解剖查验必须在指定的生物安全实验室内进行，确保生物风险的控制和防范。",
  "2. 解剖查验前，解剖员必须穿戴完整的个人防护装备，包括防护服、手套、口罩、防护眼镜等。",
  "3. 染病个体解剖查验应在专门的解剖台上进行，确保解剖过程的隔离和安全。",
  "4. 解剖员必须严格按照解剖顺序和操作流程进行，确保解剖查验的准确性和完整性。",
  "5. 解剖过程中产生的污物和废弃物必须妥善处理，按照规定的生物安全处理程序进行消毒和处置。",
  "6. 解剖查验结束后，解剖员必须彻底清洁和消毒解剖台及周围环境，确保实验室的卫生和安全。",
  "",
  "规范操作规程：",
  "1. 解剖员必须事先了解染病个体的病理特征和解剖要点，准备好所需的解剖器械和标本容器。",
  "2. 解剖员应戴上手套并进行手部消毒，确保手部卫生。",
  "3. 开始解剖前，解剖员应仔细检查个体外观，记录相关观察结果。",
  "4. 解剖员应按照解剖要点进行解剖操作，逐步取出和检查各组织器官。",
  "5. 解剖过程中应注意标本的完整性和准确性，避免损坏或混淆。",
  "6. 解剖结束后，解剖员应妥善保存和标记解剖所得的组织标本，记录相关信息。",
  "7. 解剖台和工具应进行彻底清洁和消毒，保持解剖环境的卫生和整洁。",
]);
const text4 = ref([
  "尸体解剖查验应急预案：",
  "1. 尸体解剖查验必须在指定的解剖室内进行，确保解剖过程的隔离和安全。",
  "2. 解剖室应配备应急设施和装备，包括紧急通讯设备、急救箱、防护装备等。",
  "3. 解剖员在解剖过程中发现具有传染性的疾病或其他异常情况时，应立即停止解剖，并按照应急预案进行处理。",
  "4. 在解剖过程中发生意外伤害或职业暴露时，解剖员应立即采取相应的急救措施，并报告相关部门。",
  "5. 解剖室应配备紧急疏散通道和紧急出口，并进行定期演练和检查，确保应急疏散的顺利进行。",
  "6. 解剖室内应设立明显的应急电话和求救标识，以便解剖员在紧急情况下能及时求助。",
  "",
  "职业暴露应急预案：",
  "1. 解剖员必须接受相关职业暴露防护培训，了解职业暴露的风险和预防措施。",
  "2. 解剖员应定期进行健康监测和体检，及时发现和处理职业暴露相关的健康问题。",
  "3. 在职业暴露事件发生时，解剖员应立即停止工作，并按照应急预案进行处理和报告。",
  "4. 解剖员应使用适当的个人防护装备，包括口罩、手套、防护眼镜等，减少职业暴露的风险。",
  "5. 解剖员应妥善处理和处置与职业暴露相关的污物和废弃物，按照规定的程序进行消毒和清理。",
  "6. 解剖员应及时报告职业暴露事件，并接受相关的医学检查和处置。",
]);
const text5 = ref([
  "尸检操作原则：",
  "1. 样本标记：在尸检过程中，将样本的相关信息（如采样日期、样本类型等）清晰地写在样本容器上，或者使用条形码标签进行标记。",
  "2. 填写送检单：每批送检的样本都应当有一份详细的送检单，包括样本的数量、类型、采样日期等信息。如果样本中可能存在生物危险因子，应当明确标注。",
  "3. 样本包装：将样本放在专门的样本运输箱中，确保在运输过程中不会发生泄漏或损坏。对于有感染风险的样本，应当遵循生物危险品的运输规定。",
  "4. 快速送检：为了保证样本的新鲜度和完整性，应当尽快将样本送至检测机构。如果需要长时间运输，可能需要使用冷链运输。",
]);
const text6 = ref([
  "解剖查验操作及病变检查程序：",
  "1. 解剖前准备：确保解剖室和工具的清洁和消毒，准备解剖所需的器械、标本容器和记录表格。",
  "2. 外观观察：对尸体进行外观观察，记录尸体的性别、年龄、身高、体型等信息，注意记录任何明显的异常。",
  "3. 解剖操作：按照解剖顺序和解剖要点逐步进行解剖操作，依次检查各个器官系统。",
  "   a. 骨骼系统：检查骨骼的完整性、畸形或骨折等。",
  "   b. 肌肉系统：观察肌肉的颜色、结构和异常情况。",
  "   c. 器官系统：逐个检查心脏、肺、肝、肾等器官的形态、大小、颜色和异常变化。",
  "   d. 消化系统：检查食道、胃、肠道等消化器官的病变情况。",
  "4. 病变检查：对发现的异常病变进行进一步的检查和描述。",
  "   a. 组织取样：在需要进一步病理学检查的情况下，取出病变组织样本进行病理学分析。",
  "   b. 标本处理：将病变组织样本进行固定、染色等处理，为后续的病理学检查做准备。",
  "   c. 病理学检查：将病变组织样本送至病理学实验室进行显微镜下的病理学检查和诊断。",
  "5. 记录和报告：将解剖查验过程中的观察结果、病变描述和病理学检查结果记录在解剖记录表格中，并撰写解剖报告。",
]);
const text7 = ref([
  "脏器检查规范：",
  "1. 呼吸系统检查：观察肺部的形态、大小、颜色和异常变化，检查气管、支气管和肺组织的病变情况。",
  "2. 消化系统检查：检查食道、胃、肠道等消化器官的形态、大小、颜色和异常变化，观察黏膜的病变情况。",
  "3. 免疫系统检查：检查淋巴结、脾脏、扁桃体等免疫器官的形态、大小、颜色和异常变化。",
  "4. 中枢神经系统检查：观察大脑、小脑和脊髓的形态、大小、颜色和异常变化，检查神经组织的病变情况。",
  "5. 心血管系统检查：检查心脏和血管的形态、大小、颜色和异常变化，观察心脏瓣膜和冠状动脉的病变情况。",
  "6. 内分泌系统检查：检查甲状腺、肾上腺、胰腺等内分泌器官的形态、大小、颜色和异常变化。",
  "7. 泌尿系统检查：观察肾脏、膀胱、尿道等泌尿器官的形态、大小、颜色和异常变化，检查肾小球和肾小管的病变情况。",
  "8. 生殖系统检查：检查生殖器官的形态、大小、颜色和异常变化，观察性腺和生殖道的病变情况。",
]);

const medicalWastePrinciples = ref([
  "医疗废物处理原则：",
  "1. 分类与分装：将医疗废物按照性质进行分类，并进行适当的分装，确保不同类型的废物可以得到正确的处理。",
  "2. 标识与标记：对每个分类的医疗废物进行明确的标识和标记，包括废物类型、危险性等信息，以确保安全处理。",
  "3. 储存与集中：将医疗废物储存在专门设计的容器中，并定期进行集中收集，避免交叉污染和环境污染。",
  "4. 处理与处置：根据医疗废物的性质和危险程度，采取合适的处理方式，如焚烧、消毒、灭菌等，确保废物得到安全处理。",
  "5. 监管与追踪：建立医疗废物处理的监管体系，追踪废物的产生、运输和最终处理过程，确保符合相关法规和标准。",
]);
const anatomicalInstrumentPrinciples = ref([
  "解剖器械处理原则：",
  "1. 分类与清洗：将解剖器械按照类型进行分类，并进行彻底的清洗，去除残留的组织、血液和其他污物。",
  "2. 消毒与灭菌：对清洗后的解剖器械进行适当的消毒或灭菌处理，以确保其无菌状态。",
  "3. 包装与贮存：将消毒或灭菌后的解剖器械进行适当的包装，以保持其无菌状态，并妥善贮存，防止受到污染。",
  "4. 使用与维护：在使用解剖器械时，应遵循正确的操作方法，确保其安全和有效。定期检查和维护解剖器械的状态，及时修理或更换损坏的器械。",
  "5. 处理与处置：当解剖器械不再可用或需要报废时，应按照规定的程序进行处理和处置，包括安全回收、焚烧或其他合适的方法。",
])
const specimenHandlingPrinciples = ref([
  "标本处理原则：",
  "1. 标记与标识：对每个标本进行明确的标记和标识，包括患者信息、采集日期、样本类型等，以确保标本的唯一性和溯源能力。",
  "2. 采集与保存：在采集标本时，遵循正确的采集方法和容器要求，确保标本的完整性和适当的保存条件。",
  "3. 运输与储存：在运输过程中，采取适当的包装和温度控制措施，保护标本不受损坏和污染。储存标本时，遵循指定的条件和时限。",
  "4. 处理与分析：按照标本类型和检测要求，进行适当的处理和前处理步骤，以及后续的分析和检测过程。",
  "5. 销毁与清理：针对不再需要保留的标本，按照规定的程序进行安全销毁或清理，以防止信息泄露和环境污染。",
]);
const autopsyWasteAndWastewaterPrinciples = ref([
  "尸检废弃物及污水处理原则：",
  "1. 分类与分装：将尸检废弃物按照性质进行分类，并进行适当的分装，如尸体组织、器官和液体废弃物等。",
  "2. 尸体处理：对尸体进行适当的处理，如冷藏或冷冻，以防止腐败和臭味的产生。",
  "3. 废弃物处理：根据废弃物的性质，采取适当的处理方式，如焚烧、消毒、灭菌等，确保无害化处理。",
  "4. 污水处理：将尸检过程中产生的污水进行合理的处理，如进行初步过滤、沉淀、消毒等步骤，确保排放符合环保要求。",
  "5. 安全防护：在处理尸检废弃物和污水时，必须严格遵守安全防护措施，包括穿戴个人防护装备、使用防护设施等。",
]);
const techniques = ref([
  "HE染色",
  "免疫组化染色",
  "电镜染色",
  "蛋白质分析",
  "DNA分析",
  "RNA分析"
]);
// 数据的保存
const dataManagement = ref([
  {
    title: "数据的保存",
    content: [
      "数据的保存是指将收集到的原始数据存储在合适的数据库或文件系统中，以确保数据的安全性和可访问性。",
      "常用的数据保存方式包括数据库存储、文件存储和云存储等。",
    ],
  },
]);

// 数据的分析
const dataAnalysis = ref([
  {
    title: "数据的分析",
    content: [
      "数据的分析是指对保存的数据进行处理和解释，以获取有用的信息和洞察力。",
      "数据分析可以包括统计分析、机器学习、数据挖掘等方法，以揭示数据中的模式、趋势和关联等。",
    ],
  },
]);

// 报告生成
const reportGeneration = ref([
  {
    title: "报告生成",
    content: [
      "报告生成是指基于数据分析的结果，生成结构化的报告或可视化展示，以便于理解和传达数据的发现和见解。",
      "常见的报告生成方式包括数据可视化、报告文档生成和交互式报告生成等。",
    ],
  },
]);

const handleSelect = (index) => {
  const router = useRouter();
  if (index === '1') {
    router.push('/identify0');
  } else if (index === '2') {
    router.push('/identify1');
  }
}
function handleUpload() {
  let imageDisplay = document.getElementById("image-display");
  let uploadInput = document.getElementById("upload-input");
  uploadInput.addEventListener("change", function (event) {
    let files = event.target.files; // 获取选择的文件列表
    if (files.length > 0) {
      let file = files[0]; // 获取第一个文件
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
  if (active1.value++ > 2) activeName.value = 'second'
}
const back1 = () => {
  if (active1.value-- < 0) active1.value = 0
}
const next2 = () => {
  if (active2.value++ > 2) activeName.value = 'third'
}
const back2 = () => {
  if (active2.value-- < 1) {
    active2.value = 0
    activeName.value = 'first'
    console.log(activeName.value)
  }
}
const next3 = () => {
  if (active3.value++ > 2) activeName.value = 'fourth'
}
const back3 = () => {
  if (active3.value-- < 1) {
    active3.value = 0
    activeName.value = 'second'
    console.log(activeName.value)
  }
}
const next4 = () => {
  if (active4.value++ > 3) active4.value = 'fourth'
}
const back4 = () => {
  if (active4.value-- < 1) {
    active4.value = 0
    activeName.value = 'third'
    console.log(activeName.value)
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

.styled-text {
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
  /* color: #333;
  background-color: #f5f5f5; */
  padding: 20px;
  /* border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
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

.active-link {
  font-weight: bold;
}

.search-card {
  width: 100%;
  /* background-color: aquamarine; */
  display: flex;
  justify-content: center;
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

.exit-button {
  bottom: 20px;
  right: 60px;
}


.text-center {
  display: flex;
  justify-content: center;
  height: 50px;
  align-items: center;
}

.mt-4 {
  margin-top: 1rem;
  height: 500px;
  /* background-color: aquamarine; */
}


.vertical-tabs {
  margin-left: 0;
}

.vertical-tabs :deep(.el-tabs__item) {
  font-size: 16px !important;
  margin-bottom: 20px !important;
  /* 改变这个值来改变字体大小 */
}



.text {
  height: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  border: 1.2px;
}

.label1 {
  font: 18px large;
  font-family: "PingFang SC";
  margin: 10px;
  display: block;
}

.img {
  height: 340px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  border: 1.2px solid;
  border-color: darkgray;
}

.prepare-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 10px;
  /* 上边界距离 */
}

.description {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin: 0px
}

.text {
  height: 520px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  border: 1.2px solid;
  border-color: darkgray;
}

.card_box {
  height: 85%;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0px 100px 0px 40px;
}
</style>
