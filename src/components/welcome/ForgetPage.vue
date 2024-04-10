<template>
  <div>
    <div style="margin: 30px 20px">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="验证电子邮件"/>
        <el-step title="重新设定密码"/>
      </el-steps>
    </div>
    <div style="margin: 0 2vw;text-align: center" v-if="active === 0">
      <div style="margin-top: 10vh">
        <div style="font-size: 25px;font-weight: bold">重置密码</div>
        <div style="font-size: 14px;color: grey">请输入需要重置密码的电子邮件地址</div>
      </div>
      <div style="margin-top: 4vh">
        <el-form :model="form" :rules="rules" @validate="onValidate" ref="formRef">
          <el-form-item prop="email">
            <el-input v-model="form.email" type="email" placeholder="电子邮箱">
              <template #prefix>
                <el-icon><message/></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-row style="width: 100%;margin: 0">
              <el-col :span="14">
                <el-input v-model="form.code" type="text" placeholder="请输入验证码">
                  <template #prefix>
                    <el-icon><EditPen/></el-icon>
                  </template>
                </el-input>
              </el-col>
              <el-col :span="10" style="padding: 0;text-align: right">
                <el-button type="success" @click="validateEmail" :disabled="!isEmailValid || coldTime > 0">
                  {{coldTime > 0 ? "请稍后 "+ coldTime + "秒" : '获取验证码'}}
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
      <div style="margin-top: 8vh">
        <el-button @click="startReset" style="width: 12vw" type="warning" plain>开始重置密码</el-button>
      </div>
    </div>
    <div style="margin: 0 2vw;text-align: center" v-if="active === 1">
      <div style="margin-top: 10vh">
        <div style="font-size: 25px;font-weight: bold">重置密码</div>
        <div style="font-size: 14px;color: grey">请填写新密码，务必牢记，防止丢失</div>
      </div>
      <div style="margin-top: 4vh">
        <el-form :model="form" :rules="rules" @validate="onValidate" ref="formRef">
          <el-form-item prop="password">
            <el-input v-model="form.password" type="password" placeholder="密码">
              <template #prefix>
                <el-icon><lock/></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password_repeat">
            <el-input v-model="form.password_repeat" type="password" placeholder="重复密码">
              <template #prefix>
                <el-icon><lock/></el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="margin-top: 8vh">
        <el-button @click="doReset" style="width: 12vw" type="danger" plain>立即重置密码</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>

import {reactive, ref} from "vue";
import {post} from "@/net";
import {ElMessage} from "element-plus";
import router from "@/router";

const active = ref(0)
const formRef = ref();
const isEmailValid = ref(false);
const coldTime = ref(0);

const form = reactive({
  email:'',
  code:'',
  password:'',
  password_repeat:''
})

const validatePassword = (rules,value,callback)=>{
  if(value === ""){
    callback(new Error('请再次输入密码'))
  }else if(value !== form.password){
    callback(new Error('两次输入的密码不一致'))
  }else {
    callback()
  }
}

const onValidate = (prop, isValid)=>{
  if(prop ==='email'){
    isEmailValid.value = isValid;
  }
}

const rules = {
  email:[
    {required: true,message: '请输入邮件地址',trigger: 'blur'},
    {type: 'email', message:'请输入合法的电子邮件地址',trigger: ['blur','change']}
  ],
  code:[
    {required: true,message: '请输入验证码',trigger: 'blur'},
  ],
  password:[
    {required: true,message: '请输入密码',trigger: 'blur'},
    { min: 6, max: 16, message: '密码长度必须在6-16个字符之间', trigger: ['blur','change'] },
  ],
  password_repeat:[
    { validator: validatePassword, trigger: ['blur','change'] },
  ]
}

const validateEmail = () => {
  post('/api/auth/valid-reset-email',{
    email:form.email
  },(message)=>{
    ElMessage.success(message)
    coldTime.value = 60
    setInterval(()=> coldTime.value--,1000)
  })
}

const startReset = () =>{
  formRef.value.validate((isValid) => {
    if(isValid){
      post('/api/auth/start-reset',{
        email: form.email,
        code: form.code,
      },()=>{
        active.value++
      })
    }else {
      ElMessage.warning('请填写电子邮件和验证码')
    }
  })
}

const doReset = () =>{
  formRef.value.validate((isValid) => {
    if(isValid){
      post('/api/auth/do-reset',{
        password: form.password
      },(message)=>{
        ElMessage.success(message)
        router.push("/")
      })
    }else {
      ElMessage.warning('请填写新的密码')
    }
  })
}
</script>

<style scoped>

</style>
