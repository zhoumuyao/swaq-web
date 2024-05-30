<template>
  <div class="app">
    <div class="content">
      <div style="padding: 20px; border-bottom:solid 2px ; border-color: darkgray;">
        <label style="font: 20px Extra large;">查看案例</label>
      </div>
      <div class="container">
        <el-card class="card" :body-style="{ height: '95%', padding: '10px' }">
          <div style="margin: 30px;">
            <label class="font" style="font-size:21px">进行案件的查看</label>
          </div>
          <div>
            <el-table :data="tableData" style="width: 100%; ">
              <el-table-column prop="date" label="日期" width="180"></el-table-column>
              <el-table-column prop="time" label="时间" width="180"></el-table-column>
              <el-table-column label="地址">
                <el-table-column prop="longitude" label="经度"></el-table-column>
                <el-table-column prop="latitude" label="纬度"></el-table-column>
                <el-table-column prop="country" label="国家"></el-table-column>
                <el-table-column prop="province" label="省份"></el-table-column>
                <el-table-column prop="city" label="市区"></el-table-column>
                <el-table-column prop="description" label="详细地址"></el-table-column>
              </el-table-column>
              <el-table-column prop="view_details" label="查看详情">
                <template #default="{row}">
                  <el-button type="primary" size="small" @click="viewDetails(row.view_details)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-dialog title="预览文件" v-model="isViewPdf" :before-close="handleClose" width="80vw">
            <iframe :src="PDFsrc" frameborder="0" style="width: 75vw; height: 70vh"></iframe>
          </el-dialog>
        </el-card>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, reactive, onBeforeMount } from "vue";
import { get, post } from "@/net";

onBeforeMount(() => {
  post("/api/case/view_case", {}, (data) => {
    tableData.value = data;
    tableData.value.forEach(function (item) {
      item.view_details = "src/views/case_details.pdf";
    });
  });
});
const isViewPdf = ref(false);
const PDFsrc = ref("");

const tableData = ref([]);

// const tableData = reactive([

//   {
//     date: " ",
//     time: " ",
//     longitude: " ",
//     latitude: " ",
//     country: " ",
//     province: " ",
//     city: " ",
//     description: " ",
//     view_details: "src/views/risk/device_guide/PCR_condition_detectiver.pdf",
//   },
// ]);

const viewDetails = (view_details) => {
  isViewPdf.value = true;
  PDFsrc.value = view_details;
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
.container {
  height: 80%;
  padding: 3% 6%;
}
</style>