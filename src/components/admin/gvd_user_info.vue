<template>
  <a-dropdown :popup-max-height="false">
    <span class="gvd_dropdown">fengfeng<icon-down/></span>

    <template #content>
      <a-doption v-for="item in menuList" @click="clickItem(item)">{{ item.title }}</a-doption>
    </template>
  </a-dropdown>
</template>
<script setup lang="ts">
import {IconDown} from "@arco-design/web-vue/es/icon";
import {Message} from "@arco-design/web-vue";
import router from "@/router";
import {logout} from "@/utils/logout";
import {useStore} from "@/stores";

const store = useStore()

interface tabItem {
  name: string
  title: string
}

let menuList: tabItem[] = [
  {name: "info", title: "个人信息"},
  {name: "logout", title: "注销退出"},
]

function getMenuList() {
  if (store.isAdmin) {
    menuList = [
      {name: "info", title: "个人信息"},
      {name: "users", title: "用户列表"},
      {name: "roles", title: "角色列表"},
      {name: "logs", title: "日志列表"},
      {name: "logout", title: "注销退出"},
    ]
  }
}

getMenuList()

function clickItem(item: tabItem) {
  if (item.name === "logout") {
    // 注销
    logout()
    router.push({name: "index"})
    return
  }
  router.push({name: item.name})


}


</script>
<style scoped>

</style>