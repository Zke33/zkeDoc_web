<template>
  <router-view/>
</template>


<script setup lang="ts">
import {useStore} from "@/stores";
const store = useStore()

store.loadToken()
store.loadTheme()
</script>
<style>
.default-theme img {
  border: none!important;
}
</style>
