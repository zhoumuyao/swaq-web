<!-- 修改为risk_identification -->
<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div
        style="padding: 20px; border-bottom: solid 2px; border-color: darkgray"
      >
        <label style="font: 20px Extra large">风险识别模块</label>
      </div>

      <div style="margin-left: 30px; margin-top: 30px">
        <el-steps
          :active="1"
          finish-status="success"
          style="width: 50%; margin-left: 25%"
        >
          <el-step title="计划和准备"></el-step>
          <el-step title="风险分析"></el-step>
          <el-step title="风险评价"></el-step>
        </el-steps>
      </div>
      <div class="prepare-container">
        <el-card class="box-card">
          <div slot="header">
            <span>风险分析</span>

            <div class="description">
              <el-card class="jugehappen">
                <div class="displaypicture">
                  <div class="jugehappentop" >
                    <div>
                      <span class="label">细胞名称:</span>
                    </div>
                    <div style="margin-top: 10px;">
                      <span v-if="showornot" class="label">{{ cellName }}</span>
                    </div>
                  </div>
                  <div v-if="showornot" style="text-align: center" >
                    <el-image
                      class="image-container"
                      v-if="cellType == 0"
                      :src="escherichiacoliImage"
                      :fit="fill"
                      style="height: 160px;"
                    ></el-image>
                    <el-image
                      class="image-container"
                      v-else
                      :src="COVIDImage"
                    ></el-image>
                  </div>
                  <!-- </div> -->
                </div>
              </el-card>
              <el-card class="jugehappen">
                <div slot="header" class="jugehappentop">
                  <span class="label">风险发生的可能性分析</span>
                </div>
                <!-- <el-input class="inputtype" type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入内容" v-model="textarea1"></el-input> -->
                <div
                  v-for="(text, index) in text[0]"
                  :key="index"
                  style="margin-top: 15px; font-size: medium"
                >
                  {{ index + 1 }}、{{ text }}
                </div>
              </el-card>
              <el-card class="jugehappen">
                <div slot="header" class="field_hazardtop">
                  <span class="label">现场勘查工作产生危害分析</span>
                </div>
                <!-- <el-input class="inputtype" type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入内容" v-model="textarea2"></el-input>
               -->
                <div
                  v-for="(text, index) in text[1]"
                  :key="index"
                  style="margin-top: 15px; font-size: medium"
                >
                  {{ index + 1 }}、{{ text }}
                </div>
              </el-card>

              <el-card class="jugehappen">
                <div slot="header" class="jugehappentop">
                  <span class="label">附近居民生命健康影响分析</span>
                </div>
                <!-- <el-input class="inputtype" type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入内容" v-model="textarea3"></el-input> -->
                <div
                  v-for="(text, index) in text[2]"
                  :key="index"
                  style="margin-top: 15px; font-size: medium"
                >
                  {{ index + 1 }}、{{ text }}
                </div>
              </el-card>

              <el-card class="jugehappen">
                <div slot="header" class="jugehappentop">
                  <span class="label">生态环境危害分析</span>
                </div>
                <!-- <el-input class="inputtype" type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入内容" v-model="textarea4"></el-input>
               -->
                <div
                  v-for="(text, index) in text[3]"
                  :key="index"
                  style="margin-top: 15px; font-size: medium"
                >
                  {{ index + 1 }}、{{ text }}
                </div>
              </el-card>
              <el-card class="jugehappen">
                <div slot="header" class="jugehappentop">
                  <span class="label">其他危害分析</span>
                </div>
                <!-- <el-input class="inputtype" type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入内容" v-model="textarea5"></el-input>
              -->
                <div
                  v-for="(text, index) in text[4]"
                  :key="index"
                  style="margin-top: 15px; font-size: medium"
                >
                  {{ index + 1 }}、{{ text }}
                </div>
              </el-card>
            </div>
            <!-- <div class="last_row">
              <el-card class="jugehappen">
                <div slot="header" class="jugehappentop">
                  <span class="label">其他危害分析</span>
                </div>
                <div v-for="(text, index) in text[4]" :key="index" style="margin-top: 15px; font-size: medium;">{{
          index + 1 }}、{{ text }}
                </div>
              </el-card>
            </div> -->
          </div>

          <div class="next-button" style="margin-top: 40px; margin-left: 40%">
            <router-link :to="{ path: '/risk0' }">
              <el-button
                size="large"
                type="primary"
                style="margin-top: 10px; margin-left: 10px; width: 120px"
                @click="beforeRouteLeave"
                >上一步</el-button
              >
            </router-link>
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
            <router-link
              :to="{ path: '/risk3', query: { cellType: cellType } }"
            >
              <el-button
                size="large"
                type="primary"
                style="margin-top: 10px; margin-left: 30px; width: 120px"
                @click="goToRisk3"
                >下一步</el-button
              >
            </router-link>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { get } from "@/net";
import { ElMessage } from "element-plus";
//import Sidebar from '../../components/sideBar/SideBar.vue';
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import escherichiacoliImage from "./image/escherichia_coli.jpg";
import COVIDImage from "./image/COVID.jpg";

const route = useRoute();
const cellType = route.query.cellType;
const type = ref(0);
const showImg = ref(false);

const showLabel = ref(true);

const showornot = ref(false);

// const src = ref([
//   "src/views/risk/image/escherichia_coli.jpg",
//   "src/views/risk/image/COVID.jpg",
// ]);

const cellName = ref("");

const text1 = ref([
  [
    "接触污染物：直接接触受污染的物体（如动物粪便、污水等）可能导致大肠杆菌感染，尤其是在缺乏卫生条件的环境中。",
    "医疗操作：由于接触不洁净的器械或环境，也存在感染大肠杆菌的风险。",
    "食品污染：大肠杆菌常常通过受污染的食品进行传播。",
  ],
  [
    "感染风险：在进行现场勘查时，如果不注意个人防护措施，如穿戴手套、口罩等，可能接触到受污染的物质或环境，增加感染大肠杆菌的风险。",
    "污染扩散：在现场勘查中可能会涉及到受污染的土壤、水源或空气等环境，如果没有采取有效的措施防止污染扩散，可能导致污染范围扩大，影响周边环境和居民健康。",
  ],
  [
    "感染风险：如果附近环境受到大肠杆菌的污染，居民接触到受污染的水源、食物或土壤等可能增加感染风险。",
    "消化道疾病：大肠杆菌的某些品系可能导致消化道感染，引起腹泻、呕吐、腹痛等症状。如果居民长期暴露在受污染环境中，可能增加患上消化道疾病的可能性。",
  ],
  [
    "水体污染：大肠杆菌是一种指示性细菌。高浓度的大肠杆菌在水体中存在可能对水质造成严重影响，增加水源供水的卫生风险，也可能对水生生物的生存和繁衍产生不利影响。",
    "土壤污染：在土壤中检测到大肠杆菌可能意味着土壤受到了污染。这种污染可能影响土壤的肥力和生态功能，对植物生长和土壤微生物群落产生负面影响。",
  ],
  [
    "食品安全问题：某些品系的大肠杆菌可能存在于食品中，尤其是生吃或未经充分加热处理的食物。如果人们摄入被污染的食品，可能引起食物中毒，导致腹泻、呕吐等症状。",
  ],
]);
const text2 = ref([
  [
    "接触传播：直接接触已感染者的呼吸道分泌物、唾液等可能导致病毒传播。",
    "空气传播：空气中的飞沫携带病毒，尤其是在密闭环境中长时间暴露于受感染者呼吸道排出的飞沫中，容易造成病毒传播",
    "病毒变异：病毒的变异可能会增加传播能力或减弱疫苗效果，从而增加病毒传播的风险",
  ],
  [
    "感染风险：在进行新冠病毒现场勘查时，工作人员有可能接触到受感染物体表面的病毒，增加感染的风险。尤其是在密闭空间、人员密集场所或疫情严重区域进行勘查时，感染风险更高。",
    "交叉感染：如果现场勘查工作人员没有采取必要的防护措施，易导致交叉感染，即工作人员之间相互传播病毒，增加感染范围和数量。",
  ],
  [
    "感染风险：如果附近存在新冠病例或密切接触者，附近居民可能面临感染风险。特别是在社区传播较广泛时，居民接触到受感染者或受感染表面物体的机会增加",
    "医疗资源紧张：如果疫情在附近蔓延，可能导致医疗资源紧张，包括医院床位、医护人员和防护物资等，影响居民及时就医和得到有效治疗",
  ],
  [
    "医疗废弃物增加：疫情期间，医院和检疫站等医疗机构产生的医疗废弃物量大增，如口罩、手套、防护服等，如果处理不当，可能导致环境污染",
    "塑料废弃物增加：疫情期间，个人防护物品的使用量大增，包括口罩和手套等塑料制品，如果不能妥善处理，会导致塑料废弃物增加，影响环境健康",
  ],
  [
    "经济影响：新冠病毒疫情对全球经济造成了重大冲击，包括制造业、服务业、旅游业等受到严重影响，导致失业率上升、企业倒闭等经济问题",
    "心理健康问题：疫情期间，由于社会隔离、恐慌情绪、焦虑等因素，很多人可能面临心理健康问题，如抑郁、焦虑、孤独等，需要及时关注和处理",
  ],
]);

const text = ref([]);

//临时
onMounted(() => {
  if (cellType == 0) {
    text.value = text1.value;
    showornot.value = true;
    cellName.value = "大肠杆菌";
  } else if (cellType == 1) {
    text.value = text2.value;
    showornot.value = true;
    cellName.value = "新冠病毒";
  } else {
  }
});

const tableData1 = ref([
  {
    id: 1,
    virue: "鼠疫",
    checked: false,
  },
  {
    id: 2,
    virue: "霍乱",
    checked: false,
  },
  {
    id: 3,
    virue: "麻疹",
    checked: false,
  },
  {
    id: 4,
    virue: "传染性非典型肺炎",
    checked: false,
  },
  {
    id: 5,
    virue: "猩红热",
    checked: false,
  },
  {
    id: 6,
    virue: "登革热",
    checked: false,
  },
]);

function updateChecked(row, value) {
  row.checked = value;
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

function openFileInput() {
  this.$refs.fileInput.click();
}

function handleFileChange(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const imageUrl = e.target.result;
    // 在这里处理图片URL，可以将其保存到Vue组件的数据中或进行其他操作
    console.log(imageUrl);
  };

  reader.readAsDataURL(file);
}

function getPicture(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    this.imageSrc = reader.result;
    console.log(this.imageSrc);
  };
}

function selectFile() {
  this.$refs.fileInput.click();
}

function beforeRouteLeave(to, from, next) {
  to.meta.keepAlive = true;
  next(0);
}
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
  margin: 10px;
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
  font-size: 18px;
}

.box-card {
  position: relative;
  height: 80vh;
  width: 80vw;
}

.jugehappen {
  font-size: smaller;
  height: 200px;
}

.jugehappen_top {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}

.displaypicture {
  display: grid;
  grid-template-columns: 3fr 5fr;
  grid-gap: 10px;
}

.field_hazard {
  height: 200px;
  font-size: smaller;
}

.first_row {
  margin: 10px;
}

.image-container {
  height: 190px;
}

.last_row {
  margin-left: 10px;
  margin-right: 10px;
}

.inputtype {
  margin-top: 10px;
}

.next-button {
  position: absolute;
  bottom: 15px;
  /* 距离底部的间距 */
  right: 20px;
  /* 距离右侧的间距 */
}

.prepare-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 10px;
  /* 上边界距离 */
}
</style>
