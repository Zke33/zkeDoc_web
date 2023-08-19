<template>
  <Gvd_table url="/api/users" :is-edit="false" :is-delete="false" :columns="columns" :is-check="false">
    <template #avatar="{ record }">
      <a-image :src="record.avatar" width="40" height="40" style="border-radius: 50%"></a-image>
    </template>
  </Gvd_table>
</template>

<script setup lang="ts">
import Gvd_table from "@/components/admin/gvd_table.vue";

const columns = [
  {title: 'id', dataIndex: 'id'},
  {title: '昵称', dataIndex: 'nickName'},
  {title: '头像', dataIndex: 'avatar', slotName: "avatar"},
  {title: '邮箱', dataIndex: 'email'},
  {title: 'ip', dataIndex: 'ip'},
  {title: '地址', dataIndex: 'addr'},
  {title: '注册时间', dataIndex: 'createdAt', slotName: "createdAt"},
  {title: '上次登录时间', dataIndex: 'lastLogin'},
  {title: '操作', slotName: 'action'},
]


</script>
