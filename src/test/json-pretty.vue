<template>
  <div class="json-body">
<!--    <vue-json-pretty :data="data"/>-->
  </div>
</template>

<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import {h, createApp, onMounted} from "vue"

const data = {
  code: 0,
  data: "你好"
}

function getJson(){
  const vNode = h(VueJsonPretty, {data: data})
  const app = createApp({render: ()=>vNode})
  app.mount(".json-body")
}

onMounted(()=>{
  getJson()
})

</script>