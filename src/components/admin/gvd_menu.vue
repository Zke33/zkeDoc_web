<template>
  <div class="gvd_menu">
    <a-menu @menu-item-click="clickMenu"
            v-model:open-keys="defaultOpenKeys"
            v-model:selected-keys="defaultSelectedKeys"
            show-collapse-button
            @collapse="onCollapse"
    >
      <template v-for="item in menus" :key="item.key">
        <a-menu-item :key="item.name" v-if="item.child.length === 0">
          <template #icon>
            <component :is="item.icon"></component>
          </template>
          {{ item.title }}
        </a-menu-item>
        <a-sub-menu v-if="item.child.length !== 0" :key="item.name">
          <template #icon>
            <component :is="item.icon"></component>
          </template>
          <template #title>{{ item.title }}</template>
          <a-menu-item v-for="sub in item.child" :key="sub.name">
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
import router from "@/router";
import {ref, watch} from "vue";
import {useRoute} from "vue-router";

const emits = defineEmits(["collapse"])

function onCollapse(val: boolean, type: string) {
  emits("collapse", val)
}


const route = useRoute()

interface MenuType {
  key: string
  title: string
  icon?: Component
  name?: string
  child: MenuType[]
}

let menus: MenuType[] = []

if (1) {
  menus = [
    {key: "1", title: "首页", icon: IconHome, name: "home", child: []},
    {
      key: "2", title: "个人中心", icon: IconUser, name: "user_center", child: [
        {key: "2-1", title: "个人信息", icon: IconHome, name: "info", child: []},
        {key: "2-2", title: "收藏列表", icon: IconHome, name: "coll", child: []},
      ]
    },
    {
      key: "3", title: "权限管理", icon: IconUser, name: "auths", child: [
        {key: "3-1", title: "用户列表", icon: IconHome, name: "users", child: []},
        {key: "3-2", title: "角色列表", icon: IconHome, name: "roles", child: []},
      ]
    },
    {
      key: "4", title: "系统管理", icon: IconSettings, name: "settings", child: [
        {key: "4-1", title: "日志列表", icon: IconHome, name: "logs", child: []},
        {key: "4-2", title: "图片列表", icon: IconHome, name: "images", child: []},
        {key: "4-3", title: "站点配置", icon: IconHome, name: "sites", child: []},
      ]
    },
  ]
} else {
  menus = [
    {key: "1", title: "首页", icon: IconHome, name: "home", child: []},
    {
      key: "2", title: "个人中心", icon: IconUser, name: "", child: [
        {key: "2-1", title: "个人信息", icon: IconHome, name: "user_center", child: []},
        {key: "2-2", title: "收藏列表", icon: IconHome, name: "user_coll", child: []},
      ]
    },
  ]
}

function clickMenu(key: string) {
  router.push({name: key})
}


const defaultSelectedKeys = ref([route.name])
const defaultOpenKeys = ref([route.matched[1].name])


watch(() => route.name, () => {
  defaultSelectedKeys.value = [route.name]
  defaultOpenKeys.value = [route.matched[1].name]
})

</script>