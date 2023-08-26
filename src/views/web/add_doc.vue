<template>
  <div class="add_doc_view">
    <div :class="{doc_main: true, isNoMdCatalog: isNoMdCatalog}">
      <div class="head">
        <a-input placeholder="文档标题" v-model="form.title"></a-input>
        <a-button type="primary" @click="onSave">发布</a-button>
      </div>
      <div class="body">
        <Gvd_md v-model="form.content" :editor-id="id" @onSave="onSave"></Gvd_md>
      </div>
    </div>
    <Gvd_md_catalog @catalog-show="catalogShow" :editor-id="id"></Gvd_md_catalog>
  </div>
</template>

<script setup lang="ts">
import Gvd_md from "@/components/admin/gvd_md.vue";
import Gvd_md_catalog from "@/components/web/gvd_md_catalog.vue";
import {reactive, ref} from "vue";
import {docCreateApi} from "@/api/doc_api";
import type {docCreateItem} from "@/api/doc_api";
import {Message} from "@arco-design/web-vue";
import router from "@/router";
import {useStore} from "@/stores";

const store = useStore()
const id = 'preview-view';

const isNoMdCatalog = ref(false)

function catalogShow(isShow: boolean) {
  isNoMdCatalog.value = isShow
}

const form = reactive<docCreateItem>({
  content: "",
  title: ""
})


async function onSave() {
  if (form.title === "") {
    Message.warning("文档标题不能为空")
    return
  }
  if (form.content === "") {
    Message.warning("文档内容不能为空")
    return
  }
  let res = await docCreateApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  await store.getDocTree()
  router.push({
    name: "doc",
    params: {
      id: res.data
    }
  })
}


</script>

<style lang="scss">
.add_doc_view {
  .doc_main {
    width: calc(100% - 240px);
    padding: 40px 20px 0 40px;
    transition: all 0.3s;

    .head {
      color: var(--color-text-1);
      margin-bottom: 10px;
      display: flex;
    }

    .body {
      .md-editor {
        height: calc(100vh - 120px)
      }
    }
  }

  .doc_main.isNoMdCatalog {
    width: 100%;

    & ~ section {
      transform: translateX(240px);
    }
  }
}
</style>