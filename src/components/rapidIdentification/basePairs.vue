<template>
  <div style="width: 100%;">
    <label style="font:16px Extra large">提交数据</label>
  </div>
  <div class="mainbody">
    <el-card class="box-card1">
      <div class="text item">
        <!-- 碱基输入 -->
        <el-input type="textarea" :rows="5" placeholder="请输入碱基序列" v-model="textarea">
        </el-input>
        <!-- 文件上传 -->


      </div>
    </el-card>
    <el-card class="box-card1">
      <div class="text item">

      </div>
    </el-card>
  </div>

</template>

<script setup>
import { ref } from 'vue'

const textarea = ref("")

</script>


<style scoped>
.mainbody {
  margin-top: 10px;
  display: flex;
}

.text {
  font-size: 14px;
}

/* .item {
  padding: 18px 0;
} */

.box-card1 {

  height: 500px;
  margin-left: 10px;
  margin-right: 10px;
  flex: 1;
}

/* .box-card2 {
  margin-right: 10px;
  height: 500px;
  flex: 1;
} */
</style>