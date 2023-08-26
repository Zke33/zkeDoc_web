<template>
  <div class="add_doc_view">
    <div class="doc_main">
      <div class="head">
        <h2>新建文本文档</h2>
      </div>
      <div class="body">
        <Gvd_md :editor-id="id"></Gvd_md>
      </div>
    </div>
    <section>
      <div class="head">
        文档目录
      </div>
      <div class="body">
        <MdCatalog :editorId="id"/>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Gvd_md from "@/components/admin/gvd_md.vue";
import {MdCatalog} from 'md-editor-v3';

const id = 'preview-view';


</script>

<style lang="scss">
.add_doc_view {
  .doc_main {
    width: calc(100% - 240px);
    padding: 40px 20px 0 40px;
    .head{
      color: var(--color-text-1);
    }
    .body{
      .md-editor{
        height: calc(100vh - 120px)
      }
    }
  }

  section {
    width: 240px;
    height: 100vh;
    background-color: var(--doc_bg);
    z-index: 1;
    color: var(--color-text-2);
    border-left: 1px solid var(--bg);
    position: fixed;
    right: 0;
    top: 0;
  }
}
</style>