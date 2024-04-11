<template>
    <div class="app">
        <div class="content">
            <div style="padding: 20px; border-bottom:solid 2px ; border-color: darkgray;">
                <label style="font: 20px Extra large;">风险评估模块</label>
            </div>
            <div class="steps">
                <el-steps :active="1" finish-status="success" style="width: 50%; margin-left: 25%;">
                    <el-step title="计划和准备"></el-step>
                    <el-step title="快速鉴定"></el-step>
                    <el-step title="风险分析"></el-step>
                    <el-step title="风险评价"></el-step>
                </el-steps>
            </div>
            <div class="prepare-container">
                <el-card class="prepare-form">
                    <div style="width: 100%;">
                        <label class="label">快速鉴定:</label>
                    </div>
                    <div>
                        <label style="font-size: 16px; color: #606266;">选择快速鉴定方法:</label>
                        <el-select @change="methodChanged" v-model="identifyMethod" placeholder="选择快速鉴定方法" size="large"
                            style="width: 240px; margin-left: 10px;">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                    <el-card class="detectionCard">
                        <div v-if="isBasePairs == true">
                            <router-view v-slot="{ Component }">
                                <transition name="el-fade-in-linear" mode="out-in">
                                    <component :is="Component" style="height: 100%" />
                                </transition>
                            </router-view>
                        </div>
                        <div v-if="isInfrared == true" style="height: 500px">
                            <router-view v-slot="{ Component }">
                                <transition name="el-fade-in-linear" mode="out-in">
                                    <component :is="Component" style="height: 100%" />
                                </transition>
                            </router-view>
                        </div>
                        <div v-if="isRaman == true">
                            <router-view v-slot="{ Component }">
                                <transition name="el-fade-in-linear" mode="out-in">
                                    <component :is="Component" style="height: 100%" />
                                </transition>
                            </router-view>
                        </div>
                    </el-card>
                    <div class="next-button" style="margin-top: 30px; margin-left: 30%;">
                        <router-link :to="{ path: '/risk0', }">
                            <el-button size="large" type="primary"
                                style="margin-top: 12px; margin-left: 80px; width: 120px;" @click="test">上一步</el-button>
                        </router-link>
                        <router-link :to="{ path: '/risk2'}">
                            <el-button size="large" type="primary"
                                style="margin-top: 12px; margin-left: 30px; width: 120px;"
                                @click="test">进行风险分析</el-button>
                        </router-link>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script setup>
import { get } from "@/net";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import Sidebar from '../../components/sideBar/SideBar.vue';
import { ref, reactive } from 'vue';
import { Delete, RefreshRight, Search, Plus, Filter } from "@element-plus/icons-vue"
import router from "@/router/index.js";

const isBasePairs = ref(false);
const isInfrared = ref(false);
const isRaman = ref(false);
const identifyMethod = ref([]);
const options = [
    {
        value: 'basePairs',
        label: '碱基对检测',
    },
    {
        value: 'infrared',
        label: '红外检测',
    },
    {
        value: 'raman',
        label: '拉曼检测',
    }
]

const methodChanged = (value) => {
    if (value == 'basePairs') {
        isBasePairs.value = true;
        isInfrared.value = false;
        isRaman.value = false;
        router.push('/basePairs')
    }
    if (value == 'infrared') {
        isBasePairs.value = false;
        isInfrared.value = true;
        isRaman.value = false;
        router.push('/infrared')
    }
    if (value == 'raman') {
        isBasePairs.value = false;
        isInfrared.value = false;
        isRaman.value = true;
        router.push('/raman')
    }
}
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


.label {
    font: 18px large;
    font-family: "PingFang SC";
    margin: 0 10px 20px 0;
    color: #303133;
    display: block;
}

.prepare-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-top: 10px;
    /* 上边界距离 */
}

.prepare-form {
    height: 80vh;
    width: 80vw;
    position: relative;
}

.steps {
    margin-left: 30px;
    margin-top: 30px;
}

.detectionCard {
    position: relative;
    margin-top: 10px;
    height: 60vh;
    width: 100%;
}

.next-button {
    position: absolute;
    bottom: 15px;
    /* 距离底部的间距 */
    right: 20px;
    /* 距离右侧的间距 */
}
</style>