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
                    <el-step title="环境风险识别"></el-step>
                    <el-step title="生物因子快速取样"></el-step>
                    <el-step title="生物危险因子快速检验"></el-step>
                </el-steps>
            </div>
            <div v-show="isWarning">
                <el-alert title="" type="error" center :closable="false" style="height: 50px; padding-bottom: 15px;">
                    <label style="font-size: 18px;">生物危险高风险事件</label>
                </el-alert>
                <div class="description">
                    <div>
                        <label class="label">类似疾病图片：</label>
                        <el-carousel :interval="5000" arrow="always" style="width: 90%; margin:0 30px; height: 400px;">
                            <el-carousel-item v-for="item in sceneImg" :key="item.id" style="height: 400px;">
                                <el-image :src="item.url" style="width: 100%; height: 100%;"></el-image>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div>
                        <label class="label">类似疾病信息：</label>
                        <div class="text">
                            <label for=""></label>
                        </div>
                    </div>
                </div>
                <div style="margin-left: 46%;">
                    <el-button>查看</el-button>
                    <router-link :to="{ path: '/risk' }">
                        <el-button type="primary" style="margin-top: 100px; width: 120px;height: 40px;"
                            @click="next">完成</el-button>
                    </router-link>
                </div>
            </div>
            <div v-show="isWarning == false">
                <el-alert title="" type="success" center :closable="false" style="height: 50px; padding-bottom: 15px;">
                    <label style="font-size: 18px;">常规案件</label>
                </el-alert>
                <label class="label" style="margin-left: 32%;">现场图片:</label>
                <div class="img1">
                    <img :src="$route.query.img" style="height: 100%; width: 100%;">
                </div>
                <div style="margin-left: 46%;">
                    <router-link :to="{ path: '/risk' }">
                        <el-button type="primary" style="margin-top: 30px; width: 120px;height: 40px;"
                            @click="next">完成</el-button>
                    </router-link>
                </div>
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
import router from "../../router";

const isWarning = ref(true)
const showImg = ref(false);
const imageUrl = ref("");
const showLabel = ref(true);
const textarea1 = ref("");
const textarea2 = ref("");
const text = ref("");
const sceneImg = ref([{
        id:1,
        url:"https://tse4-mm.cn.bing.net/th/id/OIP-C.NgX7GFkiFYK2hbUJNgQo7AHaFu?w=234&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        text:""
    },{
        id: 2,
        url: "https://tse2-mm.cn.bing.net/th/id/OIP-C.lZ2XPNbWxwyoB-O9-sAS_AHaFS?w=254&h=182&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        text:""
    }
])


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
    margin-left: 200px;
    /* 与侧边栏宽度对应 */
    /* 添加其他样式，如内容区域的填充等 */
}

.description {
    display: grid;
    grid-template-columns: 4fr 6fr;
    grid-gap: 10px;
    margin: 0px
}

#file {
    opacity: 0;
}

.img1 {
    height: 500px;
    width: 500px;
    margin-left: 33%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-radius: 4px;
    border: 1.2px solid;
    border-color: darkgray;
}

.text {
    height: 400px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-radius: 4px;
    border: 1.2px solid;
    border-color: darkgray;
    margin: 0 50px 0 30px;
}

.label {
    font: 18px large;
    font-family: "PingFang SC";
    margin: 10px 30px;
    display: block;
}

</style>
  