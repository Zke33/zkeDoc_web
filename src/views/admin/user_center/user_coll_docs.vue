<template>
  <div>
    <Gvd_table
        url="/api/user_center/user_coll"
        :columns="columns"
        :is-add="false"
        :is-edit="false"
        row-key="docID"
        @batch-delete="removeBatchCollDoc"
        search-placeholder="搜索文档标题"
        ref="gvdTable"
        remove-label="取消收藏"
        remove-batch-label="批量取消收藏"
        @delete="removeCollDoc"
    >
      <template #isPermission="{record}:{record: userCollItem}">
        <template v-if="record.isPermission">
          <a-link :href="'/doc/'+record.docID">
            <a-tag color="blue">可访问
              <icon-send style="margin-left: 5px"/>
            </a-tag>
          </a-link>
        </template>

        <a-tag v-else color="red">无权限</a-tag>
      </template>
    </Gvd_table>
  </div>
</template>

<script setup lang="ts">
import Gvd_table from "@/components/admin/gvd_table.vue";
import type {userCollItem} from "@/api/user_center_api";
import {h, ref} from "vue";
import {dateTimeFormat} from "@/utils/datetime";
import {IconSend} from "@arco-design/web-vue/es/icon";
import {userCollApi} from "@/api/user_center_api";
import {Message} from "@arco-design/web-vue";

const columns = [
  {title: '文档标题', dataIndex: 'title'},
  {
    title: '文档更新时间', dataIndex: 'docUpdateTime', render({record}: { record: userCollItem }) {
      return h("span", null, {default: () => dateTimeFormat(record.docUpdateTime)})
    }
  },
  {title: '是否可访问', slotName: 'isPermission'},
  {title: '浏览量', dataIndex: 'lookCount'},
  {title: '点赞量', dataIndex: 'diggCount'},
  {title: '收藏时间', slotName: 'createdAt'},
  {title: '操作', slotName: 'action'},
]

const gvdTable = ref()
async function removeCollDoc(record: userCollItem) {
  let res = await userCollApi(record.docID)
  if (res.code){
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  await gvdTable.value.getList()
}

async function removeBatchCollDoc(keys: number[]) {
  let resList = await Promise.all(keys.map(key=>userCollApi(key)))
  Message.success(`移除收藏 ${resList.length} 篇文档`)
  await gvdTable.value.getList()
}

</script>