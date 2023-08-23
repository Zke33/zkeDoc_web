<template>
  <div class="gvd_doc_view">
    <Gvd_slide></Gvd_slide>
    <div class="gvd_doc_main">
      <main>
        <div class="doc_head">
          <h2>文档标题</h2>
          <div class="doc_data">
            <span>浏览量： <b>325</b></span>
            <span>点赞量： <b>56</b></span>
            <span>收藏量： <b>2</b></span>
          </div>
          <div class="date">
            <span>发布时间：2023-12-12 12:34:12（6天前）</span>
          </div>
        </div>
        <div class="doc_body">
          <MdPreview :model-value="text"></MdPreview>
        </div>
      </main>
      <section>
        文档目录
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import {MdPreview} from 'md-editor-v3';
import {ref} from "vue";
import Gvd_slide from "@/components/web/gvd_slide.vue";

const text = ref("hello")
</script>

<style lang="scss">
.gvd_doc_view {
  display: flex;
  justify-content: space-between;
  height: 100vh;

  .gvd_slide {
    width: 300px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    border-right: 1px solid var(--bg);
    transition: all 0.3s;
    background-color: var(--color-bg-1);
  }

  .gvd_doc_main {
    width: calc(100vw - 300px);
    display: flex;
    justify-content: space-between;

    > main {
      width: calc(100% - 240px);
      padding: 40px 20px 0 40px;
    }

    > section {
      width: 240px;
      border-left: 1px solid var(--bg);
      transition: all 0.3s;
      background-color: var(--color-bg-1);
    }
  }
}
</style>