<template>
  <div class="gvd_doc_tree_view">
    <div class="gvd_doc_action" v-if="store.isAdmin">
      <a-button type="outline" style="width: 100%;" @click="addDoc">添加</a-button>
    </div>
    <a-modal title="删除文档" v-model:visible="visible" :on-before-ok="removeDoc">
      确定要删除 文档：{{ formRemoveDoc.title }} 吗
    </a-modal>
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
                 <a-dropdown v-if="store.isAdmin && !nodeData.isAdd">
                    <icon-more/>
                  <template #content>
                    <a-doption @click="addChildDoc(nodeData)">添加文档</a-doption>
                    <a-doption @click="editDoc(nodeData)">编辑文档</a-doption>
                    <a-doption @click="removeDocModal(nodeData)">删除文档</a-doption>
                  </template>
                </a-dropdown>
            </span>
        </template>
      </a-tree>
    </div>
  </div>

</template>

<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import type {docTreeItem} from "@/api/role_doc_api";
import type {Ref} from "vue";
import {Message} from "@arco-design/web-vue";
import {IconEye, IconLock, IconStarFill, IconUnlock, IconMore} from "@arco-design/web-vue/es/icon";
import {useRouter, useRoute} from "vue-router";
import {useStore} from "@/stores";
import {removeDocApi} from "@/api/doc_api";

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

const visible = ref(false)
const formRemoveDoc = reactive<{ id: undefined | number, title: string }>({
  id: undefined,
  title: ""
})

function removeDocModal(item: docTreeItem) {
  visible.value = true
  formRemoveDoc.id = item.key
  formRemoveDoc.title = item.title
}

async function removeDoc() {
  let res = await removeDocApi(formRemoveDoc.id as number)
  if (res.code) {
    Message.error(res.msg)
    return false
  }
  Message.success(res.msg)
  visible.value = false
  store.getDocTree()
}


function editDoc(item: docTreeItem) {
  data.selectedKeys = [item.key]
  router.push({
    name: "edit_doc",
    params: {
      id: item.key,
    }
  })
}

// 添加子文档
function addChildDoc(item: docTreeItem) {
  const key = new Date().getTime()

  item.children.push({
    children: [],
    isPwd: false,
    isSee: false,
    isColl: false,
    unlock: false,
    key: key,
    title: "新建文档",
    isAdd: true,
    parentID: item.key,
  })
  data.expandedKeys.push(item.key)
  data.selectedKeys = [key]
  router.push({
    name: "add_doc",
    query: {
      parentID: item.key,
    }
  })

}

// 添加根文档
function addDoc() {
  // 添加之前查一下
  const item = store.docTree.find((item) => item.isAdd === true)
  if (item !== undefined) {
    // 说明之前已经有新建文档还没保存
    data.selectedKeys = [item.key]
    router.push({
      name: "add_doc"
    })
    return
  }


  const key = new Date().getTime()
  store.docTree.push({
    children: [],
    isPwd: false,
    isSee: false,
    isColl: false,
    unlock: false,
    key: key,
    title: "新建文档",
    isAdd: true,
  })
  // key不能为0
  data.selectedKeys = [key]
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
  if (node.isAdd as boolean) {
    router.push({
      name: "add_doc",
      query: {
        parentID: node.parentID
      }
    })
    return
  }
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
.gvd_doc_tree_view {
  padding-top: 10px;
  border-top: 1px solid var(--bg);

  .gvd_doc_action {
    margin-bottom: 10px;
    padding: 0 10px;
  }

  .gvd_doc_tree {

  }
}

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