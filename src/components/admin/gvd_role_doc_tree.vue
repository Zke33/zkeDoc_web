<template>
  <div class="gvd_role_doc_tree">
    <div class="head">
      <div class="left">
        文档列表
      </div>
      <div class="right">
        <a-button type="primary" size="small" @click="updateRoleDocTree">更新</a-button>
      </div>
    </div>
    <div class="body">
      <div class="actions">
        <span><a-checkbox v-model="checkStrictly">父子关联</a-checkbox></span>
        <span><a-checkbox @change="allIn">全选</a-checkbox></span>
      </div>
      <div class="tree">
        <a-tree
            blockNode
            :check-strictly="!checkStrictly"
            :checkable="true"
            v-model:checked-keys="checkedKeys"
            :data="list"
        >
          <template #extra="nodeData:roleDocItem">
            <span class="tree_extra">
                  <icon-lock v-if="nodeData.isPwd"></icon-lock>
                   <icon-eye v-if="nodeData.isSee"></icon-eye>
            </span>

          </template>
        </a-tree>
      </div>

    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import type {Ref} from "vue"
import {roleDocTreeApi} from "@/api/role_doc_api";
import type {roleDocItem} from "@/api/role_doc_api";
import {Message} from "@arco-design/web-vue";
import {roleDocTreeUpdateApi} from "@/api/role_doc_api";
import type {roleDocUpdateItem} from "@/api/role_doc_api";
import {IconLock, IconEye} from "@arco-design/web-vue/es/icon";

const props = defineProps({
  roleId: {
    type: Number
  }
})

const checkedKeys: Ref<number[]> = ref([]);
const list: Ref<roleDocItem[]> = ref([])
const docIDAllList: Ref<number[]> = ref([])
const checkStrictly = ref(true)


// 把接收的列表，当做返回值返回
function getDocIDAllList(docList: roleDocItem[]): number[] {
  let docIDList: number[] = []
  for (const docItem of docList) {
    docIDList.push(docItem.key)
    if (docItem.children.length > 0) {
      docIDList = docIDList.concat(getDocIDAllList(docItem.children))
    }
  }
  return docIDList
}


async function getList() {
  let res = await roleDocTreeApi(props.roleId)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  list.value = res.data.list
  checkedKeys.value = res.data.docIDList
  docIDAllList.value = getDocIDAllList(list.value)
}

getList()


async function updateRoleDocTree() {
  const docList: roleDocUpdateItem[] = []
  for (const docID of checkedKeys.value) {
    docList.push({
      docID: docID,
    })
  }
  let res = await roleDocTreeUpdateApi(props.roleId, docList)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  getList()
}


function allIn(val: boolean) {
  if (val) {
    // 全选
    checkedKeys.value = docIDAllList.value
    return
  }
  // 非全选
  checkedKeys.value = []
}

</script>


<style lang="scss">
.gvd_role_doc_tree {
  border-right: 1px solid var(--bg);
  height: calc(100vh - 48px);

  .head {
    height: 40px;
    border-bottom: 1px solid var(--bg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }

  .body {
    padding: 10px 20px;

    .actions {
      background-color: var(--color-fill-2);
      padding: 10px 0;
    }

    .tree {
      margin-top: 10px;

      .tree_extra {
        display: flex;

        svg {
          margin-right: 5px;

          &:last-child {
            margin-right: 0;
          }
        }
      }

      .arco-tree-node {

      }

      .arco-tree-node-selected {
        background-color: rgb(var(--arcoblue-5));

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

        .tree_extra{
          color: white;
        }
      }
    }
  }
}
</style>