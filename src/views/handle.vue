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
              <el-input @input="onInput" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="疾病性质："  v-model="form.type">
                <el-radio v-model="radio" label="传染性疾病" name="type" ></el-radio>
                <el-radio v-model="radio" label="非传染性疾病" name="type" ></el-radio>
                <el-radio v-model="radio" label="未知" name="type" ></el-radio>
            </el-form-item>
            <el-form-item label="案发现场描述：" style="width: 95%"  >
              <el-input @input="onInput" type="textarea" rows="10" v-model="form.description"></el-input>
            </el-form-item>
          </el-form>
          <div>
            <el-upload
                class="upload-demo"
                action=""
                multiple
                drag
                style="width: 95%; margin-top: 70px;"
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
            <span class="demonstration">多选可搜索</span>
            <el-cascader
                placeholder="添加/搜索生物危险因子信息"
                :options="options"
                :props="{ multiple: true }"
                filterable></el-cascader>
          </div>
        </el-card>
      </div>

      <div v-if="active === 2" class="center-container">
        <el-card class="card_box">
          <div>
            <el-upload
                class="upload-demo"
                action=""
                multiple
                drag
                style="width: 100%; margin-top: 330px"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将现场图片拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10Mb</div>
            </el-upload>
          </div>
        </el-card>
      </div>

      <div v-if="active === 3" class="center-container">
        <el-card class="card_box">
          <div>
            <el-upload
                class="upload-demo"
                action=""
                multiple
                drag
                style="width: 100%; margin-top: 330px"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将现场图片拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10Mb</div>
            </el-upload>
          </div>
        </el-card>
      </div>
      <el-button class="next-button" size="large" @click="next">
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
const form = ref({
  name : ' ',
  type : ' ',
  description : '',
})
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

  if (active.value++ >4) active.value = 0;

}
const onInput = () =>{
  this.$forceUpdate();
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
</style>
