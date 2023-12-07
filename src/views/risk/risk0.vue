<template>
    <div class="app">
        <!--    <sidebar></sidebar>-->
        <div class="content">
            <router-view></router-view>
            <div style="padding: 20px; border-bottom:solid 2px ; border-color: darkgray;">
                <label style="font: 20px Extra large;">风险评估模块</label>
            </div>
            <div class="steps">
                <el-steps :active="0" finish-status="success" style="width: 50%; margin-left: 25%;">
                    <el-step title="计划和准备"></el-step>
                    <el-step title="风险识别"></el-step>
                    <el-step title="风险分析"></el-step>
                    <el-step title="风险评价"></el-step>
                </el-steps>
            </div>
            <div class="prepare-container">
                <el-card class="prepare-form">
                    <div style="width: 80%; margin-left: 10%;">
                        <label class="label">设立初步的评估方案:</label>
                        <div style="margin-top: 10px;">
                            <el-form :model="form" label-width="auto" :inline="true">
                                <el-form-item label="风险评估地点：" style="width: 35vw;">
                                    <el-input v-model="form.region" style=" width: 60%;"></el-input>
                                </el-form-item>
                                <el-form-item label="风险评估范围：">
                                    <el-select v-model="form.range" placeholder="请选择风险评估范围">
                                        <el-option label="生物性质" value="1" />
                                        <el-option label="实验室安全" value="2" />
                                        <el-option label="生物安全管理" value="3" />
                                        <el-option label="生物安全法规和标准" value="4" />
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="风险评估目标：" prop="type" style="width: 35vw;">
                                    <el-checkbox-group v-model="form.type">
                                        <el-checkbox label="病原体" name="pathogen" />
                                        <el-checkbox label="有害生物" name="pests" />
                                        <el-checkbox label="基因工程生物" name="genetically-engineered" />
                                    </el-checkbox-group>
                                </el-form-item>
                                <el-form-item label="评估程序规划：">
                                    <el-select v-model="form.method" placeholder="请选择评估程序方法">
                                        <el-option label="风险因素分析法" value="1" />
                                        <el-option label="模糊综合评价法" value="2" />
                                        <el-option label="内部控制评价法" value="3" />
                                        <el-option label="分析性复核法" value="4" />
                                        <el-option label="风险率风险评价法" value="5" />
                                        <el-option label="定性风险评价法" value="6" />
                                    </el-select>
                                </el-form-item>
                                <div class="person_equiment">
                                    <div>
                                        <div style="margin-bottom: 10px;">
                                            <label class="smalllabel">风险评估人员：</label>
                                            <el-button type="primary" :icon="Plus" circle
                                                @click="addperson = true"></el-button>
                                        </div>
                                        <el-card>
                                            <el-table :data="form.person" style="width: 100%; height: 45vh">
                                                <el-table-column prop="id" label="员工号" width="" />
                                                <el-table-column prop="name" label="姓名" width="" />
                                            </el-table>
                                        </el-card>
                                    </div>
                                    <div>
                                        <div style="margin-bottom: 10px;">
                                            <label class="smalllabel">评估装备设备：</label>
                                            <el-button el-button type="primary" :icon="Plus" circle
                                                @click="addequiment = true"></el-button>
                                        </div>
                                        <el-card>
                                            <el-table :data="form.equipment" style="width: 100%; height: 45vh">
                                                <el-table-column prop="id" label="设备号" width="" />
                                                <el-table-column prop="name" label="设备名" width="" />
                                            </el-table>
                                        </el-card>
                                    </div>
                                </div>
                            </el-form>
                        </div>
                        <div style="display: flex;justify-content: center; margin-top: 10px;">
                            <router-link :to="{ path: '/risk' }">
                                <el-button size="mini" type="primary">确认</el-button>
                            </router-link>
                        </div>
                        <el-dialog v-model="addperson" title="选择风险评估人员" width="600px" draggable>
                            <el-input style="display: inline-block; width: 30%; margin:0 10px 0 60%;" v-model="personID"
                                placeholder="请输入人员id"></el-input>
                            <el-button type="primary" :icon="Search" @click="handleSearch" style="display: inline-block;"
                                circle></el-button>
                            <div>
                                <el-table :data="riskPerson" style="width: 100%" type="selection">
                                    <el-table-column prop="id" label="人员号" width="180" fixed="left">
                                    </el-table-column>
                                    <el-table-column prop="name" label="人员名" width="180" fixed="left">
                                    </el-table-column>
                                    <el-table-column label="是否选中" width="180" fixed="right" prop="checked">
                                        <template #default="{ row }">
                                            <el-checkbox v-model="row.checked"></el-checkbox>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <template #footer>
                                <span class="dialog-footer">
                                    <el-button @click="addperson = false">取消</el-button>
                                    <el-button type="primary" @click="addPerson">确认</el-button>
                                </span>
                            </template>
                        </el-dialog>
                        <el-dialog v-model="addequiment" title="选择风险评估人员" width="600px" draggable>
                            <el-input style="display: inline-block; width: 30%; margin:0 10px 0 60%;" v-model="personID"
                                placeholder="请输入仪器id"></el-input>
                            <el-button type="primary" :icon="Search" @click="handleSearch" style="display: inline-block;"
                                circle></el-button>
                            <div>
                                <el-table :data="riskEquiment" style="width: 100%" type="selection">
                                    <el-table-column prop="id" label="人员号" width="180" fixed="left">
                                    </el-table-column>
                                    <el-table-column prop="name" label="人员名" width="180" fixed="left">
                                    </el-table-column>
                                    <el-table-column label="是否选中" width="180" fixed="right" prop="checked">
                                        <template #default="{ row }">
                                            <el-checkbox v-model="row.checked"></el-checkbox>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <template #footer>
                                <span class="dialog-footer">
                                    <el-button @click="addequiment = false">取消</el-button>
                                    <el-button type="primary" @click="addEquiment">确认</el-button>
                                </span>
                            </template>
                        </el-dialog>
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

const addperson = ref(false);
const addequiment = ref(false)
const personID = ref()
const showImg = ref(false);
const imageUrl = ref("");
const showLabel = ref(true);
const textarea1 = ref("");
const textarea2 = ref("");
const text = ref("");
const form = reactive({
    province: '',
    city: '',
    region: '',
    range: '',
    type: [],
    method: '',
    person: [{}],
    equipment: [{}],
});
const riskPerson = ref([{
    id: 1,
    name: 'John',
    checked: false,
},
{
    id: 2,
    name: 'Tom',
    checked: false,
},
{
    id: 3,
    name: 'Bill',
    checked: false,
},
{
    id: 4,
    name: 'Jerry',
    checked: false,
},
{
    id: 5,
    name: 'David',
    checked: false,
},
])
const riskEquiment = ref([{
    id: 1,
    name: '生物安全柜',
    checked: false,
}, {
    id: 2,
    name: '自动化液体处理系统',
    checked: false,
}, {
    id: 3,
    name: 'PCR仪',
    checked: false,
}, {
    id: 4,
    name: '离心机',
    checked: false,
}, {
    id: 5,
    name: '电泳系统',
    checked: false,
},
])

const addEquiment = () => {
    addequiment.value = false;

    riskEquiment.value.forEach((equipment) => {
        console.log(equipment)
        if (equipment.checked) {
            form.equipment.push({ id: equipment.id, name: equipment.name });
        }
    });
}
const addPerson = () => {
    addperson.value = false;

    riskPerson.value.forEach((person) => {
        console.log(person)
        if (person.checked) {
            form.person.push({ id: person.id, name: person.name });
        }
    });
}

const onSubmit = () => {
    console.log('submit!')
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

#file {
    opacity: 0;
}

.img {
    height: 500px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-radius: 4px;
    border: 1.2px solid;
    border-color: darkgray;
}

.text {
    height: 500px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-radius: 4px;
    border: 1.2px solid;
    border-color: darkgray;
}

.label {
    font: 18px large;
    font-family: "PingFang SC";
    margin: 0 10px 20px 0;
    display: block;
}

.prepare-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-top: 10px;
    /* 上边界距离 */
}

.prepare-card {
    display: flex;
    justify-content: center;
    height: 96vh;
    width: 80vw;
}

.prepare-form {
    height: 80vh;
    width: 100%;
}

.steps {
    margin-left: 30px;
    margin-top: 30px;
}

.inputlocal {
    width: 1000px;
}

.table {
    display: block;
    width: 30vw;
}

.person_equiment {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
}

.smalllabel {
    font-size: 14px;
    color: rgb(96, 98, 102);
}
</style>
  