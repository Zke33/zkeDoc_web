<template>
  <div class="gvd_slide">
    <div class="gvd_logo">
      <router-link to="/">
        <img src="/logo.png" alt="">
        <span>fengfeng docs</span>
      </router-link>
    </div>
    <div class="gvd_search">
      <a-input placeholder="搜索"></a-input>
    </div>
    <Gvd_doc_tree></Gvd_doc_tree>
  </div>
</template>

<script setup lang="ts">
import Gvd_doc_tree from "@/components/web/gvd_doc_tree.vue";

</script>