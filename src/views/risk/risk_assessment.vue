<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div style="padding: 20px; border-bottom:solid 2px ; border-color: darkgray;">
        <label style="font: 20px Extra large;">风险评估模块</label>
      </div>
      <div style="margin-left: 30px; margin-top: 30px;">
        <el-steps :active="2" finish-status="success" style="width: 50%; margin-left: 25%;">
          <el-step title="计划和准备"></el-step>
          <el-step title="风险识别"></el-step>
          <el-step title="风险评价"></el-step>
        </el-steps>
      </div>
      <div class="prepare-container">
        <el-card class="reckon_risk">
          <div slot="header" class="clearfix">
            <span>风险评价</span>
            <div class="description">
              <el-card class="relation_to_risk">
                <div slot="header" class="jugehappentop">
                  <span>风险等级</span>
                </div>
                <div style="margin:20px 10px 0 10px">
                  <div class="text">
                    <el-table :data="tableData1" style="width: 100%;" type="selection">
                      <el-table-column prop="virue" label="等级" width="500" fixed="left"></el-table-column>
                      <el-table-column
                        label="确认等级"
                        width="200"
                        fixed="right"
                        prop="checked"
                        style="text-align: center;"
                      >
                        <template #default="{ row }">
                          <el-radio v-model="riskGradeRadio" :label="String(row.id)">
                            <label></label>
                          </el-radio>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </el-card>

              <el-card class="relation_to_risk">
                <div slot="header" class="jugehappentop">
                  <span>应急响应机制</span>
                </div>
                <div style="margin:20px 10px 0 10px">
                  <div class="text">
                    <el-table :data="tableData2" style="width: 100%" type="selection">
                      <el-table-column prop="place" label="地区" width="500" fixed="left"></el-table-column>
                      <el-table-column label="是否可能产生" width="200" fixed="right" prop="checked">
                        <template #default="{ row }">
                          <el-radio v-model="emergencyResponse" :label="String(row.id)">
                            <label></label>
                          </el-radio>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </el-card>
            </div>
            <div class="last_row">
              <el-card class="jugehappen">
                <div slot="header" class="jugehappentop">
                  <span>评估方案</span>
                </div>
                <el-radio-group v-model="radio">
                  <el-radio label="一级">现场处置</el-radio>
                  <el-radio label="二级">实验室处置</el-radio>
                  <el-radio label="三级">防护处置</el-radio>
                </el-radio-group>
              </el-card>
              <el-card>
                <!-- <label>实验室活动生物安全要求 </label>
                <div v-for="(text, index) in text6" :key="index" style="margin-top: 15px">{{ index + 1 }}、{{ text }}</div>-->
                <div style="width: 100%;height: 30vh;">
                  <embed
                    v-if="radio=='一级'"
                    :src="site"
                    type="application/pdf"
                    width="100%"
                    height="100%"
                  />
                  <embed
                    v-if="radio=='二级'"
                    :src="lab"
                    type="application/pdf"
                    width="100%"
                    height="100%"
                  />
                  <embed v-else :src="protective" type="application/pdf" width="100%" height="100%" />
                </div>
              </el-card>
            </div>
          </div>
          <div class="next-button" style="margin-left: 40%;">
            <el-button
              size="large"
              type="primary"
              style="margin-top: 10px; width: 120px;"
              @click="back"
            >上一步</el-button>
            <el-button
              size="large"
              type="primary"
              style="margin-top: 10px; ;margin-left: 30px;width: 120px;"
              @click="jumpHandle"
            >完成</el-button>
          </div>
        </el-card>
      </div>

      <!-- <div v-show="isWarning">
                <el-alert title="" type="error" center :closable="false" style="height: 50px; padding-bottom: 15px;">
                    <label style="font-size: 18px;">生物危险高风险事件</label>
                </el-alert>
                <div class="description">
                    <div style="margin:0 40px 0 40px">
                        <label class="label">生物危险因子：</label>
                        <div class="text">
                            <el-table
                                :data="tableData"
                                style="width: 100%">
                                <el-table-column
                                    prop="virue"
                                    label="病毒"
                                    width="360">
                                </el-table-column>
                                <el-table-column
                                    label="操作" 
                                    width="180">
                                    <template #default="{ row }">
                                        <el-button type="text" @click="() => watchResult(row.text)">查看</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div>
                        <label class="label">生物危险因子检测结果：</label>
                        <div class="text">
                            <label class="label">{{ textarea }}</label>
                        </div>
                    </div>
                </div>
                <div style="margin-left: 35%;">
                    <el-button type="primary" style="margin-top: 80px; width: 120px;height: 40px;" @click="dialogVisible = true">查看类似案件</el-button>
                    <router-link :to="{ path: '/risk' }">
                        <el-button type="primary" style="margin-top: 80px; width: 120px;height: 40px; margin-left: 10%;"
                            @click="next">完成</el-button>
                    </router-link>
                </div>
                <el-dialog title="类似生物案件" v-model="dialogVisible" width="60%">
                    <div class="description">
                        <div style="margin:0 10px;">
                            <label style="font-size: 15px; margin-bottom: 20px; display: block;">类似生物案件现场图：</label>
                            <el-carousel height="300px">
                                <el-carousel-item v-for="item in sceneImg" :key="item.id">
                                    <el-image :src="item.url" alt="" style="width: 100%; height:100%;"></el-image>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                        <div>
                            <label style="font-size: 15px; margin-bottom: 20px; display: block; margin-left: 10px;">类似生物案件信息：</label>
                            <div class="text" style="margin:0 10px; height:300px">
                                <label class="label" style="font-size: 12px;">{{ text0 }}</label>
                            </div>
                        </div>
                    </div>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogVisible = false" type="primary">关闭</el-button>
                        </span>
                    </template>
                </el-dialog>
            </div>
            <div v-show="isWarning == false">
                <el-alert title="" type="success" center :closable="false" style="height: 50px; padding-bottom: 15px;">
                    <label style="font-size: 18px;">常规案件</label>
                </el-alert>
                <label class="label" style="margin-left: 32%;">现场图片:</label>
                <div class="img1">
                    <img :src="$route.query.img" style="height: 100%; width: 100%;">
                </div>
                <div style="margin-left: 46%;">
                    <router-link :to="{ path: '/risk' }">
                        <el-button type="primary" style="margin-top: 30px; width: 120px;height: 40px;"
                            @click="next">完成</el-button>
                    </router-link>
                </div>
            </div>
            <div>

      </div>-->
    </div>
  </div>
</template>

<script setup>
import { get } from "@/net";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import Sidebar from "../../components/sideBar/SideBar.vue";
import { ref, onMounted } from "vue";
import router from "@/router";
import site from "./evaluation_plan/site_disposal_plan.pdf";
import lab from "./evaluation_plan/lab_disposal_plan.pdf";
import protective from "./evaluation_plan/protective_disposal_plan.pdf";

const route = useRoute();
const id = route.query.id;

const dialogVisible = ref(false);
const textarea = ref("");
const isWarning = ref(true);
const showImg = ref(false);
const imageUrl = ref("");
const showLabel = ref(true);
const text = ref("");

const radio1 = ref("一级");

const emergencyResponse = ref("1");
const riskGradeRadio = ref("1");
const radio = ref("二级");

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

const sceneImg = ref([
  {
    id: 1,
    url: "https://tse4-mm.cn.bing.net/th/id/OIP-C.NgX7GFkiFYK2hbUJNgQo7AHaFu?w=234&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    text: "",
  },
  {
    id: 2,
    url: "https://tse2-mm.cn.bing.net/th/id/OIP-C.lZ2XPNbWxwyoB-O9-sAS_AHaFS?w=254&h=182&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    text: "",
  },
]);

const text0 = ref(
  "根据患者描述，病人身体出现大范围红斑并伴随高热现象，并且家中三人都具有相似症状，判定具有传染性。当前季节为冬季，并且患者一家近期并未去过蚊虫多的草地，因此排除蚊虫叮咬。红斑症状已经持续2天，患者已经服用过氯雷他定片，没有缓解迹象，因此排除接触性皮炎。根据现场图片和患者描述，最有可能的是麻疹。麻疹是一种高度传染的疾病，由麻疹病毒引起。麻疹通常通过空气中的飞沫传播，患者常出现发热、咳嗽、流涕和皮疹等症状。在一些严重情况下，麻疹还可能导致严重的并发症，甚至危及生命。根据描述，患者出现了感冒症状后出现大量红斑并伴有发热和咳嗽，红斑已扩散至全身。患者家中的小孩也出现了发热、咳嗽和流鼻涕症状，头部和颈部出现少量红斑。另一成年人出现了咳嗽和流鼻涕症状。这些症状与麻疹相符。麻疹是一种由麻疹病毒引起的高度传染性疾病，最初的症状类似于感冒，包括发热、咳嗽、流鼻涕等，随后出现红斑，通常从头部开始，然后扩散至全身。麻疹病毒可以通过飞沫传播，因此家中其他成员也可能受到感染。麻疹是一种严重的疾病，可能导致并发症，包括肺炎和脑炎。建议立即就医，进行麻疹病毒检测以确认诊断，并接受相应的治疗。同时，家庭其他成员也应该接受疫苗接种或其他预防措施以避免传播。"
);

const tableData = ref([
  {
    virue: "鼠疫",
    text: "鼠疫是一种由鼠疫菌引起的传染病，主要通过啮齿动物（如老鼠）传播给人类。鼠疫菌属于细菌，主要存在于某些地区的老鼠和跳蚤体内。鼠疫有三种形式：腺鼠疫、肺鼠疫和败血症型鼠疫。腺鼠疫是最常见的形式，症状包括淋巴结肿胀、发热和乏力。肺鼠疫是最严重的形式，症状包括高热、咳嗽、呼吸困难和咳血。败血症型鼠疫是最罕见但最致命的形式，症状包括高热、全身感染和多器官功能衰竭。鼠疫可以通过接触感染动物、跳蚤叮咬或呼吸飞沫传播给人类。早期诊断和治疗对于鼠疫的控制至关重要。常用的治疗方法包括使用抗生素，如链霉素和氟喹诺酮类药物。为了预防鼠疫的传播，可以采取以下措施：避免接触感染动物和其排泄物。保持环境清洁，减少老鼠和跳蚤的滋生地。使用防虫剂和驱鼠剂来控制老鼠和跳蚤的数量。提高个人卫生水平，勤洗手，避免与患鼠疫的人接触。如果你认为自己可能感染了鼠疫，应尽快就医并告知医生你的症状和可能的暴露史。及早诊断和治疗可以提高治愈率并减少传播风险。",
  },
  {
    virue: "霍乱",
    text: "霍乱是一种由霍乱弧菌引起的急性肠道传染病，主要通过饮用被霍乱弧菌污染的水或食物传播给人类。霍乱弧菌存在于污染的水源中，尤其是生活条件恶劣、卫生设施不完善的地区。霍乱的主要症状包括剧烈腹泻、呕吐、腹痛和脱水。腹泻通常是水样或米泔水样的，并且频率非常高。脱水是霍乱最严重的并发症，如果不及时处理，可能导致严重的健康问题甚至死亡。预防霍乱的关键是保持良好的卫生习惯和饮用安全的水源。以下是一些预防霍乱的措施：饮用安全的水源，如煮沸水或饮用瓶装水。避免食用生或未煮熟的食物，特别是海鲜和生蔬菜。注意个人卫生，勤洗手，特别是在处理食物和使用卫生间后。使用含氯的消毒剂处理饮用水和食物接触表面。接种霍乱疫苗，特别是在前往霍乱流行地区之前。如果你怀疑自己患上了霍乱，应尽快就医并告知医生你的症状和可能的暴露史。早期诊断和治疗可以帮助控制疾病的传播，并提供适当的液体补充和抗生素治疗以减轻症状。",
  },
  {
    virue: "麻疹",
    text: "麻疹是一种高度传染性的病毒性感染病，由麻疹病毒引起。它通过空气中的飞沫传播，当一个感染者咳嗽或打喷嚏时，其他人吸入含有病毒的飞沫就可能感染麻疹。麻疹的症状通常包括高热、咳嗽、流鼻涕、眼结膜炎和全身皮疹。皮疹通常从头部开始蔓延至全身，持续几天到一周的时间。麻疹病毒会影响免疫系统，使患者容易感染其他疾病，尤其是细菌性感染。麻疹是可以预防的，最有效的方法是接种麻疹疫苗。麻疹疫苗通常与腮腺炎和风疹疫苗合并在一起，形成MMR疫苗。根据世界卫生组织的推荐，儿童应在12-15个月龄接种第一剂麻疹疫苗，然后在4-6岁时接种第二剂。除了接种疫苗，以下措施也有助于预防麻疹的传播：避免与患有麻疹的人密切接触。勤洗手，特别是在接触到可能被病毒污染的表面后。避免触摸眼睛、鼻子和口腔，以减少病毒进入体内的机会。在公共场所或人群密集的地方，尽量保持良好的通风。如果你怀疑自己患上了麻疹，应尽快就医并告知医生你的症状和可能的暴露史。医生会进行相关检查和诊断，并提供适当的治疗和建议。同时，避免与他人密切接触，以减少病毒的传播。",
  },
  {
    virue: "传染性非典型肺炎",
    text: "传染性非典型肺炎，也被称为SARS（严重急性呼吸系统综合征），是一种由SARS冠状病毒引起的严重呼吸系统感染病。它在2002年至2003年期间爆发，导致全球范围内的疫情。传染性非典型肺炎的症状通常包括高热、咳嗽、呼吸急促、乏力和肌肉酸痛。一些患者还可能出现呼吸困难、胸痛、头痛和腹泻等症状。这种疾病的传播主要通过空气飞沫，当一个感染者咳嗽或打喷嚏时，其他人吸入含有病毒的飞沫就可能感染。为了控制传染性非典型肺炎的传播，以下措施被广泛采取：避免前往疫情爆发地区或与疑似感染者密切接触。勤洗手，特别是在接触到可能被病毒污染的表面后。使用口罩等个人防护装备，尤其是在人群密集的公共场所。保持良好的个人卫生习惯，包括避免触摸眼睛、鼻子和口腔。支持和遵循卫生部门的防控措施和指南。如果你怀疑自己患上了传染性非典型肺炎，应尽快就医并告知医生你的症状和可能的暴露史。医生会进行相关检查和诊断，并提供适当的治疗和建议。同时，避免与他人密切接触，以减少病毒的传播。值得注意的是，传染性非典型肺炎目前已经得到有效控制，并且全球卫生组织和各国卫生部门都采取了措施来预防和控制类似疫情的再次发生",
  },
]);

const watchResult = (text0) => {
  textarea.value = text0;
};

const watchSimilarcases = () => {
  this.dialogVisible = true;
};

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

const back = () => {
  router.push({ path: "/risk_identification", query: { id: id, back: 1 } });
};

const jumpHandle = () => {
  router.push({ path: "/infoInput", query: { id: id } });
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
  margin: 10px;
}

#file {
  opacity: 0;
}

.img1 {
  height: 500px;
  width: 500px;
  margin-left: 33%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  border: 1.2px solid;
  border-color: darkgray;
}

.text {
  height: 270px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  border: 1.2px solid;
  border-color: darkgray;
  margin: 0 50px 0 30px;
}

.label {
  font: 18px large;
  font-family: "PingFang SC";
  margin: 10px 30px;
  display: block;
}

.reckon_risk {
  position: relative;
  height: 80vh;
  width: 80vw;
}

.jugehappen {
  width: 100%;
}

.last_row {
  /* margin-left: 10px;
  margin-right: 10px; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin: 10px;
}

.relation_to_risk {
  height: 350px;
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