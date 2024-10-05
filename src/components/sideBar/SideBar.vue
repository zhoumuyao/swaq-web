<template>
  <div class="sidebar">
    <ul>
      <li
        v-for="item in menuItems"
        :key="item.id"
        :class="{ active: item.isActive }"
        @click="navigateTo(item.route)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { id: 1, name: "主页", isActive: false, route: "index" },
        { id: 2, name: "新建案件", isActive: false, route: "create_case" },
        { id: 3, name: "查看案件", isActive: false, route: "view_case" },
        { id: 4, name: "风险评估", isActive: false, route: "risk" },
        { id: 5, name: "现场处置", isActive: false, route: "infoInput0" },
        { id: 6, name: "检验鉴定", isActive: false, route: "identify0" },
        { id: 7, name: "评价与反馈", isActive: false, route: "feedback" },
        // 添加更多菜单项...
      ],
    };
  },
  methods: {
    navigateTo(route) {

      this.$router.push({ name: route });
    },
  },
};
</script>

<style>
.sidebar {
  width: 200px;
  background-color: #20232a;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  /* 添加其他样式，如滚动条等 */
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: #fff;
}

.sidebar li:hover {
  background-color: #3a3f4b;
}

.sidebar li.active {
  background-color: #4f5462;
  font-weight: bold;
}
</style>
