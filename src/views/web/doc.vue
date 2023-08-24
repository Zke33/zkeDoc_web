<template>
  <div class="gvd_doc_view">
    <Gvd_slide></Gvd_slide>
    <gvd_fixed_menu></gvd_fixed_menu>
    <div class="gvd_doc_main">
      <main>
        <div class="doc_head">
          <h1>文档标题</h1>
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
          <MdPreview :model-value="text" :theme="store.theme"></MdPreview>
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
import Gvd_fixed_menu from "@/components/web/gvd_fixed_menu.vue";
import LongMd from "@/assets/md/long.md?raw"
import SortMd from "@/assets/md/sort.md?raw"
import 'md-editor-v3/lib/style.css';
import {useStore} from "@/stores";

const store = useStore()
const text = ref(LongMd)
</script>

<style lang="scss">
.gvd_doc_view {
  display: flex;
  justify-content: space-between;

  .gvd_slide {
    width: 300px;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    overflow-x: hidden;
    overflow-y: auto;
    border-right: 1px solid var(--doc_border);
    transition: all 0.3s;
    background-color: var(--doc_bg);
  }

  .gvd_doc_main {
    width: calc(100vw - 300px);
    display: flex;
    justify-content: space-between;
    background-color: var(--doc_bg);
    margin-left: 300px;

    > main {
      width: calc(100% - 240px);
      padding: 40px 20px 0 40px;
      .doc_head{
        color: var(--color-text-2);
        h1{
          color: var(--md-theme-color);
        }
        .doc_data{
          margin-bottom: 10px;
          >span{
            margin-right: 10px;
          }
        }
      }

      .md-editor-preview-wrapper{
       padding: 0;
      }
    }

    > section {
      width: 240px;
      border-left: 1px solid var(--doc_border);
      transition: all 0.3s;
      background-color: var(--doc_bg);
      position: fixed;
      height: 100vh;
      right: 0;
      top: 0;
      z-index: 1;
    }
  }
}
</style>