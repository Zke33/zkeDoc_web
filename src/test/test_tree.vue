<template>
  <div>
    <a-tree
        :data="treeData"
        :checkable="true"
        show-line
        :default-expanded-keys="['0-0-0']"
        :default-selected-keys="['0-0-0', '0-0-1']"
    />
  </div>
</template>

<script setup lang="ts">
const treeData = [
  {
    title: '文档1',
    key: '1',
    children: [
      {
        title: "文档1-1",
        key: "1-1"
      },
      {
        title: "文档1-2",
        key: "1-2"
      }
    ],
  },
  {
    title: '文档1',
    key: '2',
    children: []
  },
];
</script>