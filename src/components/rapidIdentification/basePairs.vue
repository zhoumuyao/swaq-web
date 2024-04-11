<template>
  <!-- <div style="width: 100%;">
    <label style="font:16px Extra large">提交数据</label>
  </div> -->
  <div class="mainbody">
    <el-card class="box-card1">
      <span style="font:16px Extra large ">提交数据</span>
      <div class="text">
        <!-- 碱基输入 -->
        <el-input type="textarea" class="basepairsinput" :rows="10" placeholder="请输入碱基序列或者使用文件上传" v-model="textarea">
        </el-input>
        <!-- 文件上传 -->
        <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传excel文件，且不超过500kb</div>
        </el-upload>

      </div>
      <el-button type="primary" @click="submitbasePairs">提交</el-button>
    </el-card>
    <el-card class="box-card1">
      <span style="font:16px Extra large">碱基序列检测结果</span>
      <div class="item">
        <p>{{ basePairsresult }}</p>
      </div>
    </el-card>
  </div>

</template>

<script setup>
import { ref } from 'vue'

const textarea = ref("")

const basePairsresult = ref("这是肝癌碱基序列")

function submitbasePairs() {

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

.basepairsinput {
  margin-bottom: 20px;
}
</style>