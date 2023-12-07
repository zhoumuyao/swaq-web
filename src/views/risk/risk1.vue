<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div style="padding: 20px; border-bottom:solid 2px ; border-color: darkgray;">
        <label style="font: 20px Extra large;">风险评估模块</label>
      </div>

      <div style="margin-left: 30px; margin-top: 30px;">
        <el-steps :active="1" finish-status="success" style="width: 50%; margin-left: 25%;">
          <el-step title="计划和准备"></el-step>
          <el-step title="风险识别"></el-step>
          <el-step title="风险分析"></el-step>
          <el-step title="风险评价"></el-step>
        </el-steps>
      </div>
      <el-card style="  margin-top: 10px;">
        <div class="description">
          <div style="margin:0px 40px 0 100px;">
            <label class="label">现场图片</label>
            <div class="img">
              <div v-show="showLabel" style="margin-left: 40%; margin-top: 45%; color: darkgray;">
                <label style="font:14px Extra Small">请上传现场图片</label>
              </div>
              <img v-show="showImg" id="image-display" src="" style="height: 100%; width: 100%;">
            </div>
          </div>
          <div style="margin:0px 100px 0 40px;">
            <label class="label">现场描述</label>
            <div class="text">
              <div style="margin:30px 30px 0 30px;">
                位置：<el-input placeholder="请输入地点" style="display: inline-block; width: 50%; " v-model="text"></el-input>
              </div>
              <div style="margin:10px 30px 0 30px;">
                状态描述：
                <el-input placeholder="请输入环境描述" type="textarea" style="display: block; margin:10px 0;" v-model="textarea1"
                  :autosize="{ minRows: 3, maxRows: 3 }"></el-input>
              </div>
              <div style="margin:10px 30px; display: grid; grid-template-columns: 1fr 1fr; grid-gap: 10px;">
                <div>
                  输入采样即检测结果：
                  <el-button type="primary" :icon="Plus" circle @click="addsample = true"></el-button>
                  <el-button type="primary" :icon="Check" circle @click="detect"></el-button>
                  <el-table :data="sample"
                    style="margin-top: 5px; width: 90%; height: 180px; border:solid 1.2px; border-color:#dcdfe6; border-radius: 4px">
                    <el-table-column prop="id" label="采样编号" width="" />
                    <el-table-column prop="name" label="采样名" width="" />
                  </el-table>
                </div>
                <div>
                  采样快速分析检测：
                  <el-table :data="dsample"
                    style="margin-top: 15px; width: 90%; height: 180px; border:solid 1.2px; border-color:#dcdfe6; border-radius: 4px">
                    <el-table-column prop="id" label="危险因子号" width="" />
                    <el-table-column prop="name" label="危险因子名" width="" />
                  </el-table>
                </div>
              </div>
              <div style="margin:10px 30px 0 30px;">
                风险识别方法：
                <div style="margin-top: 10px;">
                  <el-select v-model="method" placeholder="请选择评估程序方法">
                    <el-option label="生物危险因子检测技术" value="1" />
                    <el-option label="生物危险因子溯源技术" value="2" />
                    <el-option label="生物危险因子稳定同位素比对识别追踪技术" value="3" />
                    <el-option label="生物危险因子关联个体追踪技术" value="4" />
                  </el-select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-dialog v-model="addsample" title="选择风险评估人员" width="600px" draggable>
          <div style=" display: grid; grid-template-columns: 1fr 1fr; grid-gap: 30px;">
            <div>
              采样号：
              <el-input v-model="sampleid" placeholder="请输入采样号" style="margin-top: 10px;"></el-input>
            </div>
            <div>
              采样名：
              <el-input v-model="samplename" placeholder="请输入采样名" style="margin-top: 10px;"></el-input>
            </div>
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="addsample = false">取消</el-button>
              <el-button type="primary" @click="addSample">确认</el-button>
            </span>
          </template>
        </el-dialog>
      </el-card>
      <div style="margin-top: 30px; margin-left: 40%;">
        <el-button type="primary" style="margin-top: 12px;" id="upload-button" @click="handleUpload">
          上传现场图片
          <input type="file" title="上传图片" id="upload-input" style="display:none" />
        </el-button>
        <router-link :to="{ path: '/risk2', query: { img: imageUrl } }">
          <el-button type="primary" style="margin-top: 12px; margin-left: 80px;" @click="test">下一步</el-button>
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
import Sidebar from '../../components/sideBar/SideBar.vue';
import { ref } from 'vue';
import { Delete, RefreshRight, Search, Plus, Filter, Check } from "@element-plus/icons-vue"

const dsample = ref([{}]);
const samplename = ref("")
const sampleid = ref();
const addsample = ref(false);
const sample = ref([{}]);
const showImg = ref(false);
const imageUrl = ref("");
const showLabel = ref(true);
const textarea1 = ref("");
const textarea2 = ref("");
const text = ref("");
const method = ref([])

function detect(){
  
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

function addSample(){
  addsample.value = false;
  if(sampleid.value != null && samplename != ""){
    sample.value.push({id:sampleid.value, name:samplename.value});
  }
  sampleid.value = null
  samplename.value = "";
  console.log(sampleid.value)
}

function goToRisk3() {
  console.log("111")
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
  margin: 0px
}

#file {
  opacity: 0;
}

.img {
  height: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  border: 1.2px solid;
  border-color: darkgray;
}

.text {
  height: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  border: 1.2px solid;
  border-color: darkgray;
}

.label {
  font: 18px large;
  font-family: "PingFang SC";
  margin: 10px;
  display: block;
}
</style>
