<template>
  <Gvd_table
      url="/api/users"
      :columns="columns"
      is-default-delete
      :filter-groups="filters"
      @filters="filterChange"
      ref="gvdTable"
  >
    <template #avatar="{ record }">
      <a-image :src="record.avatar" width="40" height="40" style="border-radius: 50%"></a-image>
    </template>
  </Gvd_table>
</template>

<script setup lang="ts">
import Gvd_table from "@/components/admin/gvd_table.vue";
import {ref} from "vue";
import {roleIDListApi} from "@/api/role_api";

const columns = [
  {title: 'id', dataIndex: 'id'},
  {title: '昵称', dataIndex: 'nickName'},
  {title: '用户名', dataIndex: 'userName'},
  {title: '角色', dataIndex: 'roleModel.title'},
  {title: '头像', dataIndex: 'avatar', slotName: "avatar"},
  {title: '邮箱', dataIndex: 'email'},
  {title: 'ip', dataIndex: 'ip'},
  {title: '地址', dataIndex: 'addr'},
  {title: '注册时间', dataIndex: 'createdAt', slotName: "createdAt"},
  {title: '上次登录时间', dataIndex: 'lastLogin'},
  {title: '操作', slotName: 'action'},
]

const filters = [
  {
    title: "角色过滤",
    column: "roleID",
    urls: roleIDListApi,
  },
]

const gvdTable = ref();

function filterChange(column, val) {
  let obj = {}
  obj[column] = val
  gvdTable.value.getList(obj)
}


</script>
