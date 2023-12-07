<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div>
        <!-- 检验鉴定模块-->
        <h2>生物危险因子采集和检测技术</h2>

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
                <div v-if="active1 === 0" class="center-container">
                  <el-card style="height: 55vh;width: 20vw;margin-left: 40px">
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
                    <!-- 循环遍历决策结果-->
                    <div v-for="(wupin, index) in wupin" :key="index" style="margin-top: 15px">{{ index + 1 }}、{{ wupin }}
                    </div>
                  </el-card>
                </div>
                <!-- 采样人员基本要求 -->
                <div v-if="active1 === 1">
                  <span>采样人员基本要求</span>
                  <div v-for="(text, index) in text1" :key="index" style="margin-top: 15px">{{ index + 1 }}、{{ text }}
                  </div>
                </div>
                <!-- 样本采样基本要求 -->
                <div v-if="active1 === 2">
                  <span>样本采样基本要求 </span>
                  <div v-for="(text, index) in text2" :key="index" style="margin-top: 15px">{{ index + 1 }}、{{ text }}
                  </div>
                </div>
                <!-- 采集样本种类 -->
                <div v-if="active1 === 3">
                  <span>采集样本种类 </span>
                  <div v-for="(text, index) in text3" :key="index" style="margin-top: 15px">{{ index + 1 }}、{{ text }}
                  </div>
                </div>
                <!-- 样本采集和处理 -->
                <div v-if="active1 === 4" style="display: block;">
                  <div class="search-card">
                    <el-form ref="form" :model="form" :inline="true">
                      <el-form-item label="样本种类：" style="width: 500px">
                        <el-input v-model="description" :autosize="{ minRows: 1, maxRows: 1 }" type="textarea" style="width: 500px;" placeholder="" />
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" :icon="Search" @click="handleSearch">一键查询</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="search-content">
                    <el-card style="width: 80vw;height: 50vh;">显示查询文字 : {{ description }}</el-card>
                  </div>
                  <div>

                  </div>
                </div>
                <!-- 样本包装和保存 -->
                <div v-if="active1 === 5" class="center-container">
                  <el-card style="width: 45%;height: 55vh;margin-left: 40px;display: flex;justify-content: center;">
                    <!-- <label>显示图片</label> -->
                    <img src="https://i2.sinaimg.cn/IT/2009/0302/20093281737.jpg" style="object-fit: cover; width: 100%; height: 100%;" alt="实验室生物安全">

                  </el-card>
                  <el-card style="width: 45%;height: 55vh;margin-right: 40px;">
                    <label>样本包装和保存</label>
                    <div v-for="(text, index) in text4" :key="index" style="margin-top: 15px">{{ index + 1 }}、{{ text }}
                    </div>
                  </el-card>
                </div>
                <!-- 标本送检 -->
                <div v-if="active1 === 6" class="center-container">
                  <el-card style="width: 45%;height: 55vh;margin-left: 40px;display: flex;justify-content: center;">
                    <!-- <label>显示图片</label> -->
                    <img src="https://img0.baidu.com/it/u=3154452766,2862523672&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500" style="object-fit: cover; width: 100%; height: 100%;" alt="实验室生物安全">

                  </el-card>
                  <el-card style="width: 45%;height: 55vh;margin-right: 40px;">
                    <label>标本送检</label>
                    <div v-for="(text, index) in text5" :key="index" style="margin-top: 15px">{{ index + 1 }}、{{ text }}</div>
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
                    <img src="https://img-qn.51miz.com/preview/photo/00/01/57/75/P-1577525-2920B238.jpg" style="object-fit: cover; width: 100%; height: 100%;" alt="实验室生物安全">

                    <!-- <label>显示图片</label> -->
                  </el-card>
                  <el-card style="width: 45%;height: 55vh;margin-right: 40px;">
                    <label>实验室活动生物安全要求 </label>
                    <div v-for="(text, index) in text6" :key="index" style="margin-top: 15px">{{ index + 1 }}、{{ text }}</div>
                  </el-card>
                </div>
                <!-- 检测人员要求 -->
                <div v-if="active2 === 1">
                  <span>样本采样基本要求</span>
                  <div v-for="(text, index) in text7" :key="index" style="margin-top: 15px">{{ index + 1 }}、{{ text }}
                  </div>
                </div>
                <!-- 检测方法 -->
                <div v-if="active2 === 2" style="">
                  <div class="text-center">
                    <span style="margin-right: 10px; font-size: 16px;">检测方法：</span>
                    <el-select v-model="selectedOption" placeholder="请选择">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item">
                      </el-option>
                    </el-select>
                  </div>

                  <div v-if="selectedOption" class="mt-4">
                    <el-tabs tab-position="left" class="vertical-tabs">
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
                    </el-tabs>
                  </div>
                </div>
                <el-button v-if="active2 > -1" class="back-button" size="large" @click="back2" type="primary">
                  上一步
                </el-button>
                <el-button v-if="active2 < 3" class="next-button" size="large" @click="next2" type="primary">
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
const description = ref('')

const text1 = ref([
  "健康状态：采样人员应该处于良好的健康状态，没有明显的传染病症状。这是为了降低其他人员的感染风险，并确保采样结果的准确性。",
  "培训和资质：采样人员应该接受过相关培训，并具备必要的资质和技能，以正确、安全地采集样本。这包括了解正确的采样技术、使用适当的工具和设备，以及遵循标准操作程序。",
  "防护措施：采样人员应该佩戴适当的个人防护装备，如口罩、手套、防护服等，以保护自身和被采样者免受潜在的感染风险。",
  "遵循规程：采样人员应该遵循相关的规程、指南和标准操作程序，以确保采样过程的一致性和质量控制。这包括采样时的正确操作步骤、样本标识和记录等。",
  "沟通和隐私保护：采样人员应该具备良好的沟通能力，能够与被采样者进行有效的交流，并尊重其隐私权。他们应该能够解答被采样者可能有的问题，并提供必要的信息和指导。"])
const text2 = ref([
  "采样应在适当的环境下进行：对于生物危险因子，采样环境应当是清洁、无污染的。如果可能，应当在生物安全柜中进行操作。",
  "采样工具：应使用无菌的器具进行采样，以防止样本被污染。工具的选择应当基于样本类型和采样环境。",
  "样本标记：每个样本应当被清晰地标记，包括采样日期、样本类型、来源等信息，以便于后续的样本管理和分析。",
  "样本存储：采集的样本应当立即进行适当的处理和存储，以保持其新鲜度和完整性。这可能需要特殊的存储条件，如低温冷藏或特定的介质。",
  "样本运输：如果样本需要送往其他地方进行检测，应当遵循适当的运输规定，确保样本的安全和完整。"
]);
const text3 = ref([
  "血液样本：广泛用于检测各种病毒、细菌、寄生虫等病原体，以及各种生物标志物。",
  "唾液样本：常用于病毒检测，如流感病毒、新冠病毒等。",
  "组织样本：可以提供病原体在宿主体内的分布和影响情况，常用于组织病理学研究。",
  "粪便样本：常用于消化道寄生虫、细菌等病原体的检测。",
  "尿液样本：常用于泌尿系统病原体的检测，也可用于一些生物标志物的检测。"
]);
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
const text7 = ref([
  "专业知识：检测人员应具备微生物学、生物化学或相关领域的专业知识，能够理解并执行生物危险因子的采集和检测任务。",
  "操作技能：检测人员需要具备实验室操作技能，包括样本的采集、保存、处理和检测。他们应该熟练掌握各种实验设备和技术。",
  "生物安全知识：检测人员应该了解生物危险因子的潜在风险，包括感染风险、毒性风险等，并知道如何通过个人防护装备、实验操作规程等方式来减小这些风险。",
  "紧急应对能力：在面对生物事故时，检测人员应该知道如何采取紧急措施，如隔离泄漏源、进行个人防护、报告事故等。",
  "持续学习：由于生物危险因子和检测技术的知识在不断更新，检测人员应该具有持续学习的能力，定期参加培训，获取最新的科学知识和技术信息。"
]);
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
  if (active2.value++ > 3) active2.value = 0
}
const back2 = () => {
  if (active2.value-- < 1) {
    active2.value = 0
    activeName.value = 'first'
    console.log(activeName.value)
  }
}
</script>



<style>
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

.demo-tabs .el-tabs__item {
  margin-left: 30px;
  font-size: 20px;
  /* 设置你想要的字体大小 */
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

.vertical-tabs .el-tabs__item {
  font-size: 15px !important;
  margin-bottom: 20px !important;
  /* 改变这个值来改变字体大小 */
}
</style>
