<template>
  <div>
    <gvd_md v-model="text"/>
  </div>
</template>

<script setup lang="ts">
import Gvd_md from "@/components/admin/gvd_md.vue";
import {ref, watch} from "vue";

const text = ref("你好")

watch(text, ()=>{
  console.log("父组件的text", text.value)
})


</script>