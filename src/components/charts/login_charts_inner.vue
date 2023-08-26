<template>
  <div :id="props.chartId" style="height: 220px"></div>
</template>

<script setup lang="ts">

import {onMounted} from "vue";
import * as echarts from "echarts"
import type {loginData} from "@/api/data_api";
import {useStore} from "@/stores";

const store = useStore()

interface Props {
  data: loginData,
  title: string,
  chartId: string,
  seriesName: string
}

const props = defineProps<Props>()

function getData() {
  // 线段的颜色
  let bg = "#f0eeee"
  // 文字的颜色
  let textColor = "#555555"
  // 主题的颜色
  let themeColor = ['#2184fc', '#212cfc']

  if (store.theme === "dark") {
    // 线段的颜色
    bg = "#464646"
    // 文字的颜色
    textColor = "#e3e3e3"
    // 主题的颜色
    themeColor = ['#45d047', '#d51bc4']
  }


  let chartDom = document.getElementById(props.chartId);
  let myChart = echarts.init(chartDom);
  let option;
  option = {
    // 左上角文字
    title: {
      text: props.title,
      textStyle: {
        color: textColor
      },
      padding: [20, 20],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    toolbox: {},
    grid: {
      left: '3%',
      right: '5%',
      bottom: '8%',
      containLabel: true,
    },
    xAxis:
        {
          type: 'category',
          boundaryGap: false,
          data: props.data.dateList,
          axisLine: {
            lineStyle: {
              // color: "red"
            }
          },
          splitLine: {
            // show: true
          }
        }
    ,
    yAxis:
        {
          type: 'value',
          axisLine: {},
          splitLine: {
            show: true,
            lineStyle: {
              color: bg
            }
          }
        }
    ,
    series: [
      {
        name: props.seriesName,
        type: 'line',
        areaStyle: {},
        smooth: true,//设置折线图平滑
        emphasis: {
          focus: 'series'
        },
        data: props.data.countList,
      }
    ],
    color: themeColor
  };

  window.onresize = myChart.resize

  option && myChart.setOption(option);
}

onMounted(() => {
  getData()
})
</script>
<style scoped lang="scss">

</style>