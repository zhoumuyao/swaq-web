<script setup lang="ts">
import { ElMessage } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus';
import { useRouter } from "vue-router";
import Sidebar from '../../components/sideBar/SideBar.vue';
import { ref, reactive } from 'vue';
import { UploadFilled, Delete, RefreshRight, Search, Plus, Filter } from "@element-plus/icons-vue"
const lowestPoint = ref(2107)
const highestPoint = ref(1637)
const accuracy = ref(95.44);
const isDetect = ref(false);
const fileList = ref([]);
const upload = ref<UploadInstance>()
const resultName = ref("大肠杆菌");
const handlePreview = () => {

}
const imgUrl = ref("src/views/risk/image/colibacillus.jpg")
const submitUpload = () => {
    for (var t = Date.now(); Date.now() - t <= 500;);
    isDetect.value = true;
    upload.value!.submit()
}
</script>

<template>
    <div style="display: grid; grid-template-columns: 3fr 5fr;grid-gap: 50px;">
        <div style="height: 100%;">
            <label style="font-size: 18px;">输入拉曼检测数据</label>
            <div style="margin-top: 10px;">
                <el-upload ref="upload" class="upload-demo" drag
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    style="height: 100%; width: 100%;" limit="1" :file-list="fileList" :on-preview="handlePreview"
                    :auto-upload="false">
                    <el-icon size="60px">
                        <UploadFilled />
                    </el-icon>
                    <div class="el-upload__text" style="font-size: 16px;">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip" style="font-size: 15px;">只能上传xls文件</div>
                </el-upload>
            </div>
            <div style="margin-top: 30px;">
                <el-button style="width: 80%;margin-left: 10%; height: 40px; font-size: 16px;" type="primary" plain
                    @click="submitUpload">开始检测</el-button>
            </div>

        </div>
        <div style="height: 100%;">
            <div>
                <label style="font-size: 18px;">快速检测结果：</label>
            </div>
            <el-card style="margin-top: 10px;height: 95%;">
                <div style="font-size: 18px;">检测结果名称：<label v-if="isDetect">{{ resultName }}</label></div>
                <div
                    style="display:grid; grid-template-columns: 1fr 1fr;grid-gap: 20px; margin-top: 10px; height: 400px;">
                    <div style="height: 100%;">
                        <div style="font-size: 18px;">结果波形图：</div>
                        <el-card style="height: 95%;margin-top: 10px;">
                            <el-image :src="imgUrl" fit="fill" style="height: 300px;" v-if="isDetect"></el-image>
                        </el-card>
                    </div>
                    <div style="height: 100%;">
                        <div style="font-size: 18px;">结果数据分析：</div>
                        <el-card style="height: 95%;margin-top: 10px;">
                            <div v-if="isDetect">
                                <div>
                                    <label style="font-size: 18px;">准确率：{{ accuracy }}%</label>
                                </div>
                                <div style="margin-top: 10px;">
                                    <label style="font-size: 18px;">最大值点：{{ highestPoint }}</label>
                                </div>
                                <div style="margin-top: 10px;">
                                    <label style="font-size: 18px;">最小值点：{{ lowestPoint }}</label>
                                </div>
                            </div>

                        </el-card>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<style scoped>
.el-icon-upload {
    font-size: 30px;
    margin: 4px 0 2px;
}
</style>