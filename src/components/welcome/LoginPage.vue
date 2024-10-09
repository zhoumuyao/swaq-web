<template>
  <div style="margin: 0 2vw; text-align: center">
    <div style="margin-top: 10vh">
      <div style="font-size: 25px">登录</div>
      <div style="font-size: 14px; color: grey">进入系统之前请先登录</div>
    </div>
    <div style="margin-top: 1rem">
      <el-radio-group v-model="loginType">
        <el-radio-button label="密码登陆" style="width: 50%"></el-radio-button>
        <el-radio-button
          label="手机号验证"
          style="width: 50%"
        ></el-radio-button>
      </el-radio-group>
    </div>
    <div v-if="loginType == '密码登陆'" style="margin-top: 1rem">
      <el-input
        v-model="form.username"
        type="text"
        placeholder="用户名/邮箱/警号"
      >
        <template #prefix>
          <el-icon><user /></el-icon>
        </template>
      </el-input>
      <el-input
        v-model="form.password"
        type="password"
        style="margin-top: 1rem"
        placeholder="密码"
      >
        <template #prefix>
          <el-icon><lock /></el-icon>
        </template>
      </el-input>
    </div>
    <el-row v-if="loginType == '密码登陆'" style="margin-top: 1vh">
      <el-col :span="12" style="text-align: left">
        <el-checkbox v-model="form.remember" label="记住我" />
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-link @click="router.push('/forget')">忘记密码？</el-link>
      </el-col>
    </el-row>
    <div v-if="loginType == '手机号验证'" style="margin-top: 1rem">
      <el-form
        :model="form2"
        :rules="rules"
        @validate="onValidate"
        ref="formRef"
      >
        <el-form-item prop="phone" style="margin-bottom: 1rem;">
          <el-input v-model="form2.phone" type="phone" placeholder="手机号">
            <template #prefix>
              <el-icon><Iphone /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row style="width: 100%; margin: 0">
            <el-col :span="14">
              <el-input
                v-model="form.code"
                type="text"
                placeholder="请输入验证码"
              >
                <template #prefix>
                  <el-icon><EditPen /></el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="10" style="padding: 0; text-align: right">
              <el-button
                type="success"
                @click="validatePhone"
                :disabled="!isPhoneValid || coldTime > 0"
              >
                {{ coldTime > 0 ? "请稍后 " + coldTime + "秒" : "获取验证码" }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top: 4vh">
      <el-button @click="login()" style="width: 12vw" type="success" plain
        >立即登录</el-button
      >
    </div>
    <el-divider>
      <span style="color: grey; font-size: 13px">没有账号</span>
    </el-divider>
    <div style="margin-top: 2vh">
      <el-button
        style="width: 12vw"
        @click="router.push('/register')"
        type="warning"
        plain
        >注册账号</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { Lock, User, EditPen, Iphone } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import { post } from "@/net";
import router from "@/router";

const loginType = ref("密码登陆");
const isPhoneValid = ref(false);
const coldTime = ref(0);

const form = reactive({
  username: "",
  password: "",
  remember: false,
});

const form2 = reactive({
  phone: "",
  code: "",
});

const rules = {
  phone:[
    { required: true,message: '请输入手机号',trigger: 'blur'},
    { pattern: /^1[3-9]\d{9}$/, message: '请输入合法的手机号码', trigger: ['blur', 'change'] }
  ],
  code:[
    {required: true,message: '请输入验证码',trigger: 'blur'},
  ]
}

const login = () => {
  if (!form.username || !form.password) {
    ElMessage.warning("请填写用户名和密码！");
  } else {
    post(
      "/api/auth/login",
      {
        username: form.username,
        password: form.password,
        remember: form.remember,
      },
      (message) => {
        ElMessage.success(message), router.push("/index");
      }
    );
    // router.push('/index')
  }
};

const validatePhone = () => {
  post(
    "/api/auth/valid-register-email",
    {
      email: form.email,
    },
    (message) => {
      ElMessage.success(message);
      coldTime.value = 60;
      setInterval(() => coldTime.value--, 1000);
    }
  );
};

const onValidate = (prop, isValid) => {
  if (prop === "phone") {
    isPhoneValid.value = isValid;
  }
};
</script>

<style scoped></style>
