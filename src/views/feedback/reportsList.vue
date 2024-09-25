<template>
  <div class="app">
    <div class="content">
      <div style="padding: 20px; border-bottom: solid 2px; border-color: darkgray;text-align: center">
        <label style="font: 20px Extra large; display: inline-block;">评价与反馈</label>
      </div>
      <el-card class="card_box">
        <div style="margin: 70px 50px 0 50px">
          <el-table :data="tableData" height="400" style="width: 100%">
            <el-table-column label="评分">
              <template #default="{ row }">
                <div class="feedback-text">{{ row.feedback }}</div>
              </template>
            </el-table-column>

            <!-- 评分列使用 el-rate -->
            <el-table-column label="评分" width="300">
              <template v-slot="scope">
                <el-rate
                    v-model="scope.row.rate"
                    disabled
                    style="margin-left: 0;"
                />
              </template>
            </el-table-column>

            <el-table-column prop="time" label="日期" width="200" />

            <el-table-column prop="more" label="详情" width="200">
              <template v-slot="scope">
                <el-link type="primary">查看报告</el-link>
              </template>
            </el-table-column>

          </el-table>
        </div>

        <!-- 切换页面-->
        <router-link :to="{path: '/feedback'}">
          <el-button class="previous-button" type="primary" size="large">
            上一步
          </el-button>
        </router-link>

        <router-link :to="{path: '/index'}">
          <el-button class="next-button" type="primary" size="large">
            结束
          </el-button>
        </router-link>
      </el-card>

    </div>


  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

const tableData = ref([]);

const fetchFeedbacks = async () => {
  try {
    const response = await axios.get('/api/feedback/showAll');  // 调用后端接口
    // console.log(response.data);
    tableData.value = response.data.sort((a, b) => b.id - a.id);  // 将数据赋值给表格

  } catch (error) {
    console.error('Error fetching feedbacks:', error);
  }
};

onMounted(() => {
  fetchFeedbacks();  // 组件挂载时调用数据获取方法
});
</script>

<style scoped>
.app {
  display: flex;
  height: 100vh;
}

.content {
  flex: 1;
  margin-left: 200px; /* 与侧边栏宽度对应 */
  /* 添加其他样式，如内容区域的填充等 */
}

.card_box{
  height:85%;
  overflow-y:auto;
  overflow-x:hidden;
  margin:40px 60px 0 40px;
}

.previous-button{
  position: fixed;
  bottom: 7%;
  left: 83%;
}

.next-button {
  position: fixed;
  bottom: 7%;
  right: 6%;
}

.feedback-text {
  width: 100%; /* 确保占满父元素宽度 */
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 用省略号表示溢出内容 */
}
</style>