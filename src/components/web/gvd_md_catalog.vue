<template>
  <section class="gvd_md_catalog">
    <div class="gvd_md_catalog_icon" @click="mdCataLogShow">
      <icon-right-circle v-if="!isNoMdCatalog"/>
      <icon-left-circle v-else/>
    </div>
    <div class="head">
      文档目录
    </div>
    <div class="body">
      <MdCatalog :editorId="props.editorId" :scrollElement="props.scrollElement"/>
      <slot></slot>
    </div>
  </section>
</template>


<script setup lang="ts">
import {MdCatalog} from 'md-editor-v3';
import {onUnmounted, ref} from "vue";
import {IconRightCircle, IconLeftCircle} from "@arco-design/web-vue/es/icon";

const props = defineProps({
  editorId: {
    type: String
  },
  scrollElement: {
    type: HTMLElement
  }
})

const emits = defineEmits(["catalogShow"])


const isNoMdCatalog = ref(false)


function mdCataLogShow() {
  isNoMdCatalog.value = !isNoMdCatalog.value
  emits("catalogShow", isNoMdCatalog.value)
}

function keydownEvent(e: KeyboardEvent) {
  if (e.key === "]" && e.ctrlKey) {
    mdCataLogShow()
  }
}


window.addEventListener("keydown", keydownEvent)

onUnmounted(() => {
  window.removeEventListener("keydown", keydownEvent)
})

</script>

<style lang="scss">
.gvd_md_catalog {
  width: 240px;
  transform: translateX(0);
  border-left: 1px solid var(--doc_border);
  transition: all 0.3s;
  background-color: var(--doc_bg);
  position: fixed;
  height: 100vh;
  right: 0;
  top: 0;
  z-index: 1;
  color: var(--color-text-2);
  transition: all 0.3s;

  .gvd_md_catalog_icon {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s;

    > svg {
      font-size: 20px;
    }
  }

  &:hover {
    .gvd_md_catalog_icon {
      opacity: 1;
    }
  }

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

    &:hover {
      &::-webkit-scrollbar {
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

    .doc_action {
      position: fixed;
      bottom: 100px;
      right: 93px;
      z-index: 101;

      .item {
        border: 1px solid var(--doc_border);
        width: 50px;
        height: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
        cursor: pointer;
        border-radius: 5px;

        svg {
          font-size: 20px;
        }

        span {
          font-size: 12px;
        }

        &.active {
          color: rgb(var(--arcoblue-6));
        }
      }
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
</style>