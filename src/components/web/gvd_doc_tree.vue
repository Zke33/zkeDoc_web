<template>
  <div class="gvd_doc_action">
    <a-button type="outline" style="width: 100%;" @click="addDoc">添加</a-button>
  </div>
  <div class="gvd_doc_tree">
    <a-tree
        :data="store.docTree"
        v-model:selected-keys="data.selectedKeys"
        v-model:expanded-keys="data.expandedKeys"
        @select="selectNode" block-node>
      <template #extra="nodeData:docTreeItem">
            <span class="tree_extra">
                  <icon-lock v-if="nodeData.isPwd"></icon-lock>
                   <icon-eye v-if="nodeData.isSee"></icon-eye>
                  <icon-star-fill v-if="nodeData.isColl"></icon-star-fill>
                  <icon-unlock v-if="nodeData.unlock"></icon-unlock>
            </span>
      </template>
    </a-tree>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import type {docTreeItem} from "@/api/role_doc_api";
import type {Ref} from "vue";
import {Message} from "@arco-design/web-vue";
import {IconEye, IconLock, IconStarFill, IconUnlock} from "@arco-design/web-vue/es/icon";
import {useRouter, useRoute} from "vue-router";
import {useStore} from "@/stores";

const store = useStore()

interface dataType {
  selectedKeys: number[]
  expandedKeys: number[]
}

const data = reactive<dataType>({
  selectedKeys: [],
  expandedKeys: [],
})

const router = useRouter()
const route = useRoute()


function addDoc() {
  store.docTree.push({
    children: [],
    isPwd: false,
    isSee: false,
    isColl: false,
    unlock: false,
    key: 0,
    title: "新建文档"
  })
  data.selectedKeys = [0]
  router.push({
    name: "add_doc"
  })
}

if (route.name !== "index" && isNaN(Number(route.params.id))) {
  router.push({name: "index"})
}


function getParentIDList(list: docTreeItem[], key: number, parents: number[] = []): number[] {
  for (const doc of list) {
    if (doc.key == key) {
      // 如果要包含自身，那就把自己也带上
      // return [...parents, key]
      return [...parents]
    }
    if (doc.children.length > 0) {
      const newParents = [...parents, doc.key]
      const result = getParentIDList(doc.children, key, newParents)
      if (result.length > 0) {
        return result
      }
    }
  }
  return [];
}

async function getList() {
  await store.getDocTree()
  let parentIDList = getParentIDList(store.docTree, Number(route.params.id))
  data.expandedKeys = parentIDList
}

getList()

function selectNode(key: (string | number)[], data: any) {
  let node = data.node as docTreeItem
  router.push({
    name: "doc",
    params: {
      id: node.key,
    }
  })
}


watch(() => route.params, () => {
  if (route.name === "add_doc") {
    return
  }
  data.selectedKeys = [Number(route.params.id)]
}, {immediate: true})


</script>
<style lang="scss">
.gvd_doc_tree {
  .tree_extra {
    margin-left: auto;
    display: flex;

    svg {
      margin-right: 5px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .arco-tree-node {
    padding: 0 10px 0 5px;


    &:hover {
      background-color: rgb(var(--arcoblue-1));
    }

    .arco-tree-node-title {

      &:hover {
        background-color: inherit;
      }
    }
  }

  .arco-tree-node-selected {
    background-color: rgb(var(--arcoblue-5));

    &:hover {
      background-color: rgb(var(--arcoblue-6));
    }

    .arco-tree-node-title {
      color: white;

      &:hover {
        background-color: inherit;
      }
    }

    .arco-icon-hover {
      color: white;

      &:hover::before {
        background-color: inherit;
      }
    }

    .tree_extra {
      color: white;
    }
  }
}
</style>