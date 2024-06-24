<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div style="padding: 20px; border-bottom:solid 2px ; border-color: darkgray;">
        <label style="font: 20px Extra large;">处置对象</label>
      </div>
      <div class="steps">
        <el-steps :active="1" finish-status="success" style="width: 50%; margin-left: 25%;">
          <el-step title="计划和准备"></el-step>
          <el-step title="风险识别"></el-step>
          <el-step title="风险评价"></el-step>
        </el-steps>
      </div>
      <div style="width: 100%;display: flex;justify-content: center;align-items: flex-start; ">
        <el-card
          :body-style="{ height: '75vh' }"
          style="margin: 10px; justify-content: center;position: relative; width: 80vw"
        >
          <div style="width: 100%;">
            <el-steps
              style="width:80%; height: 30px; margin-bottom: 20px"
              :active="step"
              finish-status="success"
              simple
            >
              <el-step title="选择处置对象" />
              <el-step title="填写相关信息" />
              <el-step title="采集对象" />
              <el-step title="采样人员基本要求" />
              <el-step title="样本采样基本要求" />
              <el-step title="采集样本种类" />
              <el-step title="样本采集和处理" />
            </el-steps>
          </div>
          <div v-show="!(isEpidemic || isItem || isPerson)">
            <div class="selectObject">
              <div class="object">
                <el-button class="objectBtn1" round plain type="info" @click="classPerson">
                  <div>
                    <div>
                      <el-icon size="80">
                        <UserFilled />
                      </el-icon>
                    </div>
                    <div style="margin-top: 30px;">
                      <label style="font: 30px Extra large;">人</label>
                    </div>
                  </div>
                </el-button>
              </div>
              <div class="object">
                <el-button class="objectBtn1" round plain type="info" @click="classItem">
                  <div>
                    <div>
                      <el-icon size="80">
                        <Folder />
                      </el-icon>
                    </div>
                    <div style="margin-top: 30px;">
                      <label style="font: 30px Extra large;">物证</label>
                    </div>
                  </div>
                </el-button>
              </div>
              <div class="object">
                <el-button class="objectBtn1" round plain type="info" @click="classEnviroment">
                  <div>
                    <div>
                      <el-icon size="80">
                        <Warning />
                      </el-icon>
                    </div>
                    <div style="margin-top: 30px;">
                      <label style="font: 30px Extra large;">疫源</label>
                    </div>
                  </div>
                </el-button>
              </div>
            </div>
            <div class="next-button">
              <div>
                <el-button
                  size="large"
                  type="primary"
                  style="width: 120px; margin-left: 10px"
                  @click="back"
                >上一步</el-button>
              </div>
            </div>
          </div>
          <div v-show="step == 1" style="height: 90%; margin: 10px; overflow:auto">
            <div style="display: grid; grid-template-columns: 1fr 1fr; height: 95%;">
              <div
                style=" box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); width: 90%;  margin-top: 3%;height: 93%;"
              >
                <el-image
                  src="https://img0.baidu.com/it/u=3154452766,2862523672&amp;fm=253&amp;fmt=auto&amp;app=138&amp;f=JPEG?w=667&amp;h=500"
                  style="width: 95%; height: 95%;margin: 2.5% 0 0 2.5%;"
                ></el-image>
              </div>
              <div
                style=" box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); width: 90%;  margin-top: 3%; height: 93%;"
              >
                <el-form
                  :model="form"
                  label-width="auto"
                  style="max-width: 600px;margin: 10px 0 0 20px; height: 95%;"
                  size="large"
                >
                  <el-form-item>
                    <label style="font-size: 16px;display: block; width: 200px;">采样种类：</label>
                    <div style="width: 800px;">
                      <el-select
                        v-model="form.type"
                        placeholder="请选择采样种类"
                        size="large"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="item in typeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <label style="font-size: 16px; display: inline-block; width: 200px;">采样内容：</label>
                    <el-input v-model="form.name" style="width: 800px;" placeholder="请输入采样内容名" />
                  </el-form-item>
                  <el-form-item>
                    <label style="font-size: 16px;display: inline-block; width: 100%;">快检方法：</label>
                    <div style="width: 800px;">
                      <el-select
                        v-model="form.method"
                        placeholder="请选择快检方法"
                        size="large"
                        style="width: 100%"
                      >
                        <el-option
                          v-for="item in methodOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <label style="font-size: 16px;display: inline-block; width: 100%;">采样要求：</label>
                    <el-input
                      v-model="form.require"
                      style="width: 800px"
                      :rows="6"
                      type="textarea"
                      placeholder="请输入要求"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>

            <div class="next-button">
              <div>
                <el-button
                  size="large"
                  type="primary"
                  style="width: 120px; margin-right: 20px"
                  @click="backStep"
                >上一步</el-button>
                <el-button
                  size="large"
                  type="primary"
                  style="width: 120px; margin-left: 10px"
                  @click="step = step + 1"
                >确认</el-button>
              </div>
            </div>
          </div>
          <div v-show="step == 2" class>
            <div
              v-for="(item, index) in Specimen"
              :key="index"
              style="margin-top: 15px;;text-indent: 2em;font-size: 20px"
            >{{ index + 1 }}、{{ item }}</div>
            <div class="next-button">
              <div>
                <el-button
                  size="large"
                  type="primary"
                  style="width: 120px; margin-right: 20px"
                  @click="step = step - 1"
                >上一步</el-button>
                <el-button
                  size="large"
                  type="primary"
                  style="width: 120px; margin-left: 10px"
                  @click="step = step + 1"
                >确认</el-button>
              </div>
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
            </el-card>-->
          </div>
          <!-- 采样人员基本要求 -->
          <div v-if="step == 3">
            <!-- <span>采样人员基本要求</span> -->
            <div style="margin-top: 15px;font-size: 20px;text-indent: 2em;">{{ text1 }}</div>
            <div class="next-button">
              <div>
                <el-button
                  size="large"
                  type="primary"
                  style="width: 120px; margin-right: 20px"
                  @click="step = step - 1"
                >上一步</el-button>
                <el-button
                  size="large"
                  type="primary"
                  style="width: 120px;margin-left: 10px"
                  @click="step = step + 1"
                >确认</el-button>
              </div>
            </div>
          </div>
          <!-- 样本采样基本要求 -->
          <div v-if="step == 4">
            <!-- <span>样本采样基本要求 </span> -->
            <div
              style="font-size: 20px;text-indent: 2em"
            >针对确诊病例、可疑病例、密切接触者病例的采集，以及物品和环境监测的样本采集，都需要严格遵循特定的基本要求，以确保采集的样本安全、准确。以下是一般情况下的基本要求：</div>
            <div
              v-for="(text, index) in text2"
              :key="index"
              style="margin-top: 1px;text-indent: 2em;font-size: 20px"
            >{{ index + 1 }}、{{ text }}</div>
            <div
              style="font-size: 20px;text-indent: 2em"
            >以上是一般情况下在生物危险现场采集各类样本时需要遵循的基本要求。针对具体病原体或疾病，可能会有一些特殊的要求，需要根据具体情况进行调整和遵循。</div>
            <div class="next-button">
              <div>
                <el-button
                  size="large"
                  type="primary"
                  style="width: 120px; margin-right: 20px"
                  @click="step = step - 1"
                >上一步</el-button>
                <el-button
                  size="large"
                  type="primary"
                  style="width: 120px;margin-left: 10px"
                  @click="step = step + 1"
                >确认</el-button>
              </div>
            </div>
          </div>
          <!-- 采集样本种类 -->
          <div v-if="step == 5">
            <!-- <span style="font-size: 20px">采集样本种类 </span> -->
            <div
              v-for="(text, index) in text3"
              :key="index"
              style="margin-top: 15px;font-size: 20px"
            >
              {{
              index + 1
              }}、{{ text }}
            </div>
            <div class="next-button">
              <div>
                <el-button
                  size="large"
                  type="primary"
                  style="width: 120px; margin-right: 20px"
                  @click="step = step - 1"
                >上一步</el-button>
                <el-button
                  size="large"
                  type="primary"
                  style="width: 120px; margin-left: 10px;"
                  @click="step = step + 1"
                >确认</el-button>
              </div>
            </div>
          </div>
          <!-- 样本采集和处理 -->
          <div v-if="step == 6" style="display: block;">
            <div class="search-card">
              <el-form ref="form" :model="form" :inline="true">
                <el-form-item label="样本种类：" style="width: 500px">
                  <!-- <el-input v-model="description" :autosize="{ minRows: 1, maxRows: 1 }" type="textarea" style="width: 500px;" placeholder="" /> -->
                  <el-select v-model="selectedSample" placeholder="请选择样本类型" style="width: 500px;">
                    <el-option
                      v-for="sample in filteredSamples"
                      :key="sample.type"
                      :label="sample.type"
                      :value="sample.type"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- <el-form-item>
                        <el-button type="primary" :icon="Search" @click="handleSearch">一键查询</el-button>
                </el-form-item>-->
              </el-form>
            </div>
            <div class="search-content">
              <el-card style="width: 100%;height: 50vh;">
                <div v-if="selectedSample">
                  <h3>采集方法：</h3>
                  <p>{{ getSampleByType(selectedSample)?.collectionMethod }}</p>
                  <h3>处理方法：</h3>
                  <p>{{ getSampleByType(selectedSample)?.processingMethod }}</p>
                </div>
              </el-card>
            </div>
            <div class="next-button">
              <el-button
                size="large"
                type="primary"
                style="width: 120px; margin-right: 20px"
                @click="step = step - 1"
              >上一步</el-button>
              <el-button
                size="large"
                type="primary"
                style="width: 120px; margin-left: 10px"
                @click="jumpAssessment"
              >确认</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { get, post } from "@/net";
import { ref, reactive, onMounted, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import Sidebar from "../../components/sideBar/SideBar.vue";
import { User, UserFilled, Folder, Warning } from "@element-plus/icons-vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import router from "@/router";

const filteredSamples = computed(() => {
  console.log(samples.value);
  console.log(form.type);
  return samples.value.filter((sample) => sample.kind == form.type);
});

onMounted(() => {
  if (id && back1) {
    post(
      "/api/risk/select_riskPlan",
      {
        id: id,
      },
      (data) => {
        console.log(data);
        form.type = String(data.sampleType);
        form.name = data.sampleContent;
        form.method = String(data.testMethod);
        form.require = data.sampleRequirement;
      }
    );
  }
});

const route = useRoute();
const id = route.query.id;
const back1 = route.query.back;

const selectedSample = ref(null);

const Specimen = ref([
  "生物样本：可疑感染人员和需要检测的人员、组织、排泄物、呕吐物、分泌物、涂抹物。",
  "环境样本：可能被污染的环境或物品，如在突发公共卫生事件现场采集的水、空气、土壤、食品等。",
]);
const text1 = ref(
  "从事样本采集的技术人员应当经过生物安全、各种防护设备使用的技术培训并考核通过。同时需熟悉样本采集方法，熟练掌握样本采集操作流程。应严格按照操作流程进行采样，并按要求做好样本信息记录，确保样本质量符合要求，样本及相关信息可追溯。"
);
const text2 = ref([
  "保护人员安全：所有参与采集工作的人员必须穿戴适当的个人防护装备，包括防护服、口罩、手套、护目镜等。",
  "消毒和无菌操作：采集器材必须经过严格的消毒处理或使用无菌器材，以防止样本污染。同时采集现场和操作台面等必须进行彻底的清洁和消毒。",
  "采集流程标准化：采集操作流程必须标准化，确保每个样本的采集过程一致，减少误差。此外样本采集时应尽量避免空气污染和交叉感染。",
  "采样部位选择：根据疾病特点，选择合适的采样部位，例如咽拭子、鼻拭子、咳痰、血液等。",
  "样本标识和追踪：每个样本必须清晰样识，包括采集时间、采集地点、采集人员等信息，以确保样本的追溯性和准确性。",
  "样本运输和存储：采集后的样本必须妥善包装，并按照相关要求进行运输和存储，确保样本的完整性和稳定性。",
  "及时送检和处理：采集到的样本必须及时送检，并按照相应的处理流程进行处理，以确保能够得到准确的诊断结果，并及时采取相应的措施进行治疗或防控。",
  "监测样本采集要求：对于物品和环境监测的样本采集，应根据监测对象的特点和要求，选择合适的采样方法和器材，确保采集的样本具有代表性和准确性。",
]);
const text3 = ref([
  "上呼吸道样本：包括鼻拭子、咽拭子等。",
  "下呼吸道样本：深咳痰液、肺泡灌洗液、支气管灌洗液、呼吸道吸取物等。",
  "粪便样本：留取粪便样本约10克（花生大小），如果不便于留取粪便样本，可采集肛拭子。",
  "血液样本：采集抗凝血，采集量为3-5ml，建议使用含有EDTA抗凝剂的真空釆血管采集血液。",
  "血清样本：尽量采集急性期、恢复期双份血清。第一份血清应当尽早（最好在发病后7天内）采集，第二份血清应当在发病后第3～4周采集。采集量为3-5ml，建议使用无抗凝剂的真空采血管。血清样本主要用于抗体的测定，不进行核酸检测。",
  "尿样本：留取中段晨尿，采集量2～3ml。",
  "物体表面样本：从生物危险现场可能被污染的表面进行涂抹采集的样本，如墙壁、地板、家具、设备等。",
  "污水样本：根据海运口岸大型进口冷冻物品加工处理场所排水系统分布情况，重点选取污水排水口、内部管网汇集处、污水流向的下游或与市政管网的连接处等2～3处点位进行采样。",
]);

const samples = ref([
  {
    type: "鼻拭子",
    kind: 3,
    collectionMethod:
      "使用消毒后的拭子，沿下鼻道的底部向后缓缓深入，轻轻擦拭黏膜表面，确保充分接触并停留 15-30 秒以吸收分泌物。",
    processingMethod:
      "将拭子放入含有运输液的样本收集管中，封闭管盖，并确保标签清晰标识采样时间、地点等信息。严格按照标准化程序送检。",
  },
  {
    type: "口咽拭子",
    kind: 3,
    collectionMethod:
      "被采集人员头部微仰，嘴张大，并发“啊”音，露出两侧扁桃体，将拭子越过舌根，在被采集者两侧扁桃体稍微用力来回擦拭至少3次，然后再在咽后壁上下擦拭至少3次。",
    processingMethod:
      "将拭子放入含有运输液的样本收集管中，封闭管盖，并确保标签清晰标识采样时间、地点等信息。严格按照标准化程序送检。",
  },
  {
    type: "痰液",
    kind: 3,
    collectionMethod:
      "要求患者咳嗽深呼吸，将痰液从呼吸道中咳出，或者通过气管切开等方式直接采集。",
    processingMethod:
      "将痰液样本收集到无菌容器中，密封并标记清晰，避免交叉感染，并及时送检。",
  },
  {
    type: "粪便样本",
    kind: 3,
    collectionMethod:
      "挑取黄豆粒大小的便样本加至无菌容器中，轻轻吹吸3～5次，室温静置10分钟，以8000rpm离心5分钟，吸取上清液进行检测，避免污染。",
    processingMethod:
      "将粪便样本收集到无菌容器中，密封并标记清晰，避免交叉感染，并及时送检。",
  },
  {
    type: "血液样本",
    kind: 3,
    collectionMethod: "使用无菌注射器采集患者的静脉血样本。",
    processingMethod:
      "将血液样本装入含有EDTA抗凝剂的真空采血管中，轻轻倒置混合，防止凝血，然后密封并标记清晰，避免交叉感染，并及时送检。",
  },
  {
    type: "血清样本",
    kind: 3,
    collectionMethod:
      "同血液样本采集方法相同，但需要用真空负压采血管采集血液标本静置一段时间后进行离心分离，获取血清。",
    processingMethod:
      "将血清样本收集到干净的离心管中，密封并标记清晰，避免交叉感染，并及时送检。",
  },
  {
    type: "尿样本",
    kind: 3,
    collectionMethod: "使用无菌容器收集患者早晨第一次排尿的尿液样本。",
    processingMethod:
      "将尿液样本收集到无菌容器中，密封并标记清晰，避免交叉感染，并及时送检。",
  },
  {
    type: "物体表面样本",
    kind: 1,
    collectionMethod:
      "使用消毒后的拭子或采样棉签，从物体表面进行擦拭或拭取样本。",
    processingMethod:
      "将拭子或采样棉签放入含有运输液的样本收集管中，封闭管盖，并确保标签清晰标识采样时间、地点等信息。严格按照标准化程序送检。",
  },
  {
    type: "污水样本",
    kind: 4,
    collectionMethod:
      "在污水排放口或处理设施附近进行现场取样。取样点应该代表所研究的区域，并且在不同时间和流量条件下进行多次采样以获取全面的数据。",
    processingMethod:
      "将污水样本置于4摄氏度以下的冰箱中，以减缓微生物和化学反应的速率，并确保样品在分析之前保持稳定。",
  },
  {
    type: "固体土壤样本",
    kind: 2,
    collectionMethod:
      " a. 使用土壤钻或土壤锄在采样点周围清除表层杂草和杂物。 b. 根据采样深度要求，使用锄头或勺子将土壤整齐地切割或挖取并放入采样袋或容器中。 c. 根据实验需要采集不同深度的土壤样本，通常分为表层土壤（0-15cm）、次表层土壤（15-30cm）等。",
    processingMethod:
      "将新鲜采集的土壤样本进行自然风干或者低温干燥，以去除土壤中的多余水分。通常在室温下晾晒即可，但需要注意避免阳光直射。",
  },
]);

const step = ref(0);
const isPerson = ref(false);
const isItem = ref(false);
const isEpidemic = ref(false);

const typeOptions = [
  {
    value: "1",
    label: "空气样品",
  },
  {
    value: "2",
    label: "表层土壤样品",
  },
  {
    value: "3",
    label: "动植物样品",
  },
  {
    value: "4",
    label: "现场水体样品",
  },
];

const methodOptions = [
  {
    value: "1",
    label: "生物信息快速检验",
  },
  {
    value: "2",
    label: "红外光谱快速检测",
  },
  {
    value: "3",
    label: "拉曼光谱快速检测",
  },
];

/**
 * 1 人 2 物证 3 役源
 */
const objectClass = ref(0);

const form = reactive({
  type: "",
  name: "",
  method: "",
  require: "",
});
const backStep = () => {
  step.value = 0;
  isPerson.value = false;
  isItem.value = false;
  isEpidemic.value = false;
};

const getSampleByType = (selectedSampleType) => {
  return samples.value.find((sample) => sample.type === selectedSampleType);
};

const classPerson = () => {
  isPerson.value = true;
  step.value = 1;
  objectClass.value = 1;
};

const classItem = () => {
  isItem.value = true;
  step.value = 1;
  objectClass.value = 2;
};

const classEnviroment = () => {
  isEpidemic.value = true;
  step.value = 1;
  objectClass.value = 3;
};

const back = () => {
  router.push({ path: "/risk", query: { id: id, back: 1 } });
};

const jumpAssessment = () => {
  step.value = 0;
  post(
    "/api/risk/update_riskIdentification",
    {
      id: id,
      objectClass: objectClass.value,
      sampleType: parseInt(form.type),
      sampleContent: form.name,
      testMethod: parseInt(form.method),
      sampleRequirement: form.require,
    },
    (data) => {
      console.log(data);
      router.push({ path: "/risk_assessment", query: { id: id } });
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
  margin-left: 200px;
  /* 与侧边栏宽度对应 */
  /* 添加其他样式，如内容区域的填充等 */
}

.label {
  font: 20px large;
  font-family: "PingFang SC";
  margin: 0 10px 20px 0;
  display: block;
}

.selectObject {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 120px 80px;
}

.object {
  height: 90%;
  text-align: center;
}

.objectBtn1 {
  width: 300px;
  height: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.objectBtn2 {
  width: 180px;
  height: 45px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.objectBtn3 {
  width: 180px;
  height: 45px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.steps {
  margin-left: 30px;
  margin-top: 30px;
}

.next-button {
  position: absolute;
  bottom: 2%;
  /* 距离底部的间距 */
  right: 5%;
  /* 距离右侧的间距 */
}

.search-card {
  width: 100%;
  /* background-color: aquamarine; */
  display: flex;
  justify-content: center;
}
</style>