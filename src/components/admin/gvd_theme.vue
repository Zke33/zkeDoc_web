<template>
  <icon-moon-fill v-if="theme === 'dark'"  @click="setTheme"/>
  <icon-sun-fill v-if="theme === ''" @click="setTheme"/>
</template>

<script setup lang="ts">

import {IconMoonFill, IconSunFill} from "@arco-design/web-vue/es/icon";
import {ref} from "vue";
import type {Ref} from "vue";
const theme:Ref<""|"dark"> = ref("")
function setTheme(){
  if (document.body.hasAttribute('arco-theme')){
    // 变成白天
    theme.value = ""
    document.body.removeAttribute('arco-theme')
  }else {
    // 变成黑夜
    theme.value = "dark"
    document.body.setAttribute('arco-theme', 'dark')
  }
}
</script>