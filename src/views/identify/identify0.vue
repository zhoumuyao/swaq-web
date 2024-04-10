<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div>
        <!-- 检验鉴定模块-->
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          :router="true">
          <el-menu-item index="/identify0">生物危险因子采集和检测技术</el-menu-item>
          <el-menu-item index="/identify1">染病个体解剖查验</el-menu-item>
        </el-menu>
        <!-- <div style="display: flex;">
          <router-link to="/identify0">
            <h3>生物危险因子采集和检测技术</h3>
          </router-link>
          <router-link to="/identify1">
            <h3 style="margin-left: 20px;">染病个体解剖查验</h3>
          </router-link>
        </div> -->

        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="样本采集及运输" name="first">
            <!-- 样本采集及运输步骤条 -->
            <div>
              <el-steps :active="active1" finish-status="success" align-center style="margin-top: 20px">
                <el-step title="采集对象"></el-step>
                <el-step title="采样人员基本要求"></el-step>
                <el-step title="样本采样基本要求"></el-step>
                <el-step title="采集样本种类"></el-step>
                <el-step title="样本采集和处理"></el-step>
                <el-step title="样本包装和保存"></el-step>
                <el-step title="标本送检"></el-step>
              </el-steps>
            </div>
            <div style="  display: flex;justify-content: center;align-items: flex-start; margin-top: 2vh;">
              <el-card class="card_container">
                <!-- 采集对象 -->
                <div v-if="active1 === 0" class="">
                  <div v-for="(item, index) in Specimen" :key="index"
                    style="margin-top: 15px;;text-indent: 2em;font-size: 20px">{{ index + 1 }}、{{ item }}
                  </div>
                  <!-- <el-card style="height: 55vh;width: 20vw;margin-left: 40px">
                    可疑感染人员
                    <div v-for="(people, index) in people" :key="index" style="margin-top: 15px">{{ index + 1 }}、{{ people }}
                    </div>
                  </el-card>
                  <el-card style="height: 55vh;width: 20vw;">
                    待检测的人员
                    <div v-for="(people, index) in people2" :key="index" style="margin-top: 15px">{{ index + 1 }}、{{ people }}
                    </div>
                  </el-card>
                  <el-card style="height: 55vh;width: 20vw;margin-right: 40px">
                    污染物品
                    <div v-for="(wupin, index) in wupin" :key="index" style="margin-top: 15px">{{ index + 1 }}、{{ wupin }}
                    </div>
                  </el-card> -->
                </div>
                <!-- 采样人员基本要求 -->
                <div v-if="active1 === 1">
                  <!-- <span>采样人员基本要求</span> -->
                  <div style="margin-top: 15px;font-size: 20px;text-indent: 2em;">{{ text1 }}
                  </div>
                </div>
                <!-- 样本采样基本要求 -->
                <div v-if="active1 === 2">
                  <!-- <span>样本采样基本要求 </span> -->
                  <div style="font-size: 20px;text-indent: 2em">
                    针对确诊病例、可疑病例、密切接触者病例的采集，以及物品和环境监测的样本采集，都需要严格遵循特定的基本要求，以确保采集的样本安全、准确。以下是一般情况下的基本要求：</div>
                  <div v-for="(text, index) in text2" :key="index"
                    style="margin-top: 1px;text-indent: 2em;font-size: 20px">{{ index + 1 }}、{{ text }}
                  </div>
                  <div style="font-size: 20px;text-indent: 2em">
                    以上是一般情况下在生物危险现场采集各类样本时需要遵循的基本要求。针对具体病原体或疾病，可能会有一些特殊的要求，需要根据具体情况进行调整和遵循。</div>
                </div>
                <!-- 采集样本种类 -->
                <div v-if="active1 === 3">
                  <!-- <span style="font-size: 20px">采集样本种类 </span> -->
                  <div v-for="(text, index) in text3" :key="index" style="margin-top: 15px;font-size: 20px">{{ index + 1
                    }}、{{ text }}
                  </div>
                </div>
                <!-- 样本采集和处理 -->
                <div v-if="active1 === 4" style="display: block;">
                  <div class="search-card">
                    <el-form ref="form" :model="form" :inline="true">
                      <el-form-item label="样本种类：" style="width: 500px">
                        <!-- <el-input v-model="description" :autosize="{ minRows: 1, maxRows: 1 }" type="textarea" style="width: 500px;" placeholder="" /> -->
                        <el-select v-model="selectedSample" placeholder="请选择样本类型" style="width: 500px;">
                          <el-option v-for="sample in samples" :key="sample.type" :label="sample.type"
                            :value="sample.type">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <!-- <el-form-item>
                        <el-button type="primary" :icon="Search" @click="handleSearch">一键查询</el-button>
                      </el-form-item> -->
                    </el-form>
                  </div>
                  <div class="search-content">
                    <el-card style="width: 80vw;height: 50vh;">
                      <div v-if="selectedSample">
                        <h3>采集方法：</h3>
                        <p>{{ getSampleByType(selectedSample)?.collectionMethod }}</p>
                        <h3>处理方法：</h3>
                        <p>{{ getSampleByType(selectedSample)?.collectionMethod }}</p>
                      </div>
                    </el-card>
                  </div>
                  <div>

                  </div>
                </div>
                <!-- 样本包装和保存 -->
                <div v-if="active1 === 5" class="center-container">
                  <el-card style="width: 45%;height: 55vh;margin-left: 40px;display: flex;justify-content: center;">
                    <!-- <label>显示图片</label> -->
                    <img src="https://i2.sinaimg.cn/IT/2009/0302/20093281737.jpg"
                      style="object-fit: cover; width: 100%; height: 100%;" alt="实验室生物安全">

                  </el-card>
                  <el-card style="width: 45%;height: 55vh;margin-right: 40px;">

                    <!-- <label>样本包装和保存</label>
                    <div v-for="(text, index) in text4" :key="index" style="margin-top: 15px">{{ index + 1 }}、{{ text }}
                    </div> -->
                    <div style="width: 100%;height: 50vh;">
                      <embed src="src/views/identify/PDF/SamplePackagingAndStorage..pdf" type="application/pdf"
                        width="100%" height="100%">
                    </div>

                  </el-card>
                </div>
                <!-- 标本送检 -->
                <div v-if="active1 === 6" class="center-container">
                  <el-card style="width: 45%;height: 55vh;margin-left: 40px;display: flex;justify-content: center;">
                    <!-- <label>显示图片</label> -->
                    <img
                      src="https://img0.baidu.com/it/u=3154452766,2862523672&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500"
                      style="object-fit: cover; width: 100%; height: 100%;" alt="实验室生物安全">

                  </el-card>
                  <el-card style="width: 45%;height: 55vh;margin-right: 40px;">
                    <!-- <label>标本送检</label>
                    <div v-for="(text, index) in text5" :key="index" style="margin-top: 15px">{{ index + 1 }}、{{ text }}</div> -->
                    <div style="width: 100%;height: 50vh;">
                      <embed src="src/views/identify/PDF/SampleSubmission.pdf" type="application/pdf" width="100%"
                        height="100%">
                    </div>
                  </el-card>
                </div>
                <el-button v-if="active1 > 0" class="back-button" size="large" @click="back1" type="primary">
                  上一步
                </el-button>
                <el-button v-if="active1 < 8" class="next-button" size="large" @click="next1" type="primary">
                  下一步
                </el-button>
                <!-- <el-button v-if="active1 === 8" class="exit-button" size="large" @click="back">
                    返回
                  </el-button> -->

              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane label="实验室检测" name="second">
            <!-- 实验室检测步骤条 -->
            <div>
              <el-steps :active="active2" finish-status="success" align-center style="margin-top: 20px">
                <el-step title="实验室活动生物安全要求"></el-step>
                <el-step title="检测人员要求"></el-step>
                <el-step title="检测方法"></el-step>
              </el-steps>
            </div>
            <div style="  display: flex;justify-content: center;align-items: flex-start; margin-top: 2vh;">
              <el-card class="card_container">
                <!-- 实验室活动生物安全要求 -->
                <div v-if="active2 === 0" class="center-container">
                  <el-card style="width: 45%;height: 55vh;margin-left: 40px;align-items: center;display: flex">
                    <img src="https://img.cjyun.org/a/10135/202008/ba7b58cda32e5665521a5e97aedc706b.jpeg"
                      style="object-fit: cover; width: 100%; height: 100%;" alt="实验室生物安全">

                    <!-- <label>显示图片</label> -->
                  </el-card>
                  <el-card style="width: 45%;height: 55vh;margin-right: 40px;">
                    <!-- <label>实验室活动生物安全要求 </label>
                    <div v-for="(text, index) in text6" :key="index" style="margin-top: 15px">{{ index + 1 }}、{{ text }}</div> -->
                    <div style="width: 100%;height: 50vh;">
                      <embed src="src/views/identify/PDF/LSBR.pdf" type="application/pdf" width="100%" height="100%">
                    </div>
                  </el-card>
                </div>
                <!-- 检测人员要求 -->
                <div v-if="active2 === 1">
                  <!-- <span>样本采样基本要求</span> -->
                  <div style="margin-top: 15px;font-size: 20px;text-indent: 2em">{{ text7 }}
                  </div>
                </div>
                <!-- 检测方法 -->
                <div v-if="active2 === 2" style="">
                  <div style="margin-left: 0;">
                    <el-button plain @click="centerDialogVisible = true">
                      查看说明
                    </el-button>
                  </div>
                  <div class="text-center">


                    <span style="margin-right: 10px; font-size: 16px;">检测方法：</span>
                    <el-select v-model="selectedOption" placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item">
                      </el-option>
                    </el-select>
                    <!-- 毒素 -->
                    <span v-if="selectedOption.value === 'toxin'"
                      style="margin-left: 10px;margin-right: 10px; font-size: 16px;">毒素选择：</span>
                    <el-select v-if="selectedOption.value === 'toxin'" v-model="toxinselectedOption"
                      placeholder="请选择毒素">
                      <el-option v-for="toxin in toxin_list" :key="toxin" :label="toxin.label"
                        :value="toxin.value"></el-option>
                    </el-select>
                    <!-- 细菌 -->
                    <span v-if="selectedOption.value === 'bacteria'"
                      style="margin-left: 10px;margin-right: 10px; font-size: 16px;">细菌选择：</span>
                    <el-select v-if="selectedOption.value === 'bacteria'" v-model="bacteriaselectedOption"
                      placeholder="请选择细菌">
                      <el-option v-for="bacteria in bacteria_list" :key="bacteria" :label="bacteria.label"
                        :value="bacteria.value"></el-option>
                    </el-select>
                    <!-- 病毒 -->
                    <span v-if="selectedOption.value === 'virus'"
                      style="margin-left: 10px;margin-right: 10px; font-size: 16px;">病毒选择：</span>
                    <el-select v-if="selectedOption.value === 'virus'" v-model="virusselectedOption"
                      placeholder="请选择病毒">
                      <el-option v-for="virus in virus_list" :key="virus" :label="virus.label"
                        :value="virus.value"></el-option>
                    </el-select>
                  </div>

                  <div v-if="selectedOption" class="mt-4">
                    <div v-if="selectedOption.value === 'bacteria'" style="height: 100%;">
                      <div v-if="selectedOption.value === 'bacteria' && !(bacteriaselectedOption === '')"
                        style="height: 100%;">
                        <div style="height: 100%;display: flex; justify-content: center;align-items: center;">
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
                      </el-tabs> -->
                    </div>
                    <div v-if="selectedOption.value === 'virus'" style="height: 100%;">
                      <div v-if="selectedOption.value === 'virus' && !(virusselectedOption === '')"
                        style="height: 100%;">
                        <div style="height: 100%;display: flex; justify-content: center;align-items: center;">
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
                      </el-tabs> -->
                    </div>
                    <div
                      v-if="selectedOption.value === 'toxin' && !(toxinselectedOption === 'ricin') && !(toxinselectedOption === '')"
                      style="height: 100%;">
                      <div style="height: 100%;display: flex; justify-content: center; align-items: center;">
                        <span>暂无内容</span>
                      </div>
                    </div>

                    <div v-if="selectedOption.value === 'toxin' && toxinselectedOption === 'ricin'" class="mt-4"
                      style="  display: flex;">
                      <div style="width: 40%;height: 100%;display: flex; flex-direction: column;">
                        <div style="display: flex;justify-content: center;align-items: center;">
                          <img src="./image/1.jpg" alt="试剂图片"
                            style="max-width: 100%; max-height: 100%; object-fit: contain;">
                        </div>
                        <div style="display: flex;justify-content: center;align-items: center;">
                          <img src="./image/2.jpg" alt="试剂图片"
                            style="max-width: 100%; max-height: 100%; object-fit: contain;">
                        </div>
                      </div>
                      <div style=" width: 60%;height: 100%;">
                        <embed src="src/views/identify/PDF/readMe.pdf" type="application/pdf" width="100%"
                          height="100%;">
                      </div>
                    </div>

                  </div>

                  <el-dialog v-model="centerDialogVisible" title="说明" width="800px" destroy-on-close draggable>
                    <div style=" width: 100%;height: 50vh;">
                      <embed src="src/views/identify/PDF/LTA.pdf" type="application/pdf" width="100%" height="100%;">
                    </div>
                  </el-dialog>


                </div>
                <el-button v-if="active2 > -1" class="back-button" size="large" @click="back2" type="primary">
                  上一步
                </el-button>
                <el-button v-if="active2 < 3" class="next-button" size="large" @click="next2" type="primary">
                  下一步
                </el-button>

                <div v-if="active2 === 3">
                  <router-link to="/identify1">
                    <el-button class="next-button" size="large" type="primary">
                      跳转
                    </el-button>
                  </router-link>
                </div>
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



const toxin_list = [
  { value: 'botulinum', label: '肉毒毒素' },
  { value: 'ricin', label: '蓖麻毒素' },
  { value: 'tetrodotoxin', label: '石房蛤毒素' },
  { value: 'aconitine', label: '乌头碱' },
  { value: 'enterotoxin-b', label: '葡萄球菌肠毒素 B' }
]
const bacteria_list = [
  { value: 'yersinia-pestis', label: '鼠疫耶尔森菌' },
  { value: 'bacillus-anthracis', label: '炭疽芽胞杆菌' },
  { value: 'methicillin-resistant-staphylococcus-aureus', label: '耐甲氧西林金黄色葡萄球菌' },
  { value: 'drug-resistant-genes', label: '耐药基因' },
  { value: 'virulence-genes', label: '毒力基因' },
  { value: 'maker-genes', label: 'Maker基因' }
]
const virus_list = [
  { value: 'novel-coronavirus', label: '新型冠状病毒' },
  { value: 'influenza-virus', label: '流感病毒' },
  { value: 'adenovirus', label: '腺病毒' }
]
const toxinselectedOption = ref('')
const bacteriaselectedOption = ref('')
const virusselectedOption = ref('')
const selectedSample = ref(null)
const centerDialogVisible = ref(false)
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
const selectedOption = ref(options.value[2])
const activeName = ref('first')
const active0 = ref(0)
const active1 = ref(0)
const active2 = ref(0)
const description = ref('')
const activeIndex = ref('/identify0')


const Specimen = ref([
  "生物样本：可疑感染人员和需要检测的人员、组织、排泄物、呕吐物、分泌物、涂抹物。",
  "环境样本：可能被污染的环境或物品，如在突发公共卫生事件现场采集的水、空气、土壤、食品等。",
]);
const text1 = ref(
  "从事样本采集的技术人员应当经过生物安全、各种防护设备使用的技术培训并考核通过。同时需熟悉样本采集方法，熟练掌握样本采集操作流程。应严格按照操作流程进行采样，并按要求做好样本信息记录，确保样本质量符合要求，样本及相关信息可追溯。",
)
const text2 = ref([
  "保护人员安全：所有参与采集工作的人员必须穿戴适当的个人防护装备，包括防护服、口罩、手套、护目镜等。",
  "消毒和无菌操作：采集器材必须经过严格的消毒处理或使用无菌器材，以防止样本污染。同时采集现场和操作台面等必须进行彻底的清洁和消毒。",
  "采集流程标准化：采集操作流程必须标准化，确保每个样本的采集过程一致，减少误差。此外样本采集时应尽量避免空气污染和交叉感染。",
  "采样部位选择：根据疾病特点，选择合适的采样部位，例如咽拭子、鼻拭子、咳痰、血液等。",
  "样本标识和追踪：每个样本必须清晰样识，包括采集时间、采集地点、采集人员等信息，以确保样本的追溯性和准确性。",
  "样本运输和存储：采集后的样本必须妥善包装，并按照相关要求进行运输和存储，确保样本的完整性和稳定性。",
  "及时送检和处理：采集到的样本必须及时送检，并按照相应的处理流程进行处理，以确保能够得到准确的诊断结果，并及时采取相应的措施进行治疗或防控。",
  "监测样本采集要求：对于物品和环境监测的样本采集，应根据监测对象的特点和要求，选择合适的采样方法和器材，确保采集的样本具有代表性和准确性。"
]);
const text3 = ref([
  "上呼吸道样本：包括鼻拭子、咽拭子等。",
  "下呼吸道样本：深咳痰液、肺泡灌洗液、支气管灌洗液、呼吸道吸取物等。",
  "粪便样本：留取粪便样本约10克（花生大小），如果不便于留取粪便样本，可采集肛拭子。",
  "血液样本：采集抗凝血，采集量为3-5ml，建议使用含有EDTA抗凝剂的真空釆血管采集血液。",
  "血清样本：尽量采集急性期、恢复期双份血清。第一份血清应当尽早（最好在发病后7天内）采集，第二份血清应当在发病后第3～4周采集。采集量为3-5ml，建议使用无抗凝剂的真空采血管。血清样本主要用于抗体的测定，不进行核酸检测。",
  "尿样本：留取中段晨尿，采集量2～3ml。",
  "物体表面样本：从生物危险现场可能被污染的表面进行涂抹采集的样本，如墙壁、地板、家具、设备等。",
  "污水样本：根据海运口岸大型进口冷冻物品加工处理场所排水系统分布情况，重点选取污水排水口、内部管网汇集处、污水流向的下游或与市政管网的连接处等2～3处点位进行采样。"
]);
const samples = ref([
  {
    type: '鼻拭子',
    collectionMethod: '使用消毒后的拭子，沿下鼻道的底部向后缓缓深入，轻轻擦拭黏膜表面，确保充分接触并停留 15-30 秒以吸收分泌物。',
    processingMethod: '将拭子放入含有运输液的样本收集管中，封闭管盖，并确保标签清晰标识采样时间、地点等信息。严格按照标准化程序送检。'
  },
  {
    type: '口咽拭子',
    collectionMethod: '被采集人员头部微仰，嘴张大，并发“啊”音，露出两侧扁桃体，将拭子越过舌根，在被采集者两侧扁桃体稍微用力来回擦拭至少3次，然后再在咽后壁上下擦拭至少3次。',
    processingMethod: '将拭子放入含有运输液的样本收集管中，封闭管盖，并确保标签清晰标识采样时间、地点等信息。严格按照标准化程序送检。'
  },
  {
    type: '痰液',
    collectionMethod: '要求患者咳嗽深呼吸，将痰液从呼吸道中咳出，或者通过气管切开等方式直接采集。',
    processingMethod: '将痰液样本收集到无菌容器中，密封并标记清晰，避免交叉感染，并及时送检。'
  },
  {
    type: '粪便样本',
    collectionMethod: '挑取黄豆粒大小的便样本加至无菌容器中，轻轻吹吸3～5次，室温静置10分钟，以8000rpm离心5分钟，吸取上清液进行检测，避免污染。',
    processingMethod: '将粪便样本收集到无菌容器中，密封并标记清晰，避免交叉感染，并及时送检。'
  },
  {
    type: '血液样本',
    collectionMethod: '使用无菌注射器采集患者的静脉血样本。',
    processingMethod: '将血液样本装入含有EDTA抗凝剂的真空采血管中，轻轻倒置混合，防止凝血，然后密封并标记清晰，避免交叉感染，并及时送检。'
  },
  {
    type: '血清样本',
    collectionMethod: '同血液样本采集方法相同，但需要用真空负压采血管采集血液标本静置一段时间后进行离心分离，获取血清。',
    processingMethod: '将血清样本收集到干净的离心管中，密封并标记清晰，避免交叉感染，并及时送检。'
  },
  {
    type: '尿样本',
    collectionMethod: '使用无菌容器收集患者早晨第一次排尿的尿液样本。',
    processingMethod: '将尿液样本收集到无菌容器中，密封并标记清晰，避免交叉感染，并及时送检。'
  },
  {
    type: '物体表面样本',
    collectionMethod: '使用消毒后的拭子或采样棉签，从物体表面进行擦拭或拭取样本。',
    processingMethod: '将拭子或采样棉签放入含有运输液的样本收集管中，封闭管盖，并确保标签清晰标识采样时间、地点等信息。严格按照标准化程序送检。'
  }
])
const text4 = ref([
  "样本包装：采集的样本应该被放置在无菌的、有标签的样本容器中。依据样本的种类，可以选择不同的容器，如真空血管、试管、塑料瓶等。",
  "样本保存：采集后的样本应立即进行适当的保存，以防止其降解或变质。对于大多数的生物样本，需要在2-8℃的冷藏环境中保存。某些特殊的样本，如RNA，可能需要在更低的温度下保存。",
  "样本运输：如果样本需要送检，应当将其放在专门的样本运输箱中，并确保在运输过程中保持适当的温度。对于有感染风险的样本，还应当遵循生物危险品的运输规定。"
]);
const text5 = ref([
  "样本标记：将样本的相关信息（如采样日期、样本类型等）清晰地写在样本容器上，或者使用条形码标签。",
  "填写送检单：每批送检的样本都应当有一份详细的送检单，包括样本的数量、类型、采样日期等信息。如果样本中可能存在生物危险因子，应当明确标注。",
  "样本包装：将样本放在专门的样本运输箱中，确保在运输过程中不会发生泄漏或损坏。对于有感染风险的样本，应当遵循生物危险品的运输规定。",
  "快速送检：为了保证样本的新鲜度和完整性，应当尽快将样本送至检测机构。如果需要长时间运输，可能需要使用冷链运输。"
]);
const text6 = ref([
  "实验室人员必须接受生物安全培训，并了解他们可能面临的危害。",
  "所有实验室活动必须在生物安全柜内进行，以防止生物风险物质的扩散。",
  "实验室人员必须穿戴适当的个人防护装备，如实验服、防护眼镜、手套等。",
  "实验室必须定期进行消毒，以维持实验环境的清洁。",
  "实验室人员必须遵守实验室的规章制度，如禁止在实验室内饮食、禁止无目的的实验等。"
]);
const text7 = ref(
  "实验室检测技术人员应当具备实验室工作经历以及相关专业技术技能，接受过致病性病原相关检验检测技能培训。此外检测机构应当按照所开展检测项目及标本量配备实验室检测人员，以保证及时、高效完成检测和结果报告。",
);
const wupin = ref(['手套', '防护服', '实验室器皿', '实验室样本管'])
const people = ref(['张三', '李四'])
const people2 = ref(['王五'])

const next1 = () => {
  if (active1.value++ > 5) activeName.value = 'second'
}
const back1 = () => {
  if (active1.value-- < 0) active1.value = 0
}
const next2 = () => {
  if (active2.value++ > 5) active2.value = 0
  console.log(active2.value)
}
const back2 = () => {
  if (active2.value-- < 1) {
    active2.value = 0
    activeName.value = 'first'
    console.log(activeName.value)
  }
}


const getSampleByType = (selectedSampleType) => {
  return samples.value.find((sample) => sample.type === selectedSampleType);
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

.el-menu-demo :deep(.el-menu-item) {
  font-size: 20px;
}

.card_container {
  justify-content: center;
  height: 70vh;
  width: 80vw;
  position: relative;
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
  height: 5vh;
  align-items: center;
  /* background-color: antiquewhite; */
}

.mt-4 {
  margin-top: 1rem;
  height: 50vh;
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
</style>
