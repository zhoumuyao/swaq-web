<template>
  <el-row>
    <el-col :span="7" class="tree-container">
      <el-tree
          ref="treeRef"
          :data="treeData"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          highlight-current
          :current-node-key="defaultSelectedKey"
          @node-click="handleNodeClick"
      />
    </el-col>

    <el-col :span="17" class="content-container">
      <h2>{{ currentTitle }}</h2>
      <div class="PDF-content">{{ currentContent }}</div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  dataSource: {
    type: Object,
    required: true,
  },
});

const treeData = ref(props.dataSource.default || props.dataSource);

const defaultProps = {
  children: "children",
  label: "label",
};

const currentTitle = ref("");
const currentContent = ref("");
const defaultSelectedKey = ref("");

const handleNodeClick = (data) => {
  if (!data.content) return; // 没有content属性的节点不做任何处理

  currentTitle.value = data.label;
  currentContent.value = data.content;
};

// 设置默认选中第一个有content的节点
const setDefaultSelection = () => {
  const findFirstWithContent = (nodes) => {
    for (const node of nodes) {
      if (node.content) return node;
      if (node.children) {
        const found = findFirstWithContent(node.children);
        if (found) return found;
      }
    }
    return null;
  };

  const firstWithContent = findFirstWithContent(treeData.value);
  if (firstWithContent) {
    defaultSelectedKey.value = firstWithContent.id;
    currentTitle.value = firstWithContent.label;
    currentContent.value = firstWithContent.content;
  }
};

onMounted(() => {
  setDefaultSelection();
});
</script>

<style scoped>
.tree-container {
  width: 80px;
  padding: 5px;
  border-right: 1px solid #eee;
  /* 设置固定高度 */
  height: 450px;
  overflow-y: auto;
  overflow-x: auto;
}

.content-container {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.PDF-content {
  margin-top: 10px;
  line-height: 1.6;
  white-space: pre-wrap;
}

.el-tree--highlight-current .el-tree-node.is-current > {
  background-color: #f0f7ff;
  color: #409eff;
}

/* 使用深度选择器设置树节点文字样式 */
::v-deep .el-tree-node__content {
  white-space: nowrap; /* 防止文字换行 */
  overflow: hidden; /* 隐藏溢出的内容 */
  text-overflow: ellipsis; /* 用省略号表示溢出的内容 */
}

/* 鼠标悬停时显示完整内容 */
::v-deep .el-tree-node__content:hover {
  overflow: visible;
  white-space: normal;
  position: relative;
  z-index: 1;
  background-color: white;
}
</style>