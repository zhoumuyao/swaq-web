<template>
  <div style="width: 100vw;height: 100vh;overflow: hidden;display: flex">
    <div style="flex: 1;background-color: dodgerblue">
      <el-image style="width: 100%;height: 100%" fit="cover"
                src="https://img2.baidu.com/it/u=635812276,1213380653&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800"></el-image>
    </div>
    <div class="welcome-title">
      <div style="font-size: 30px;font-weight: bold">欢迎来到生物安全项目</div>
      <div style="font-size: 18px;margin-top: 1vh">本系统包含图像与文本实例联合检索、检验鉴定和风险评估、处置流程辅助决策、用户评价反馈等模块</div>
    </div>
    <div style="width: 23vw">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.welcome-title{
  position: absolute;
  bottom: 3vh;
  left: 2vw;
  color: white;
  text-shadow: 0 0 10px black;
}
</style>
