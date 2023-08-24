<template>
  <div class="gvd_slide">
    <div class="gvd_logo">
      <div>logo</div>
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

<style lang="scss">
.gvd_slide {
  .gvd_logo {
    height: 60px;
    background-color: rgb(var(--arcoblue-1));
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .gvd_search {
    display: flex;
    padding: 10px;
    align-items: center;
  }

  .gvd_doc_tree{
    border-top: 1px solid var(--bg);
    padding-top: 10px;
  }
}
</style>