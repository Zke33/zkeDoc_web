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
      <a-tree
          blockNode
          :checkable="true"
          v-model:checked-keys="checkedKeys"
          :data="list"
      />
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

const props = defineProps({
  roleId: {
    type: Number
  }
})

const checkedKeys: Ref<number[]> = ref([]);
const list: Ref<roleDocItem[]> = ref([])

async function getList() {
  let res = await roleDocTreeApi(props.roleId)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  list.value = res.data.list
  checkedKeys.value = res.data.docIDList
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
  if (res.code){
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  getList()
}


</script>