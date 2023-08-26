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

<style lang="scss">
.gvd_slide {
  .gvd_logo {
    height: 60px;
    border-bottom: 1px solid var(--bg);

    a {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 40px;
        height: 40px;
      }

      span {
        margin-left: 10px;
        font-weight: 600;
        font-size: 18px;
      }
    }
  }

  .gvd_search {
    display: flex;
    padding: 10px;
    align-items: center;
  }
.gvd_doc_action{
  border-top: 1px solid var(--bg);
padding: 10px;

}
  .gvd_doc_tree {
    padding-top: 10px;
  }
}
</style>