<template>
  <a-breadcrumb>
    <template  v-for="item in breadList">
      <a-breadcrumb-item v-if="item.title !== ''">{{ item.title }}</a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref, watch} from "vue";
import type {Ref} from "vue";

const route = useRoute()
const breadList: Ref<breadType[]> = ref([])

interface breadType {
  title: string
  name?: string
}

watch(() => route.matched, (value) => {
  breadList.value = []
  value.forEach(item => {
    breadList.value.push({
      title: item.meta.title as string,
      name: item.name as string,
    })
  })
}, {immediate: true})


</script>

<style scoped>

</style>