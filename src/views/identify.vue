<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div>
        <!--        检验鉴定模块-->
        <div class="search-container">
          <el-card class="search-card">
            <el-form ref="form" :model="form" :inline="true">
              <el-form-item label="">
                <el-upload class="upload-demo" drag action="" multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将现场图片拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10Mb</div>
                </el-upload>
              </el-form-item>
              <el-form-item label="文字描述：" style="width: 500px">
                <el-input v-model="description" :autosize="{ minRows: 4, maxRows: 5 }" type="textarea" style="width: 500px;" placeholder="" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :icon="Search" @click="handleSearch">一键查询</el-button>
              </el-form-item>

            </el-form>
          </el-card>
        </div>

        <div class="result-container">
          <el-card class="result-card">
            <div class="toolbar-wrapper" style="margin-bottom: 0">
              生物危险因子数据库
              <el-tooltip content="刷新表格">
                <el-button type="primary" :icon="RefreshRight" circle @click="Refresh"></el-button>
              </el-tooltip>
            </div>
            <div style=" display: flex;">
              <div style="width: 100px;">
                <el-button type="primary" :icon="Plus" @click="handleAdd">新增数据</el-button>
              </div>
              <div style=" display: flex;padding-left: 50px;text-align:center">
                <!-- <span style="margin: auto; ">选择日期</span> -->
                <el-config-provider :locale="zhCn">
                  <el-date-picker v-model="dataTime" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="defaultTime">
                  </el-date-picker>
                </el-config-provider>
                <el-select v-model="value" filterable placeholder="请选择" style="margin-left: 50px;">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <el-button type="primary" :icon="Filter" @click="handleselect" style="margin-left: 50px;">筛选</el-button>
              </div>
            </div>


            <div>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column fixed prop="name" label="名称" width="150" />
                <el-table-column prop="yjzxl" label="基因组序列" width="150" />
                <el-table-column prop="dnaxl" label="DNA与RNA序列" width="150" />
                <el-table-column prop="dbzxl" label="蛋白质序列" width="150" />
                <el-table-column prop="dbzjg" label="蛋白质结构" width="150" />
                <el-table-column prop="blxtz" label="病理学特征" width="150" />
                <el-table-column prop="lcbx" label="临床表现" width="150" />
                <el-table-column prop="sysjc" label="实验室检测" width="150" />
                <el-table-column fixed="right" label="操作" width="120">
                  <template #default>
                    <el-button link type="primary" size="small" @click="handleEdit">编辑</el-button>
                    <el-button link type="primary" size="small">导出</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

          </el-card>
        </div>

        <div class="anjian-container">
          <el-card class="anjian-card">
            <div class="toolbar-wrapper" style="margin-bottom: 0">
              案件数据库
              <el-tooltip content="刷新表格">
                <el-button type="primary" :icon="RefreshRight" circle @click="Refresh"></el-button>
              </el-tooltip>
            </div>
          </el-card>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { get } from "@/net";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import Sidebar from '../components/sideBar/SideBar.vue';
import { Delete, RefreshRight, Search, Plus, Filter } from "@element-plus/icons-vue"
import { ElConfigProvider } from "element-plus";
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const fileList = ref([])

const form = ref({
  description: '',
});
const description = ref('')
const dataTime = ref('')
const defaultTime = ref < [Date, Date] > ([
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59),
])

const handleSearch = () => {

}

const options = ref([
  {
    value: '选项1',
    label: '南京'
  }, {
    value: '选项2',
    label: '甘肃'
  }, {
    value: '选项3',
    label: '上海'
  }, {
    value: '选项4',
    label: '北京'
  }, {
    value: '选项5',
    label: '扬州'
  }
])
const value = ref('')

const tableData = [
  {
    "name": '',
    "yjzxl": '',
    "dnaxl": '',
    "dbzxl": '',
    "dbzjg": '',
    "blxtz": '',
    "lcbx": '',
    "sysjc": '',
  }
]
const handleClick = () => {
  console.log('click')
}


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

.search-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 2vh;
  /* 上边界距离 */
}

.result-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 2vh;
  /* 上边界距离 */
}

.anjian-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 2vh;
  /* 上边界距离 */
}

.search-card {
  justify-content: center;
  height: 20vh;
  width: 80vw;
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.result-card {
  justify-content: center;
  height: 40vh;
  width: 80vw;
}

.anjian-card {
  justify-content: center;
  height: 30vh;
  width: 80vw;
}
</style>
