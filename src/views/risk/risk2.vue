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
          <el-step title="风险分析"></el-step>
          <el-step title="风险评价"></el-step>
        </el-steps>
      </div>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>风险分析</span>
          <div class="description">
            <el-card class="jugehappen">
              <div slot="header" class="jugehappentop">
                <span>风险发生的可能性分析</span>
              </div>
              <!-- <el-input class="inputtype" type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入内容" v-model="textarea1"></el-input> -->
              <div v-for="(text, index) in text1" :key="index" style="margin-top: 15px">{{ index + 1 }}、{{ text }}</div>
            </el-card>

            <el-card class="field_hazard">
              <div slot="header" class="field_hazardtop">
                <span>现场勘查工作产生危害分析</span>
              </div>
              <!-- <el-input class="inputtype" type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入内容" v-model="textarea2"></el-input>
               -->
               <div v-for="(text, index) in text2" :key="index" style="margin-top: 15px">{{ index + 1 }}、{{ text }}</div>
            </el-card>

            <el-card class="jugehappen">
              <div slot="header" class="jugehappentop">
                <span>附近居民生命健康影响分析</span>
              </div>
              <!-- <el-input class="inputtype" type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入内容" v-model="textarea3"></el-input> -->
              <div v-for="(text, index) in text3" :key="index" style="margin-top: 15px">{{ index + 1 }}、{{ text }}</div>
            </el-card>

            <el-card class="jugehappen">
              <div slot="header" class="jugehappentop">
                <span>生态环境危害分析</span>
              </div>
              <!-- <el-input class="inputtype" type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入内容" v-model="textarea4"></el-input>
               -->
               <div v-for="(text, index) in text4" :key="index" style="margin-top: 15px">{{ index + 1 }}、{{ text }}</div>
            </el-card>
          </div>
          <div class="last_row">
            <el-card class="jugehappen">
              <div slot="header" class="jugehappentop">
                <span>其他危害分析</span>
              </div>
              <!-- <el-input class="inputtype" type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入内容" v-model="textarea5"></el-input> 
              -->
              <div v-for="(text, index) in text5" :key="index" style="margin-top: 15px">{{ index + 1 }}、{{ text }}</div>
            </el-card>
          </div>
        </div>
      </el-card>

      <!-- <div class="description">
        <div style="margin:20px 40px 0 100px;">
          <label class="label">现场图片</label>
          <div class="img">
            <img id="image-display" :src="$route.query.img" style="height: 100%; width: 100%;">
          </div>
        </div>
        <div style="margin:20px 100px 0 40px">
          <label class="label">取样结果</label>
          <div class="text">
            <el-table
              :data="tableData1"
              style="width: 100%"
              type="selection">
              <el-table-column
                prop="virue"
                label="病毒"
                width="270"
                fixed="left">
              </el-table-column>
              <el-table-column
                label="是否选中" 
                width="180"
                fixed="right"
                prop="checked">
                <template #default="{ row }">
                  <el-checkbox v-model="row.checked"></el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        
      </div> -->
      
      <div style="margin-top: 40px; margin-left: 40%;">
        <router-link :to="{path: '/risk3', query: {img : imageUrl}}">
          <el-button type="primary" style="margin-top: 10px; margin-left: 80px;" @click="goToRisk3">下一步</el-button>
        </router-link>
      </div>
      <div>
        
      </div>
    </div>
   
  </div>
</template>

<script setup>
import { get } from "@/net";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
//import Sidebar from '../../components/sideBar/SideBar.vue';
import { ref } from 'vue';


const showImg = ref(false);
const imageUrl = ref("");
const showLabel = ref(true);
const textarea1 = ref("");
const textarea2 = ref("");
const textarea3 = ref("");
const textarea4 = ref("");
const textarea5 = ref("");
const text = ref("");
const text1 = ref([
  "风险事件的历史数据：通过分析过去发生的类似风险事件的频率和规模，判断此次风险发生的概率为65%。",
  "相关因素的影响：分析与风险事件相关的各种因素，包括外部环境、市场趋势、政策法规等，判断此次风险发生的概率为60%。",
  "现行控制措施的有效性：评估当前已经实施的风险控制措施对减少风险事件发生的影响，判断此次风险发生的概率为50%。",
  "未来趋势和变化：考虑未来可能出现的变化和趋势，判断此次风险发生的概率为50%。"])
const text2 = ref([
  "化学危害：现场勘查可能涉及到接触有害化学物质，如有毒气体、腐蚀性物质等，可能引起中毒或化学灼伤。",
  "身体伤害：在现场勘查中可能存在摔倒、碰撞、切割、烧伤等身体伤害风险，特别是在不安全的地形或环境中工作时更容易发生。",
  "物理危害：现场勘查可能存在受到振动、噪音、辐射等物理因素的危害，长期暴露可能导致职业病。",
  "生物危害：在某些环境中，现场勘查可能存在受到细菌、病毒、动植物等生物因素的危害，可能导致传染病或其他健康问题。",
  "安全设施不全：现场勘查可能存在缺乏安全设施、不稳定的工作平台、不安全的设备等问题，增加了工作人员的受伤风险。"])

const text3 = ref([
  "直接感染风险：如果生物安全事件涉及传染性疾病，附近居民可能面临直接感染的风险。需要评估病原体的传播途径、潜在感染人群以及可能的感染风险程度，以便采取相应的控制和预防措施，如隔离患病人群、提供疫苗接种等，以减少居民的感染风险。",
  "粉尘、气味和污染物暴露：某些生物安全事件可能导致粉尘、气味或其他污染物的释放，对附近居民的呼吸道和健康造成影响。需要评估可能的暴露途径、暴露浓度和暴露时间，采取相应的控制措施，如限制居民进入受污染区域、提供口罩等防护用具，以减少居民的暴露风险。",
  "心理健康影响：生物安全事件可能对附近居民的心理健康造成影响，特别是在面对疫情等紧急情况时。需要对居民的心理健康进行关注和支持，提供必要的心理健康教育和支持措施，以减少心理健康问题的发生。"])
const text4 = ref([
  "生物多样性损害：生物安全事件可能导致某些生物种群的大规模死亡或迁徙，对当地生态系统的物种多样性造成损害。需要评估受影响的生物种群以及可能的生态系统稳定性和功能损害，采取相应的保护措施，如野生动物救助和保护、生态系统修复等，以减少生物多样性损害。",
  "土壤和水体污染：某些生物安全事件可能导致有害物质的释放，对土壤和水体造成污染。需要评估可能的污染物种类、浓度和扩散范围，采取相应的污染防控和修复措施，如土壤修复、水体净化等，以减少土壤和水体污染对生态环境的影响。",
  "生态系统破坏：生物安全事件可能导致生态系统结构和功能的破坏，如湿地退化、森林破坏等。需要评估可能的生态系统破坏程度和影响范围，采取相应的保护和修复措施，如生态系统保护区设立、生态系统重建等，以减少生态系统破坏对生态环境的影响。"])
const text5 = ref([
  "经济危害：生物安全事件可能对农业、畜牧业、渔业、林业等产业造成严重影响，导致经济损失。",
  "动物危害：生物安全事件可能对家畜、野生动物和水生动物等造成危害，包括感染疾病、死亡、栖息地破坏等。"])
  const tableData1 = ref([{
            id: 1,
            virue: '鼠疫',
            checked: false,
          }, {
            id: 2,
            virue: '霍乱',
            checked: false,
          }, {
            id: 3,
            virue: '麻疹',
            checked: false,
          }, {
            id: 4,
            virue: '传染性非典型肺炎',
            checked: false,
          },{
            id: 5,
            virue: '猩红热',
            checked: false,
          },{
            id: 6,
            virue: '登革热',
            checked: false,
          }])


function updateChecked(row, value) {
  row.checked = value;
};

function handleUpload() {
  let imageDisplay = document.getElementById("image-display");
  let uploadInput = document.getElementById("upload-input");
  uploadInput.addEventListener("change", function(event) {
    let files = event.target.files; // 获取选择的文件列表
    if (files.length > 0) {
      let file = files[0]; // 获取第一个文件
      let fileReader = new FileReader();
      showImg.value = true;
      showLabel.value = false;
      fileReader.onload = function(e) {
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
};

function handleFileChange(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const imageUrl = e.target.result;
    // 在这里处理图片URL，可以将其保存到Vue组件的数据中或进行其他操作
    console.log(imageUrl);
  };

  reader.readAsDataURL(file);
};

function getPicture(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    this.imageSrc = reader.result;
    console.log(this.imageSrc)
  };
};

function selectFile() {
  this.$refs.fileInput.click();
};
</script>

<style scoped>
.app {
  display: flex;
}

.content {
  flex: 1;
  margin-left: 200px; /* 与侧边栏宽度对应 */
  /* 添加其他样式，如内容区域的填充等 */
}
.description{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin:10px
}

#file{
    opacity:0;
}

.img{
  height: 500px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px; 
  border: 1.2px solid;
  border-color: darkgray;
}

.text{
  height: 500px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px; 
  border: 1.2px solid;
  border-color: darkgray;
}
.label{
  font: 18px large;
  font-family: "PingFang SC";
  margin: 10px;
  display: block;
}
.box-card{
  margin-top: 10px;
  height: 1500px;
}

.jugehappen{
  height: 600px;
}
.field_hazard{
  height: 600px;
}
.last_row{
  margin-left: 10px;
  margin-right: 10px;
}
.inputtype{
  margin-top: 10px;
}

</style>
