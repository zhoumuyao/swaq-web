<template>
  <div>
    <div>
      <label style="font-size: 18px; margin-left: 10px;">提交数据</label>
      <label style="font-size: 18px; margin-left: 570px;">结果分析</label>
    </div>
    <div class="mainbody">
      <el-card class="box-card1">
        <!-- <span style="font:16px Extra large ">提交数据</span> -->
        <div class="text">
          <!-- 碱基输入 -->
          <el-input type="textarea" class="basepairsinput" :rows="5" placeholder="请输入碱基序列或者使用文件上传" v-model="textarea">
          </el-input>
          <!-- 文件上传 -->
          <el-upload ref="upload" class="upload-demo" drag
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" style="height: 100%; width: 100%;"
            limit="1" :file-list="fileList" :on-preview="handlePreview" :auto-upload="false">
            <el-icon size="60px">
              <UploadFilled />
            </el-icon>
            <div class="el-upload__text" style="font-size: 16px;">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip" style="font-size: 15px;">只能上传xls文件</div>
          </el-upload>

        </div>
        <el-button style="width: 80%;margin-left: 10%; height: 40px; font-size: 16px; margin-top: 5px;" type="primary "
          plain @click="submitbasePairs">提交</el-button>
      </el-card>
      <el-card class="box-card1">
        <div>
          <label style="font-size: 18px; margin-right: 5px;">检测结果：</label>
          <label v-if="isinspect" style="font-size: 18px;">{{ diseaseResult }}</label>
        </div>
        <div class="item">
          <div>
            <label style="font-size: 18px; margin-right: 5px;">结果碱基序列：</label>
          </div>
          <el-card class="box-card2">
            <!-- <div style="width: 500px;">
              <p class="resultShow" v-if="isinspect">{{ basePairsresult }}</p>
            </div> -->

            <div style="width: 500px;" class="resultShow" v-if="isinspect">
              {{ basePairsresult }}
            </div>

          </el-card>

        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UploadFilled, Delete, RefreshRight, Search, Plus, Filter } from "@element-plus/icons-vue"
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus';

const textarea = ref("")

const basePairsresult = ref("AGTCAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGTCAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGTCAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCT")

const diseaseResult = ref("肝癌")

const isinspect = ref(false)

const upload = ref<UploadInstance>()

const fileList = ref([]);

const handlePreview = () => {

}

function submitbasePairs() {
  isinspect.value = true;
  upload.value!.submit()
}

</script>


<style scoped>
.mainbody {
  margin-top: 5px;
  display: flex;
}

.text {
  margin-top: 5px;
  font-size: 14px;
}

.item {
  margin-top: 15px;
  font-size: medium;
}

.box-card1 {

  height: 500px;
  margin-left: 10px;
  margin-right: 10px;
  flex: 1;
}

.box-card2 {
  margin-top: 10px;
  height: 300px;
}

.basepairsinput {
  margin-bottom: 10px;
}

.resultShow {
  max-height: 15em;
  /* 5行文本的高度 */
  overflow: auto;
  /* 显示滚动条 */
  /* white-space: pre-wrap; */
  /* 允许长单词或 URL 地址换行到下一行 */
  word-wrap: break-word;
}
</style>