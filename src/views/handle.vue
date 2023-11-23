<template>
  <div class="app">
    <!--    <sidebar></sidebar>-->
    <div class="content">
      <router-view></router-view>
      <div>
        <!--        现场处置模块-->
        <el-steps :active="active" finish-status="success" align-center style="margin-top: 20px">
          <el-step title="基本信息上传" ></el-step>
          <el-step title="生物危险因子信息"></el-step>
          <el-step title="处置决策结果"></el-step>
          <el-step title="评价与反馈"></el-step>
        </el-steps>
      </div>
      <div v-if="active === 0" class="center-container">
        <el-card class="card_box">
          <el-form ref="form" :model="form">
            <el-form-item label="疾病名称："   style="width: 95%">
              <el-input @input="onInput" v-model="form.name" style="border: black 2px solid"></el-input>
            </el-form-item>
            <el-form-item label="疾病性质："  v-model="form.type">
                <el-radio v-model="radio" label="传染性疾病" name="type" ></el-radio>
                <el-radio v-model="radio" label="非传染性疾病" name="type" ></el-radio>
                <el-radio v-model="radio" label="未知" name="type" ></el-radio>
            </el-form-item>
            <el-form-item label="案发现场描述：" style="width: 95%"  >
              <el-input @input="onInput" type="textarea" rows="10" v-model="form.description" style="border: black 2px solid"></el-input>
            </el-form-item>
          </el-form>
          <div>
            <el-upload
                class="upload-demo"
                action=""
                multiple
                drag
                style="width: 95%; margin-top: 50px;border: black 2px solid"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将现场图片拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10Mb</div>
            </el-upload>
          </div>
        </el-card>
      </div>

      <div v-if="active === 1" class="center-container">
        <el-card class="card_box">
          <div class="block">
            <span >请在下拉框中多选生物危险因子信息</span>
          </div>
          <div>
            <el-button
                @click="removeChoosenButton"
                style="margin-left: 450px;margin-top: 100px;color: #20232a;background-color: cornflowerblue">清空所选信息
            </el-button>
          </div>
          <div>
            <el-scrollbar wrap-class="scrollbar-wrapper" style="height: 400px; overflow-y: auto;">
              <el-cascader
                  placeholder="添加/搜索生物危险因子信息"
                  style="margin-left: 360px;margin-top: 50px;width: 30%;height: 80%"
                  :options="options"
                  v-model="selectedItems"
                  :props="{ multiple: true }"
                  filterable></el-cascader>
            </el-scrollbar>
          </div>
        </el-card>
      </div>

      <div v-if="active === 2" class="center-container">
        <el-card class="card_box">
          <el-card class="left-top-container">
              <!-- 左上方的内容 -->
            <div slot="header" class="card-title">
              <span>-决策结果</span>
              <el-button style="float: right; padding: 3px 0" type="text">复制</el-button>
            </div>
          </el-card>

          <el-card class="left-bottom-container">
              <!-- 左下方的内容 -->
            <div slot="header" class="card-title">
              <span>-处置建议</span>
              <el-button style="float: right; padding: 3px 0" type="text">复制</el-button>
            </div>
          </el-card>

          <el-card class="right-container">
            <!-- 右侧的内容 -->
            <div slot="header" class="card-title">
              <span>-Tips</span>
              <el-button style="float: right; padding: 3px 0" type="text">复制</el-button>
            </div>
          </el-card>





        </el-card>
      </div>

      <div v-if="active === 3" class="center-container">
        <el-card class="card_box">
          <div style="margin-left: 50px;margin-top: 50px">
            <div>现场处置评分</div>
            <div>
              <el-rate
                  v-model="Starvalue"
                  :texts="texts"
                  show-text>
              </el-rate>
            </div>
          </div>
          <div style="margin: 50px 50px 0 50px">
            <el-input
                type="textarea"
                :autosize="{ minRows: 8, maxRows: 15}"
                placeholder="请输入您对本模块的反馈意见"
                v-model="textarea">
            </el-input>
          </div>
          <div style="float: right;margin-top: 50px;margin-right: 50px"><el-button type="primary" @click="submit">提交</el-button></div>
        </el-card>
      </div>
      <el-alert
          v-if="alertVisible && active === 3"
          title="提交成功"
          type="success"
          description="感谢您的反馈意见，我们将根据反馈进行进一步优化！"
          show-icon
          @close="closeAlert">
      </el-alert>
      <el-button v-if="active<3" class="next-button" size="large" @click="next">
        下一步
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { get } from "@/net";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import Sidebar from '../components/sideBar/SideBar.vue';

// 当前步骤
const active = ref(0);
const radio = ref(1);
const Starvalue = ref(0);
const texts = ref(['完全没有帮助','几乎没有帮助','有一点参考价值','较好参考价值','非常具有参考价值']);
const textarea = ref('')
const alertVisible = ref(false)
const form = ref({
  name : ' ',
  type : ' ',
  description : '',
})
const selectedItems = ref([]);
const options = ref([{
  value: 'chuanbo',
  label: '传播信息',
  children: [{
    value: 'Infectiousness',
    label: '传染性',
    children: [{
      value: 'high',
      label: '高'
    }, {
      value: 'medium',
      label: '中'
    }, {
      value: 'low',
      label: '低'
    }, {
      value: 'null',
      label: '无'
    }]
  }, {
    value: 'pathway',
    label: '传播途径',
    children: [{
      value: 'Airborne',
      label: '空气气溶胶传播'
    }, {
      value: 'Waterborne',
      label: '水源传播'
    },{
      value: 'Droplet',
      label: '飞沫传播'
    },{
      value: 'Contact',
      label: '接触传播'
    },{
      value: 'Foodborne',
      label: '食物源传播'
    },]
  },{
    value: 'scope',
    label: '传播范围',
    children: [{
      value: 'global',
      label: '全球传播'
    }, {
      value: 'area',
      label: '地区传播'
    }, {
      value: 'street',
      label: '街区传播'
    }, {
      value: 'home',
      label: '家庭传播'
    }]
  }]
}, {
  value: 'tezheng',
  label: '特征信息',
  children: [{
    value: 'Pathogenicity',
    label: '病原性',
    children: [{
      value: 'Pathogen',
      label: '致病菌'
    }, {
      value: 'pathogenic',
      label: '致病性'
    }, {
      value: 'Non-pathogenic',
      label: '非致病性'
    }]
  }, {
    value: 'Toxicity',
    label: '毒性',
    children: [{
      value: 'high',
      label: '高'
    }, {
      value: 'medium',
      label: '中'
    }, {
      value: 'low',
      label: '低'
    }, {
      value: 'null',
      label: '无毒'
    }]
  }, {
    value: 'Invasiveness',
    label: '侵袭性',
    children: [{
      value: 'high',
      label: '高'
    }, {
      value: 'medium',
      label: '中'
    }, {
      value: 'low',
      label: '低'
    }]
  }, {
    value: 'Death Rate',
    label: '致死率',
    children: [{
      value: 'Very Low Mortality',
      label: '小于1%'
    }, {
      value: 'Low Mortality',
      label: '1%-5%'
    }, {
      value: 'Moderate Mortality',
      label: '5%-10%'
    }, {
      value: 'High Mortality',
      label: '10%-20%'
    }, {
      value: 'Very High Mortality',
      label: '大于20%'
    }]
  }, {
    value: 'Incidence Rate',
    label: '发病率',
    children: [{
      value: 'Very Low Mortality',
      label: '小于1%'
    }, {
      value: 'Low Mortality',
      label: '1%-5%'
    }, {
      value: 'Moderate Mortality',
      label: '5%-10%'
    }, {
      value: 'High Mortality',
      label: '10%-20%'
    }, {
      value: 'Very High Mortality',
      label: '大于20%'
    }]
  }, {
    value: 'virulence',
    label: '活性',
    children: [{
      value: 'high',
      label: '高'
    }, {
      value: 'medium',
      label: '中'
    }, {
      value: 'low',
      label: '低'
    }]
  }]
}, ]) ;
const value = ref('');
// 触发下一步骤
const next = () => {
  if(active.value === 0){
    if (!form.value.name) {
      // 如果 form.name 为空，弹出提示
      alert('请填写生物因子名称！');
      return; // 中断函数执行
    } else if(!form.value.description){
      alert('请添加生物因子描述')
      return;
    } else if(radio.value===1){
      alert('请勾选疾病性质')
      return;
    }
  }

  if (active.value++ >4) active.value = 0;

}

const onInput = () =>{
  this.$forceUpdate();
}

const removeChoosenButton = () => {
  // 清空下拉框内容
  selectedItems.value = [];
}

const submit = () => {
  if(textarea.value !== '' && Starvalue.value > 0){
    alertVisible.value = true;
  }
}
//
const closeAlert= () => {
  alertVisible.value = false;
}

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
.next-button {
  position: fixed;
  bottom: 20px;
  right: 60px;
}
.upload-demo {
  width: 400%;
  height: 200%;
}
.center-container{
  position: fixed;
  top: 100px;
  width: 89%;
  height: 100%;
}

.card_box{
  height:100%;
  overflow-y:auto;
  overflow-x:hidden;
}

.box-card{
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.left-top-container{
  position: fixed;
  top: 20%;
  left: 21%;
  width: 50%;
  height: 35%;
}
.left-bottom-container{
  position: fixed;
  top: 60%;
  left: 21%;
  width: 50%;
  height: 35%;
}

.right-container{
  position: fixed;
  top: 20%;
  right: 5%;
  width: 20%;
  height: 65%;
}

.card-title{
  font-size: larger;
}

.scrollbar-wrapper {
  margin-left: 360px;
  margin-top: 50px;
  width: 30%;
}

</style>
