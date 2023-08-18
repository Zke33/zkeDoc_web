

<template>
   <div class="gvd_view">
<div>用户列表</div>
  </div>
</template>

<script setup lang="ts">
import {userListApi} from "@/api/user_api";

async function getList(){
  let res = await userListApi()
  console.log(res)
}
getList()
</script>

<style scoped>

</style>