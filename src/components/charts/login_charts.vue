<template>
  <div class="login_chart">
    <div class="select">
      <a-select placeholder="时间过滤" allow-clear v-model="params.type" @change="getData"
                :options="options"></a-select>
    </div>
    <Login_charts_inner v-if="isShow" :data="data"></Login_charts_inner>
  </div>

</template>

<script setup lang="ts">
import {dataLoginList} from "@/api/data_api";
import type {loginData, dataLoginParams} from "@/api/data_api";
import Login_charts_inner from "@/components/charts/login_charts_inner.vue";
import {reactive, ref, watch} from "vue";
import {Message} from "@arco-design/web-vue";
import {useStore} from "@/stores";
import * as fs from "fs";


const store = useStore()

const data = reactive<loginData>({
  dateList: [],
  countList: [],
})

const options = [
  {label: "七天内", value: 0},
  {label: "一月内", value: 1},
  {label: "一年内", value: 2},
]

const params = reactive<dataLoginParams>({
  type: 0,
})

const isShow = ref(false)

async function getData() {
  isShow.value = false
  let res = await dataLoginList(params)
  isShow.value = true
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(data, res.data)
}


getData()

watch(() => store.theme, () => {
  isShow.value = false
  setTimeout(() => {
    isShow.value = true
  })
})

</script>
<style lang="scss">
.login_chart {
  background-color: var(--color-bg-1);
  border-radius: 5px;
  position: relative;

  .select {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 1;
  }
}
</style>