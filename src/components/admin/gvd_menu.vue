

<template>
  <div class="gvd_menu">
    <a-menu>
      <a-menu-item key="1">
        <template #icon>
          <icon-home></icon-home>
        </template>
        首页
      </a-menu-item>
      <a-sub-menu key="2">
        <template #icon>
          <icon-user></icon-user>
        </template>
        <template #title>个人中心</template>
        <a-menu-item key="2-1">个人信息</a-menu-item>
        <a-menu-item key="2-2">收藏列表</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="3">
        <template #icon>
          <icon-user></icon-user>
        </template>
        <template #title>权限管理</template>
        <a-menu-item key="3-1">用户列表</a-menu-item>
        <a-menu-item key="3-2">角色列表</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="4">
        <template #icon>
          <icon-settings></icon-settings>
        </template>
        <template #title>权限管理</template>
        <a-menu-item key="4-1">日志列表</a-menu-item>
        <a-menu-item key="4-2">图片列表</a-menu-item>
        <a-menu-item key="4-3">站点配置</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import {IconHome, IconSettings, IconUser} from "@arco-design/web-vue/es/icon";
</script>

<style scoped>

</style>