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
                    <el-step title="风险评价"></el-step>
                </el-steps>
            </div>
            <div class="prepare-container">
                <el-card class="prepare-form">
                    <div style="width: 100%;">
                        <label class="label">设立初步的评估方案:</label>
                        <div style="margin-top: 10px; width: 100%;">
                            <el-form :model="form" :inline="true" style="width: 100%;">
                                <el-form-item label="风险评估时间：">
                                    <el-date-picker v-model="form.date" type="date" placeholder="选择日期"
                                        format="YYYY/MM/DD" value-format="YYYY-MM-DD" style="margin: 0 30px;" />
                                    <el-time-picker v-model="form.time" placeholder="选择时间" format="HH:mm:ss"
                                        value-format="HH:mm:ss" />
                                </el-form-item>
                                <div style="width: 100%;">
                                    <el-form-item label="风险评估地点：">
                                        <div style=" width: 90%;">
                                            <label class="font" style="font-size:14px; color: #606266;">经度: </label>
                                            <el-input class="position" placeholder="请输入经度"
                                                v-model="form.position.longitude"></el-input>
                                            <label class="font" style="font-size:14px; color: #606266;">经度: </label>
                                            <el-input class="position" placeholder="请输入经度"
                                                v-model="form.position.latitude"></el-input>
                                            <label class="font" style="font-size:14px; color: #606266;">国家: </label>
                                            <el-input class="position" placeholder="请输入国家"
                                                v-model="form.position.country"></el-input>
                                            <label class="font" style="font-size:14px; color: #606266;">省份: </label>
                                            <el-input class="position" placeholder="请输入省份"
                                                v-model="form.position.province"></el-input>
                                            <label class="font" style="font-size:14px; color: #606266;">市区: </label>
                                            <el-input class="position" placeholder="请输入市区"
                                                v-model="form.position.urban"></el-input>
                                            <label class="font" style="font-size:14px; color: #606266;">具体描述: </label>
                                            <el-input class="position" placeholder="具体描述"
                                                v-model="form.position.description"
                                                style="width: 10%; margin-right: 0"></el-input>
                                        </div>
                                    </el-form-item>
                                </div>
                                <div style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 20px;">
                                    <el-form-item label="风险评估目标：" prop="type">
                                        <el-radio-group v-model="form.type">
                                            <el-radio :label="1">病毒</el-radio>
                                            <el-radio :label="2">细菌</el-radio>
                                            <el-radio :label="3">毒素</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="评估程序规划：">
                                        <el-select v-model="form.method" placeholder="请选择评估程序方法" style="width: 30%;">
                                            <el-option label="风险因素分析法" value="1" />
                                            <el-option label="模糊综合评价法" value="2" />
                                            <el-option label="内部控制评价法" value="3" />
                                            <el-option label="分析性复核法" value="4" />
                                            <el-option label="风险率风险评价法" value="5" />
                                            <el-option label="定性风险评价法" value="6" />
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div class="person_equiment">
                                    <div>
                                        <div style="margin-bottom: 10px;">
                                            <label class="smalllabel">风险评估人员：</label>
                                            <el-button type="primary" :icon="Plus" circle
                                                @click="addperson = true;"></el-button>
                                        </div>
                                        <el-card class="card">
                                            <el-table :data="form.person" style="width: 100%; height: 45vh">
                                                <el-table-column prop="id" label="警务号" width="" />
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
                                        <el-card class="card">
                                            <el-table :data="form.equipment" style="width: 100%; height: 45vh">
                                                <el-table-column prop="id" label="设备号" width="" />
                                                <el-table-column prop="name" label="设备名" width="" />
                                                <el-table-column prop="guide" label="使用说明" width="120">
                                                    <template #default="{ row }">
                                                        <el-button v-show="row.showButton" type="primary" size="small"
                                                            @click="viewGuide(row.guide)">查看</el-button>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </el-card>
                                    </div>
                                </div>
                            </el-form>
                        </div>
                        <div class="next-button">

                            <!--   btn    -->

                            <el-button type="primary" style="margin-left: 10%; width:" @click="jumpAnalysis"
                                size="large">进行风险分析</el-button>
                        </div>
                        <el-dialog v-model="addperson" title="选择风险评估人员" width="600px" draggable>
                            <el-input style="display: inline-block; width: 30%; margin:0 10px 0 60%;" v-model="personID"
                                placeholder="请输入警务号"></el-input>
                            <el-button type="primary" :icon="Search" @click="handleSearch"
                                style="display: inline-block;" circle></el-button>
                            <div>
                                <el-table :data="riskPerson" style="width: 100%" type="selection">
                                    <el-table-column prop="id" label="警务号" width="180" fixed="left">
                                    </el-table-column>
                                    <el-table-column prop="name" label="姓名" width="180" fixed="left">
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
                        <el-dialog v-model="addequiment" title="选择风险评估设备" width="600px" draggable>
                            <div>
                                <el-select v-model="equipment" placeholder="请选择设备种类" style="width: 30%;">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <div style="display: inline;" v-if="equipment != '选项1'">
                                    <el-input style="display: inline-block; width: 30%; margin:0px 10px 0 30%;"
                                        v-model="personID" placeholder="请输入设备号"></el-input>
                                    <el-button type="primary" :icon="Search" @click="handleSearch" circle>
                                    </el-button>
                                </div>
                                <div style="display: inline;" v-if="equipment == '选项1'">
                                    <el-select v-model="grade" placeholder="请选择设备种类"
                                        style="width: 25%; margin-left: 5%">
                                        <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-input style="display: inline-block; width: 25%; margin:0px 10px 0 5%"
                                        v-model="personID" placeholder="请输入设备号"></el-input>
                                    <el-button type="primary" :icon="Search" @click="handleSearch" circle>
                                    </el-button>
                                </div>
                            </div>
                            <div>
                                <el-table
                                    v-if="equipment == '选项1' || equipment == '选项2' || equipment == '选项3' || equipment == '选项4' || equipment == ''"
                                    :data="getRiskEquipmentData()" style="width: 100%; margin-top: 10px; "
                                    type="selection" height="40vh">
                                    <el-table-column prop="id" label="设备号" width="180" fixed="left">
                                    </el-table-column>
                                    <el-table-column prop="name" label="设备名" width="180" fixed="left">
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
                        <el-dialog title="预览文件" v-model="isViewPdf20" :before-close="handleClose" width="80vw">
                            <iframe :src="PDFsrc" frameborder="0" style="width: 75vw; height: 70vh"></iframe>
                        </el-dialog>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script setup>
import { get, post } from "@/net";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import Sidebar from '../../components/sideBar/SideBar.vue';
import router from "@/router";
import { ref, reactive, onMounted } from 'vue';
import { Search, Plus } from "@element-plus/icons-vue"
import airCondition from './device_guide/air_condition.pdf'
import waterConditionDetectiver from './device_guide/water_condition_detectiver.pdf'
import soilConditionDetectiver from './device_guide/soil_condition_detectiver.pdf'
import gasConditionDetectiver from './device_guide/gas_condition_detectiver.pdf'
import radioConditionDetectiver from './device_guide/radio_condition_detectiver.pdf'
import lamaInfraredConditionDetectiver from './device_guide/lama_infrared_condition_detectiver.pdf'
import infraredConditionDetectiver from './device_guide/infrared_condition_detectiver.pdf'
import biologyRiskConditionDetectiver from './device_guide/biology_risk_condition_detectiver.pdf'
import PCRConditionDetectiver from './device_guide/PCR_condition_detectiver.pdf'
import microConditionDetectiver from './device_guide/micro_condition_detectiver.pdf'
import massSpectraConditionDetectiver from './device_guide/mass_spectra_condition_detectiver.pdf'
import ELIASAConditionDetectiver from './device_guide/ELIASA_condition_detectiver.pdf'
import centrifugalConditionDetectiver from './device_guide/centrifugal_condition_detectiver.pdf'
import PCRDetectiver from './device_guide/PCR__detectiver.pdf'
import ELISADetectiver from './device_guide/ELISA__detectiver.pdf'

onMounted(() => {
    const route = useRoute()
    const id = route.query.id;

    post('/api/risk/select_person', {
    }, (data) => {
        riskPerson.value = data;
        riskPerson.value.forEach(function(item) {
            item.checked = false;
        });
    })

    post('/api/risk/select_equipment', {
    }, (data) => {
        equipments.value = data;
        equipments.value.forEach(function(item) {
            item.checked = false;
        });
        console.log(equipments.value)
    })
    /* if (id) {
        post('/api/case/select_case', {
            id: id
        }, (data) => {
            form.date = data.date
            form.time = data.time
            form.position.longitude = String(data.longitude)
            form.position.latitude = String(data.latitude)
            form.position.country = data.country
            form.position.province = data.province
            form.position.urban = data.urban
            form.position.description = data.description
        })
    } */
});

const riskPerson = ref([])
const equipments = ref([])

const route = useRoute()
const id = route.query.id;

const gradeOptions = ref([{
    value: '选项1',
    label: '特殊防护'
}, {
    value: '选项2',
    label: '一般防护'
}, {
    value: '选项3',
    label: '基础防护'
}
])

const grade = ref("")

const options = ref([{
    value: '选项1',
    label: '防护装备'
}, {
    value: '选项2',
    label: '交通装备'
}, {
    value: '选项3',
    label: '取样装备'
}, {
    value: '选项4',
    label: '记录装备'
}])

const equipment = ref("")
const PDFsrc = ref("")
const isViewPdf20 = ref(false);
const addperson = ref(false);
const addequiment = ref(false)
const personID = ref()

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
    },
    type: 1,
    method: '',
    person: [],
    equipment: [],
});

const riskEquiment = ref([{
    id: 6,
    name: '正压防护服',
    checked: false,
    guide: airCondition
}, {
    id: 7,
    name: '医用乳胶手套',
    checked: false,
    guide: waterConditionDetectiver
}, {
    id: 8,
    name: '透明防护面具',
    checked: false,
    guide: soilConditionDetectiver
}, {
    id: 9,
    name: '密封式防护镜',
    checked: false,
    guide: gasConditionDetectiver
}, {
    id: 10,
    name: '鞋套',
    checked: false,
    guide: radioConditionDetectiver
},
{
    id: 11,
    name: 'N95/KN95颗粒物防护口罩或以上级别的口罩',
    checked: false,
    guide: lamaInfraredConditionDetectiver
}
])
const riskEquiment2 = ref([{
    id: 12,
    name: '防护服',
    checked: false,
    guide: PCRConditionDetectiver
}, {
    id: 13,
    name: '医用乳胶手套',
    checked: false,
    guide: microConditionDetectiver
}, {
    id: 14,
    name: '透明防护面具',
    checked: false,
    guide: massSpectraConditionDetectiver
}, {
    id: 15,
    name: '密封式防护镜',
    checked: false,
    guide: ELIASAConditionDetectiver
}, {
    id: 16,
    name: '鞋套',
    checked: false,
    guide: centrifugalConditionDetectiver
},
{
    id: 17,
    name: 'N95/KN95颗粒物防护口罩或以上级别的口罩',
    checked: false,
    guide: PCRDetectiver
},
])

const riskEquiment3 = ref([{
    id: 18,
    name: '口罩',
    checked: false,
    guide: PCRConditionDetectiver
}, {
    id: 19,
    name: '眼罩',
    checked: false,
    guide: microConditionDetectiver
}, {
    id: 20,
    name: '头罩',
    checked: false,
    guide: massSpectraConditionDetectiver
}, {
    id: 21,
    name: '手套',
    checked: false,
    guide: ELIASAConditionDetectiver
}, {
    id: 22,
    name: '鞋套',
    checked: false,
    guide: centrifugalConditionDetectiver
}
])

const riskEquiment4 = ref([{
    id: 23,
    name: '生物安全现场勘查车',
    checked: false,
    guide: PCRConditionDetectiver
}, {
    id: 24,
    name: '信息传输车辆',
    checked: false,
    guide: microConditionDetectiver
}, {
    id: 25,
    name: '快速响应车辆',
    checked: false,
    guide: massSpectraConditionDetectiver
}, {
    id: 26,
    name: '承载设备车辆',
    checked: false,
    guide: ELIASAConditionDetectiver
}
])

const riskEquiment5 = ref([{
    id: 27,
    name: '现场采样设备',
    checked: false,
    guide: PCRConditionDetectiver
}, {
    id: 28,
    name: '样品分析设备',
    checked: false,
    guide: microConditionDetectiver
}, {
    id: 29,
    name: '生物安全现场勘查工具箱',
    checked: false,
    guide: massSpectraConditionDetectiver
}, {
    id: 30,
    name: '空气采样设备',
    checked: false,
    guide: ELIASAConditionDetectiver
}, {
    id: 31,
    name: '现场检测仪',
    checked: false,
    guide: centrifugalConditionDetectiver
},
{
    id: 32,
    name: '红外光谱仪',
    checked: false,
    guide: PCRDetectiver
},
{
    id: 33,
    name: '拉曼光谱仪',
    checked: false,
    guide: ELISADetectiver
},
{
    id: 34,
    name: '微流控系统',
    checked: false,
    guide: ELISADetectiver
},
])

const riskEquiment6 = ref([{
    id: 35,
    name: '无人机摄像系统',
    checked: false,
    guide: PCRConditionDetectiver
}, {
    id: 36,
    name: '手持式相机',
    checked: false,
    guide: microConditionDetectiver
}, {
    id: 37,
    name: '平板电脑',
    checked: false,
    guide: massSpectraConditionDetectiver
}, {
    id: 38,
    name: '警务手机',
    checked: false,
    guide: ELIASAConditionDetectiver
}
])




const getRiskEquipmentData = () => {
    switch (equipment.value) {
        case '选项1':
            switch (grade.value) {
                case '选项1': return equipments.value.filter(equipment => equipment.type1 === 1);
                case '选项2': return equipments.value.filter(equipment => equipment.type2 === 1);
                case '选项3': return equipments.value.filter(equipment => equipment.type3 === 1);
                default: return [];
            }
        case '选项2':
            return equipments.value.filter(equipment => equipment.type4 === 1);
        case '选项3':
            return equipments.value.filter(equipment => equipment.type5 === 1);
        case '选项4':
            return equipments.value.filter(equipment => equipment.type6 === 1);
        default:
            return [];
    }
}


const jumpAnalysis = () => {
    console.log(form.person.map(item => item.id))
    /*     post('/api/risk/plan', {
                id: id,
                date: form.date,
                time: form.time,
                longitude: form.position.longitude,
                latitude: form.position.latitude,
                country: form.position.country,
                province: form.position.province,
                urban: form.position.urban,
                description: form.position.description,
                type: form.type,
                method: form.method,
                pidList: form.person.map(item => item.id),
                eidList: form.equipment.map(item => item.id)
            }, (data) => {
                ElMessage.success("新建成功")
            }) */
    router.push({ path: '/risk_identification', query: { id: id } })
}


const handleClose = () => {
    PDFsrc.value = "";
    isViewPdf20.value = false;
}
const viewGuide = (guide) => {
    isViewPdf20.value = true;
    PDFsrc.value = guide;
    console.log(PDFsrc.value)
}
const addEquiment = () => {
    addequiment.value = false;
    form.equipment = []; 
    equipments.value.forEach((equipment) => {
        if (equipment.checked) {
            if (equipment.guide != null) {
                form.equipment.push({ id: equipment.id, name: equipment.name, guide: equipment.guide, showButton: true });
            }
            else
                form.equipment.push({ id: equipment.id, name: equipment.name, guide: equipment.guide, showButton: false });
        }
    }); riskEquiment2.value.forEach((equipment) => {
        if (equipment.checked) {
            if (equipment.guide != null) {
                form.equipment.push({ id: equipment.id, name: equipment.name, guide: equipment.guide, showButton: true });
            }
            else
                form.equipment.push({ id: equipment.id, name: equipment.name, guide: equipment.guide, showButton: false });
        }
    });
    riskEquiment3.value.forEach((equipment) => {
        if (equipment.checked) {
            if (equipment.guide != null) {
                form.equipment.push({ id: equipment.id, name: equipment.name, guide: equipment.guide, showButton: true });
            }
            else
                form.equipment.push({ id: equipment.id, name: equipment.name, guide: equipment.guide, showButton: false });
        }
    });
    riskEquiment4.value.forEach((equipment) => {
        if (equipment.checked) {
            if (equipment.guide != null) {
                form.equipment.push({ id: equipment.id, name: equipment.name, guide: equipment.guide, showButton: true });
            }
            else
                form.equipment.push({ id: equipment.id, name: equipment.name, guide: equipment.guide, showButton: false });
        }
    });
    riskEquiment5.value.forEach((equipment) => {
        if (equipment.checked) {
            if (equipment.guide != null) {
                form.equipment.push({ id: equipment.id, name: equipment.name, guide: equipment.guide, showButton: true });
            }
            else
                form.equipment.push({ id: equipment.id, name: equipment.name, guide: equipment.guide, showButton: false });
        }
    });
    riskEquiment6.value.forEach((equipment) => {
        if (equipment.checked) {
            if (equipment.guide != null) {
                form.equipment.push({ id: equipment.id, name: equipment.name, guide: equipment.guide, showButton: true });
            }
            else
                form.equipment.push({ id: equipment.id, name: equipment.name, guide: equipment.guide, showButton: false });
        }
    });
}
const addPerson = () => {
    addperson.value = false;
    form.person = []; 
    console.log(riskPerson.value)
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
    width: 80vw;
    position: relative;
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

.next-button {
    position: absolute;
    bottom: 15px;
    /* 距离底部的间距 */
    right: 20px;
    /* 距离右侧的间距 */
}

.position {
    margin-left: 10px;
    margin-right: 20px;
    width: 10%;
}

.card {
    height: 80%;
}
</style>