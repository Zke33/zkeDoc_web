<template>
  <div class="gvd_drawer_body">
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
          <div class="left">
            <span><a-checkbox v-model="checkStrictly">父子关联</a-checkbox></span>
            <span><a-checkbox @change="allIn">全选</a-checkbox></span>
          </div>
          <div class="right">
            <span class="flush" @click="flush"><icon-refresh/></span>
          </div>
        </div>
        <div class="tree">
          <a-tree
              blockNode
              :check-strictly="!checkStrictly"
              :checkable="true"
              v-model:checked-keys="checkedKeys"
              :data="list"
              @select="selectNode"
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
    <Gvd_doc_config
        @update="docConfigUpdateEvent"
        @create="docConfigCreateEvent"
        :role-id="props.roleId"
        :doc-item="docItem"
        :doc-id="docID"></Gvd_doc_config>
  </div>
</template>
<script setup lang="ts">
import Gvd_doc_config from "@/components/admin/gvd_doc_config.vue";
import {ref} from "vue";
import type {Ref} from "vue"
import {roleDocTreeApi} from "@/api/role_doc_api";
import type {roleDocItem} from "@/api/role_doc_api";
import {Message} from "@arco-design/web-vue";
import {roleDocTreeUpdateApi} from "@/api/role_doc_api";
import type {roleDocUpdateItem} from "@/api/role_doc_api";
import {IconLock, IconEye, IconRefresh} from "@arco-design/web-vue/es/icon";

interface Props {
  roleId: number
}

const props = defineProps<Props>()
const checkedKeys: Ref<number[]> = ref([]);
const list: Ref<roleDocItem[]> = ref([])
const docIDAllList: Ref<number[]> = ref([])
const checkStrictly = ref(false)

const docID: Ref<undefined | number> = ref()
const docItem: Ref<roleDocItem|undefined> = ref()
function selectNode(key: (string | number)[], data: any) {
  let node = data.node as roleDocItem
  docID.value = node.key
  docItem.value = node
}

function docConfigUpdateEvent() {
  getList()
}

function docConfigCreateEvent() {
  checkedKeys.value.push(docID.value as number);
  (docItem.value as roleDocItem).show = true
}

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

async function flush(){
  await getList()
  Message.success("刷新成功")
}

async function getList() {
  let res = await roleDocTreeApi(props.roleId as number)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  list.value = res.data.List
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
  let res = await roleDocTreeUpdateApi(props.roleId as number, docList)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  getList()
}


function allIn(value: (boolean | (string | number | boolean)[]), ev: Event) {
  if (value as boolean) {
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
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .flush {
        cursor: pointer;
      }
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

        .tree_extra {
          color: white;
        }
      }
    }
  }
}
</style>