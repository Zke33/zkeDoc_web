<template>
  <div class="gvd_tabs">
    <span :class="{tab_item: true, active: route.name === item.name}" @click="clickItem(item)" v-for="item in tabList" :key="item.name">{{  item.title }}</span>
  </div>
</template>


<script setup lang="ts">

import {ref, watch} from "vue";
import type {Ref} from "vue";
import router from "@/router";
import {useRoute} from "vue-router";

const route = useRoute()

interface tabItem {
  name: string
  title: string
}

const tabList: Ref<tabItem[]> = ref([
  {name: "home", title: "首页"},
])

function clickItem(item: tabItem){
    router.push({name: item.name})
}

watch(()=>route.name, ()=>{
  // 判断是否存在
  if (!inList(route.name as string)){
    tabList.value.push({name: route.name as string, title: route.meta.title as string})
  }

}, {immediate: true})

function inList(name: string) :boolean {
  for (const tab of tabList.value) {
    if (tab.name === name){
      return true
    }
  }
  return false
}


</script>


<style scoped>

</style>