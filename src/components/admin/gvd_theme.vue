<template>
  <div @click="setTheme">
    <icon-moon-fill v-if="store.theme === 'dark'"/>
    <icon-sun-fill v-if="store.theme === ''"/>
  </div>
</template>

<script setup lang="ts">

import {IconMoonFill, IconSunFill} from "@arco-design/web-vue/es/icon";
import {useStore} from "@/stores";

const store = useStore()

function setTheme() {
  if (document.body.hasAttribute('arco-theme')) {
    // 变成白天
    store.setTheme("")
    document.body.removeAttribute('arco-theme')
  } else {
    // 变成黑夜
    store.setTheme("dark")
    document.body.setAttribute('arco-theme', 'dark')
  }
}
</script>