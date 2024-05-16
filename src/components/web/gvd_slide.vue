<template>
  <div :class="{ gvd_slide: true, noShow: noShow }">
    <div class="gvd_logo">
      <router-link to="/">
        <img src="/logo.png" alt="">
        <span>hmy docs</span>
      </router-link>
    </div>
    <a-modal title="全文搜索" v-model:visible="visible" :footer="false" body-class="search_modal">
      <div class="search_head">
        <a-input-search @press-enter="search" v-model="params.key" @search="search" placeholder="搜索" button-text="搜索"
          search-button />
      </div>
      <div class="search_body">
        <div class="item" v-for="item in data.list" @click="gotoDoc(item)">
          <div class="title" v-html="item.title"></div>
          <div class="body" v-html="item.body"></div>
        </div>
      </div>
      <div class="search_result" v-if="data.count">
        共搜索到结果 {{ data.count }} 条
      </div>
    </a-modal>
    <div class="gvd_search">
      <a-input @click="visible = true" placeholder="搜索"></a-input>
    </div>
    <div class="slide_icon" @click="noShow = !noShow">
      <icon-menu />
    </div>
    <Gvd_doc_tree></Gvd_doc_tree>
  </div>
</template>

<script setup lang="ts">
import Gvd_doc_tree from "@/components/web/gvd_doc_tree.vue";
import { reactive, ref } from "vue";
import { docSearchApi } from "@/api/doc_api";
import type { searchItem } from "@/api/doc_api";
import type { Params } from "@/api";
import { Message } from "@arco-design/web-vue";
import { onUnmounted } from "vue";
import { IconMenu } from "@arco-design/web-vue/es/icon";

const visible = ref(false)

const noShow = ref(false)

function keydownEvent(e: KeyboardEvent) {
  if (e.key === "[" && e.ctrlKey) {
    noShow.value = !noShow.value
  }
}

window.addEventListener("keydown", keydownEvent)

onUnmounted(() => {
  window.removeEventListener("keydown", keydownEvent)
})


const data = reactive<{ list: searchItem[], count: number }>({
  list: [],
  count: 0,
})

const params = reactive<Params>({
  key: "",
})

function gotoDoc(item: searchItem) {
  window.open("/doc/" + item.slug, "_href")
}


async function search() {
  let res = await docSearchApi(params)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.list = res.data.list
  data.count = res.data.count
}

</script>

<style lang="scss">
.gvd_slide {
  .slide_icon {
    position: absolute;
    bottom: 10px;
    left: 10px;
    cursor: pointer;
    transition: all 0.3s;

    svg {
      font-size: 20px;
      color: rgb(var(--arcoblue-6));
    }
  }

  &.noShow {
    .slide_icon {
      left: 310px;
    }
  }
}

.search_modal {
  padding: 0;

  .search_head {
    padding: 10px 20px;
    display: flex;
  }

  .search_body {
    max-height: 60vh;
    overflow-x: hidden;
    overflow-y: auto;

    .item {
      padding: 10px 20px;
      cursor: pointer;

      &:hover {
        background-color: var(--color-fill-1);
      }

      .title {
        font-size: 18px;
        color: var(--color-text-1);
      }

      .body {
        color: var(--color-text-2);


      }

      em {
        color: red;
      }
    }
  }

  .search_result {
    text-align: center;
    margin: 5px 0;
    color: var(--color-text-3);
  }
}
</style>