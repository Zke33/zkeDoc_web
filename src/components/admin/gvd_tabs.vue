<template>
  <div class="gvd_tabs">
    <span
        :class="{tab_item: true, active: route.name === item.name}"
        @click="clickItem(item)"
        @click.middle="closeItem(item)"
        v-for="item in tabList"
        :key="item.name">
      {{ item.title }}
      <icon-close @click.stop="closeItem(item)" v-if="item.name !== 'home'"/>
    </span>

    <span class="tab_item close_tab_item" @click="closeAllTab">全部关闭</span>
  </div>
</template>


<script setup lang="ts">

import {ref, watch} from "vue";
import type {Ref} from "vue";
import router from "@/router";
import {useRoute} from "vue-router";
import {IconClose} from "@arco-design/web-vue/es/icon";

const route = useRoute()

interface tabItem {
  name: string
  title: string
}

const tabList: Ref<tabItem[]> = ref([
  {name: "home", title: "首页"},
])

function clickItem(item: tabItem) {
  router.push({name: item.name})
}

// 关闭tab
function closeItem(item: tabItem) {
  if (item.name === "home") {
    return
  }
  // 点击的是自己当前所在页面的话
  // 点击其他页面

  // 先删除点击的这个tab
  let index = tabList.value.findIndex((tab) => item.name === tab.name)
  tabList.value.splice(index, 1)
  setStoreByTabList()

  // 如果是点击当前所在页面
  if (item.name === route.name as string) {
    // 找到删除的那个tab的前一个
    let beforeIndex = index - 1
    let beforeItem = tabList.value[beforeIndex]
    clickItem(beforeItem)
  }
}

// 关闭全部的tab
function closeAllTab() {
  tabList.value = [{name: "home", title: "首页"}]
  if (route.name !== "home") {
    router.push({name: "home"})
  }
  setStoreByTabList()
}

// 更新tabs到store
function setStoreByTabList() {
  localStorage.setItem("tabList", JSON.stringify(tabList.value))
}

// 加载tabs
function loadStoreByTabList() {
  let val = localStorage.getItem("tabList")
  if (val === null) {
    return
  }
  let tabs = []
  try {
    tabs = JSON.parse(val)
  }catch (e){
    return;
  }
  tabList.value = tabs
}

loadStoreByTabList()

watch(() => route.name, () => {
  // 判断是否存在
  if (!inList(route.name as string)) {
    tabList.value.push({name: route.name as string, title: route.meta.title as string})
    // 更新到store里面去
    setStoreByTabList()
  }

}, {immediate: true})

// 判断名称在不在列表
function inList(name: string): boolean {
  for (const tab of tabList.value) {
    if (tab.name === name) {
      return true
    }
  }
  return false
}


</script>