<template>
  <div class="index_view">
    <Gvd_banner></Gvd_banner>
    <div class="gvd_docs_view">
      <Gvd_slide :class="{fixed: sideFixed}"></Gvd_slide>
      <div class="doc_main">
        <MdPreview :model-value="store.site.content" :theme="store.theme"></MdPreview>
      </div>
    </div>
    <Gvd_fixed_menu></Gvd_fixed_menu>
  </div>
</template>

<script setup lang="ts">
import Gvd_fixed_menu from "@/components/web/gvd_fixed_menu.vue";
import Gvd_banner from "@/components/web/gvd_banner.vue";
import Gvd_slide from "@/components/web/gvd_slide.vue";
import {MdPreview, MdCatalog} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {useStore} from "@/stores";
import {ref, onUnmounted} from "vue";

const store = useStore()

const sideFixed = ref(false)

function scrollEvent() {
  if (document.documentElement.scrollTop >= window.innerHeight) {
    sideFixed.value = true
  } else {
    sideFixed.value = false
  }
}

window.addEventListener("scroll", scrollEvent)

onUnmounted(() => {
  window.removeEventListener("scroll", scrollEvent)
})

</script>

<style lang="scss">
.index_view {
  font-family: Adobe Source Sans Pro;

  .gvd_docs_view {
    min-height: 100vh;
    width: 100%;
    background-color: var(--doc_bg);
    display: flex;

    .gvd_slide {
      width: 300px;
      height: 100vh;
      border-right: 1px solid var(--doc_border);
      background-color: var(--doc_bg);
    }

    .gvd_slide.fixed {
      position: fixed;
      left: 0;
      top: 0;

      & ~ .doc_main {
        margin-left: 300px;
      }
    }

    .doc_main {
      width: calc(100% - 300px);
    }
  }
}
</style>
