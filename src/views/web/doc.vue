<template>
  <div class="gvd_doc_view">
    <Gvd_slide></Gvd_slide>
    <gvd_fixed_menu></gvd_fixed_menu>
    <div class="gvd_doc_main">
      <main>
        <div class="doc_head">
          <h1>{{ data.title }}</h1>
          <div class="doc_data">
            <span>浏览量： <b>{{  data.lookCount }}</b></span>
            <span>点赞量： <b>{{  data.diggCount }}</b></span>
            <span>收藏量： <b>{{  data.collCount }}</b></span>
          </div>
          <div class="date">
            <span>发布时间：{{ dateTimeFormat(data.createdAt) }}（{{ relativeToCurrentTime(data.createdAt) }}）</span>
          </div>
        </div>
        <div class="doc_body">
          <MdPreview :editorId="id" :model-value="data.content" :theme="store.theme"></MdPreview>
        </div>
      </main>
      <section>
        <div class="head">
          文档目录
        </div>
        <div class="body">
          <MdCatalog :editorId="id" :scrollElement="scrollElement"/>
        </div>

      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import {MdPreview, MdCatalog} from 'md-editor-v3';
import {reactive, ref, watch} from "vue";
import Gvd_slide from "@/components/web/gvd_slide.vue";
import Gvd_fixed_menu from "@/components/web/gvd_fixed_menu.vue";
import LongMd from "@/assets/md/long.md?raw"
import SortMd from "@/assets/md/sort.md?raw"
import catalogMd from "@/assets/md/catalog.md?raw"
import 'md-editor-v3/lib/style.css';
import {useStore} from "@/stores";
import {useRoute} from "vue-router";
import {getDocDetailApi} from "@/api/doc_api";
import type {docItem} from "@/api/doc_api";
import {Message} from "@arco-design/web-vue";
import {dateTimeFormat, relativeToCurrentTime} from "@/utils/datetime";

const route = useRoute()
const id = 'preview-only';
const scrollElement = document.documentElement;
const store = useStore()
// const text = ref(catalogMd)

const data = reactive<docItem>({
  collCount: 0,
  content: "",
  createdAt: "",
  diggCount: 0,
  isColl: false,
  isPwd: false,
  isSee: false,
  lookCount: 0,
  title: "",
})

async function getDocContent(id: number){
  let res = await getDocDetailApi(id)
  if (res.code){
    Message.error(res.msg)
    return
  }
  Object.assign(data, res.data)
}


watch(()=>route.params, ()=>{
  const id = Number(route.params.id)
  if (isNaN(id)){
    console.log("错误了", route.params)
    return
  }
  getDocContent(id)
}, {immediate: true})


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

      .doc_head {
        color: var(--color-text-2);

        h1 {
          color: var(--md-theme-color);
        }

        .doc_data {
          margin-bottom: 10px;

          > span {
            margin-right: 10px;
          }
        }
      }

      .md-editor-preview-wrapper {
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
      color: var(--color-text-2);

      .head {
        height: 40px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid var(--doc_border);
        padding: 0 20px;
      }

      .body {
        padding: 10px 20px;
        max-height: calc(100vh - 400px);
        overflow-y: auto;

        &:hover{
          &::-webkit-scrollbar{
            background-color: #eee;
          }
          &::-webkit-scrollbar-thumb {
            background-color: #999;
            box-shadow: inset 1px 1px 2px rgba(0, 0, 0, .1);
            border: 1px solid #d8d8d8;
          }
        }

        &::-webkit-scrollbar {
          background-color: transparent;
          transition: all 0.3s;
          width: 8px;
        }


        &::-webkit-scrollbar-thumb {
          background-color: transparent;
          border-radius: 4px;
          box-shadow: inset 1px 1px 2px transparent;
          border: 1px solid transparent;
        }
      }

      .md-editor-catalog-link > span {

        &:hover {
          color: rgb(var(--arcoblue-6));
        }
      }

      .md-editor-catalog-active > span {
        color: rgb(var(--arcoblue-5));

        &:hover {
          color: rgb(var(--arcoblue-6));
        }
      }
    }
  }
}
</style>