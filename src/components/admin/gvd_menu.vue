<template>
  <div class="gvd_menu">
    <a-menu>
      <template v-for="item in menus" :key="item.key">
        <a-menu-item :key="item.key" v-if="item.child.length === 0">
          <template #icon>
            <component :is="item.icon"></component>
          </template>
          {{ item.title }}
        </a-menu-item>
        <a-sub-menu v-if="item.child.length !== 0" :key="item.key">
          <template #icon>
            <component :is="item.icon"></component>
          </template>
          <template #title>{{ item.title }}</template>
          <a-menu-item v-for="sub in item.child" :key="sub.key">
            {{ sub.title }}
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import {IconHome, IconSettings, IconUser} from "@arco-design/web-vue/es/icon";
import type {Component} from "vue";

interface MenuType {
  key: string
  title: string
  icon?: Component
  name?: string
  child: MenuType[]
}
let menus: MenuType[] = []

if (1){
  menus = [
    {key: "1", title: "首页", icon: IconHome, name: "home", child: []},
    {key: "2", title: "个人中心", icon: IconUser, name: "home", child: [
        {key: "2-1", title: "个人信息", icon: IconHome, name: "home", child: []},
        {key: "2-2", title: "收藏列表", icon: IconHome, name: "home", child: []},
      ]},
    {key: "3", title: "权限管理", icon: IconUser, name: "home", child: [
        {key: "3-1", title: "用户列表", icon: IconHome, name: "home", child: []},
        {key: "3-2", title: "角色列表", icon: IconHome, name: "home", child: []},
      ]},
    {key: "4", title: "系统管理", icon: IconSettings, name: "home", child: [
        {key: "4-1", title: "日志列表", icon: IconHome, name: "home", child: []},
        {key: "4-2", title: "图片列表", icon: IconHome, name: "home", child: []},
        {key: "4-3", title: "站点配置", icon: IconHome, name: "home", child: []},
      ]},
  ]
}else {
  menus = [
    {key: "1", title: "首页", icon: IconHome, name: "home", child: []},
    {key: "2", title: "个人中心", icon: IconUser, name: "home", child: [
        {key: "2-1", title: "个人信息", icon: IconHome, name: "home", child: []},
        {key: "2-2", title: "收藏列表", icon: IconHome, name: "home", child: []},
      ]},
  ]
}



</script>

<style scoped>

</style>