<template>
    <div class="app">
        <!--    <sidebar></sidebar>-->
        <div class="content">
            <div style="padding: 20px; border-bottom:solid 2px ; border-color: darkgray;">
                <label style="font: 20px Extra large;">新建案件</label>
            </div>
            <div class="container">
                <el-card class="card" :body-style="{ height: '95%', padding: '0px' }">
                    <div style="margin: 40px;">
                        <label class="font" style="font-size:21px">进行案件的建立</label>
                    </div>
                    <div class="case_form">
                        <el-form :model="form" label-width="auto" size="large">
                            <el-form-item>
                                <label class="font" style="font-size:19px; color: #606266;">案件建立时间: </label>
                                <el-date-picker v-model="form.date" type="date" placeholder="选择日期" size="large"
                                    format="YYYY/MM/DD" value-format="YYYY-MM-DD" style="margin: 0 30px;" />
                                <el-time-picker v-model="form.time" placeholder="选择时间" size="large" format="HH:mm:ss"
                                    value-format="HH:mm:ss" />
                            </el-form-item>
                            <el-form-item style="margin-top: 30px;">
                                <div>
                                    <label class="font" style="font-size:19px; color: #606266;">案件建立地点: </label>
                                </div>
                                <div style="margin-top: 20px; width: 100%; padding: 10px; ">
                                    <label class="font" style="font-size:16px; color: #606266;">经度: </label>
                                    <el-input class="position" placeholder="请输入经度"
                                        v-model="form.position.longitude"></el-input>
                                    <label class="font" style="font-size:16px; color: #606266;">经度: </label>
                                    <el-input class="position" placeholder="请输入经度"
                                        v-model="form.position.latitude"></el-input>
                                    <label class="font" style="font-size:16px; color: #606266;">国家: </label>
                                    <el-input class="position" placeholder="请输入国家"
                                        v-model="form.position.country"></el-input>
                                    <label class="font" style="font-size:16px; color: #606266;">省份: </label>
                                    <el-input class="position" placeholder="请输入省份"
                                        v-model="form.position.province"></el-input>
                                    <label class="font" style="font-size:16px; color: #606266;">市区: </label>
                                    <el-input class="position" placeholder="请输入市区"
                                        v-model="form.position.urban"></el-input>
                                </div>
                                <div style="margin-top: 20px; width: 100%;padding: 10px; ">
                                    <div>
                                        <label class="font" style="font-size:16px; color: #606266;">具体位置描述: </label>
                                    </div>
                                    <el-input style="width: 90%; margin-top: 10px;" type="textarea"
                                        :autosize="{ minRows: 8, maxRows: 8 }" placeholder="请输入具体地点描述"
                                        v-model="form.position.description"></el-input>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                    <el-footer class="footer">
                        <div class="btn">
                            <el-button type="primary" size="large" @click="createCase">新建案件</el-button>
                        </div>
                    </el-footer>
                </el-card>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ref, reactive, onMounted } from 'vue';
import router from "@/router";
import { useRoute } from "vue-router";
import { post, get } from "@/net";



onMounted(() => {
});

const form = reactive({
    date: '',
    time: '',
    position: {
        longitude: '',
        latitude: '',
        country: '',
        province: '',
        urban: '',
        description: ''
    }
})

const createCase = () => {
    console.log(form)
    post('/api/case/create_case', {
        date: form.date,
        time: form.time,
        longitude: form.position.longitude,
        latitude: form.position.latitude,
        country: form.position.country,
        province: form.position.province,
        urban: form.position.urban,
        description: form.position.description
    }, (message) => {
        ElMessage.success("新建成功")
        router.push({ path: '/risk', query: { id: message } })
    }, (message) => {
        console.log(message)
        if (message == -1) {
            ElMessage.warning("请填写所有参数")
        } else {
            ElMessage.warning(message)
        }
    })
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

.container {
    height: 80%;
    padding: 3% 6%;
}

.card {
    height: 100%;
}

.font {
    font-family: PingFang SC;
    color: #303133;
}

.case_form {
    height: 80%;
    margin: 0 40px;
    margin-top: 30px;
}

.footer {
    height: 8%;
}

.btn {
    height: 100%;
    margin-left: 90%;
    display: flex;
    align-items: center;
}

.position {
    margin-left: 10px;
    margin-right: 20px;
    width: 12%;
}
</style>