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

interface tabItem {
  name: string
  title: string
}

const menuList: tabItem[] = [
  {name: "info", title: "个人信息"},
  {name: "users", title: "用户列表"},
  {name: "roles", title: "角色列表"},
  {name: "logs", title: "日志列表"},
  {name: "logout", title: "注销退出"},
]

function clickItem(item: tabItem) {
  if (item.name === "logout") {
    // 注销
    Message.info("注销成功")
    return
  }
  router.push({name: item.name})


}


</script>
<style scoped>

</style>