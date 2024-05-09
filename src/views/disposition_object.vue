<template>
    <div class="app">
        <!--    <sidebar></sidebar>-->
        <div class="content">
            <router-view></router-view>
            <div style="padding: 20px; border-bottom:solid 2px ; border-color: darkgray;">
                <label style="font: 20px Extra large;">处置对象</label>
            </div>
            <div class="steps">
                <el-steps :active="step" finish-status="success" style="width: 50%; margin-left: 25%;">
                    <el-step title="选择处置对象"></el-step>
                    <el-step title="填写相关信息"></el-step>
                </el-steps>
            </div>
            <el-card :body-style="{height: '75vh'}" style="margin: 10px 100px;position: relative;">
                <div class="selectObject" v-show="!(isEnviroment || isItem || isPerson)">
                    <div class="object">
                        <el-button class="objectBtn1" round plain type="info" @click="classPerson">
                            <div>
                                <div>
                                    <el-icon size="80">
                                        <UserFilled />
                                    </el-icon>
                                </div>
                                <div style="margin-top: 30px;"><label style="font: 30px Extra large;">人</label></div>
                            </div>
                        </el-button>
                    </div>
                    <div class="object">
                        <el-button class="objectBtn1" round plain type="info" @click="classItem">
                            <div>
                                <div>
                                    <el-icon size="80">
                                        <Folder />
                                    </el-icon>
                                </div>
                                <div style="margin-top: 30px;"><label style="font: 30px Extra large;">物证</label></div>
                            </div>
                        </el-button>
                    </div>
                    <div class="object">
                        <el-button class="objectBtn1" round plain type="info" @click="classEnviroment">
                            <div>
                                <div>
                                    <el-icon size="80">
                                        <PictureFilled />
                                    </el-icon>
                                </div>
                                <div style="margin-top: 30px;"><label style="font: 30px Extra large;">环境</label></div>
                            </div>
                        </el-button>
                    </div>
                </div>
                <el-dialog title="选择处理对象" v-model="personView" style="height: 300px">
                    <div style=" display: grid; grid-template-columns: 1fr 1fr 1fr; margin:50px 80px 0 80px">
                        <div class="object">
                            <el-button class="objectBtn2" round plain type="info" @click="classJump(1)">
                                <div><label style="font: 20px Extra large;">染病个体</label></div>
                            </el-button>
                        </div>
                        <div class="object">
                            <el-button class="objectBtn2" round plain type="info" @click="classJump(2)">
                                <div><label style="font: 20px Extra large;">关联个体</label></div>
                            </el-button>
                        </div>
                        <div class="object">
                            <el-button class="objectBtn2" round plain type="info" @click="classJump(3)">
                                <div><label style="font: 20px Extra large;">尸体</label></div>
                            </el-button>
                        </div>
                        <el-dialog title="是否将尸体作为物证处理" v-model="corpseView"
                            style="height: 200px; width: 30%; margin-top: 200px;">
                            <div style="text-align: center; margin-top: 20px;">
                                <el-button type="primary" plain style="width: 120px; height: 40px;margin-right: 50px;"
                                    @click="judgeItem(true)">是</el-button>
                                <el-button type="danger" plain style="width: 120px; height: 40px;"
                                    @click="judgeItem(false)">否</el-button>
                            </div>
                        </el-dialog>
                    </div>
                </el-dialog>
                <el-dialog title="选择处理对象" v-model="itemView" style="height: 300px">
                    <div style=" display: grid; grid-template-columns: 1fr 1fr; margin:50px 120px 0 120px">
                        <div class="object">
                            <el-button class="objectBtn3" round plain type="info" @click="classJump(4)">
                                <div><label style="font: 20px Extra large;">其他物证</label></div>
                            </el-button>
                        </div>
                        <div class="object">
                            <el-button class="objectBtn3" round plain type="info" @click="classJump(5)">
                                <div><label style="font: 20px Extra large;">危险因子</label></div>
                            </el-button>
                        </div>
                        <el-dialog title="是否进行危险因子提取" v-model="riskfactorView"
                            style="height: 200px; width: 30%; margin-top: 200px;">
                            <div style="text-align: center; margin-top: 20px;">
                                <el-button type="primary" plain style="width: 120px; height: 40px;margin-right: 50px;"
                                    @click="extractRiskfactor(true)">是</el-button>
                                <el-button type="danger" plain style="width: 120px; height: 40px;"
                                    @click="extractRiskfactor(false)">否</el-button>
                            </div>
                        </el-dialog>
                    </div>
                </el-dialog>
                <div v-show="step == 1" style="height: 90%; margin: 10px; overflow:auto">
                    <div>
                        <label style="font-size: 20px;">填写处置对象相关信息：</label>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; height: 95%;">
                        <div
                            style=" box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); width: 90%;  margin-top: 3%;height: 93%;">
                            <el-image
                                src="https://img0.baidu.com/it/u=3154452766,2862523672&amp;fm=253&amp;fmt=auto&amp;app=138&amp;f=JPEG?w=667&amp;h=500"
                                style="width: 95%; height: 95%;margin: 2.5% 0 0 2.5%;"></el-image>
                        </div>
                        <div
                            style=" box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); width: 90%;  margin-top: 3%; height: 93%;">
                            <el-form :model="form" label-width="auto" style="max-width: 600px;margin: 10px 0 0 20px; height: 95%;"
                                size="large">
                                <el-form-item>
                                    <label style="font-size: 16px;display: inline-block; width: 200px;">处置对象号：</label>
                                    <el-input v-model="form.id" style="width: 800px;" placeholder="请输入处置对象号" />
                                </el-form-item>
                                <el-form-item>
                                    <label style="font-size: 16px; display: inline-block; width: 200px;">处置对象名：</label>
                                    <el-input v-model="form.name" style="width: 800px;" placeholder="请输入处置对象名" />
                                </el-form-item>
                                <el-form-item>
                                    <label style="font-size: 16px;display: inline-block; width: 100%;">时间：</label>
                                    <el-col :span="9">
                                        <el-date-picker v-model="form.date1" type="date" placeholder="请选择日期"
                                            style="width: 100%" />
                                    </el-col>
                                    <el-col :span="1" class="text-center">
                                        <span class="text-gray-500"></span>
                                    </el-col>
                                    <el-col :span="9">
                                        <el-time-picker v-model="form.date2" placeholder="请选择具体时间" style="width:100%" />
                                    </el-col>
                                </el-form-item>
                                <el-form-item>
                                    <label style="font-size: 16px;display: inline-block; width: 100%;">备注：</label>
                                    <el-input v-model="form.remark" style="width: 800px" :rows="6" type="textarea"
                                        placeholder="请输入备注"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>

                    <div class="next-button">
                        <div v-show="objectClass == 6 || objectClass == 5">
                            <router-link :to="{ path: '/handle1' }">
                                <el-button size="large" type="primary" style="width: 120px;">确认</el-button>
                            </router-link>
                            <!-- <router-link :to="{ path: '/risk0' }">
                                <el-button size="large" type="primary" style="width: 120px;">确认</el-button>
                            </router-link> -->
                        </div>
                        <div v-show="objectClass == 1 || objectClass == 2 || objectClass == 3 || objectClass == 4">
                            <router-link :to="{ path: '/handle1' }">
                                <el-button size="large" type="primary" style="width: 120px;">确认</el-button>
                            </router-link>
                       <!--      <router-link :to="{ path: '/risk0' }">
                                <el-button size="large" type="primary" style="width: 120px;">确认</el-button>
                            </router-link> -->
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import Sidebar from '../components/sideBar/SideBar.vue';
import { User, UserFilled, Folder, PictureFilled } from "@element-plus/icons-vue"
import { ElConfigProvider } from "element-plus";
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const riskfactorView = ref(false)
const corpseView = ref(false)
const personView = ref(false)
const itemView = ref(false)
const step = ref(0);
const isPerson = ref(false);
const isItem = ref(false);
const isEnviroment = ref(false);
const objectClass = ref(0);
const form = reactive({
    id: '',
    name: '',
    date1: '',
    date2: '',
    remark: '',
})

const extractRiskfactor = (i) => {
    riskfactorView.value = false;
    isItem.value = true;
    step.value = 1;
    itemView.value = false;
    if (i) {
        objectClass.value = 5;
    } else {
        objectClass.value = 4;
    }
    console.log(objectClass)
}

const judgeItem = (i) => {
    if (i) {
        isItem.value = true;
        itemView.value = true;
        personView.value = false;
    } else {
        step.value = 1;
        personView.value = false;
    }
}

const classPerson = () => {
    isPerson.value = true;
    personView.value = true;
}

const classItem = () => {
    isItem.value = true;
    itemView.value = true;
}

const classJump = (i) => {
    objectClass.value = i;
    if (i == 3) {
        corpseView.value = true;
    }
    else if (i == 4) {
        riskfactorView.value = true;
    } else {
        step.value = 1;
        if (i == 1 || i == 2) {
            personView.value = false;
        }
        else {
            itemView.value = false;
        }
    }
}

const classEnviroment = () => {
    isEnviroment.value = true;
    step.value = 1;
    objectClass.value = 6;
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

.selectObject {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 150px 80px;
}

.object {
    height: 90%;
    text-align: center;
}

.objectBtn1 {
    width: 300px;
    height: 300px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.objectBtn2 {
    width: 180px;
    height: 45px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.objectBtn3 {
    width: 180px;
    height: 45px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.steps {
    margin-left: 30px;
    margin-top: 30px;
}

.next-button {
    position: absolute;
    bottom: 5%;
    /* 距离底部的间距 */
    right: 5%;
    /* 距离右侧的间距 */
}
</style>