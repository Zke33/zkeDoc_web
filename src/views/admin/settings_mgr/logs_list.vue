<template>
  <div>
    <Gvd_table
        url="/api/logs"
        :columns="columnsDict[logTypeEnum.actionType]"
        is-default-delete
        search-placeholder="搜索日志标题和用户名"
        :is-edit="false"
        :is-add="false"
        ref="gvdTable"
    >
      <template #action_head>
        <a-radio-group v-model="logTypeValue" @change="logTypeChange">
          <a-radio :value="logTypeEnum.loginType">登录日志</a-radio>
          <a-radio :value="logTypeEnum.actionType">操作日志</a-radio>
          <a-radio :value="logTypeEnum.runningType">运行日志</a-radio>
        </a-radio-group>
      </template>

      <template #status="{record}">
        <a-tag checkable color="arcoblue" v-if="record.status">成功</a-tag>
        <a-tag checkable color="red" v-else>失败</a-tag>
      </template>
    </Gvd_table>
  </div>

</template>

<script setup lang="ts">
import Gvd_table from "@/components/admin/gvd_table.vue";
import {h, reactive, ref} from "vue";
import {useStore} from "@/stores";
import {logTypeEnum} from "@/api/log_api";

const store = useStore()


const columnsDict = {
  [logTypeEnum.loginType]: [
    {title: 'id', dataIndex: 'id'},
    {title: 'ip', dataIndex: 'ip'},
    {title: '地址', dataIndex: 'addr'},
    {title: '标题', dataIndex: 'title'},
    {title: '状态', dataIndex: 'status'},
    {title: '用户名', dataIndex: 'userName'},
    {title: '密码', dataIndex: 'content'},
    {title: '日志时间', dataIndex: 'createdAt', slotName: "createdAt"},
    {title: '操作', slotName: 'action'},
  ],
  [logTypeEnum.actionType]: [
    {title: 'id', dataIndex: 'id'},
    {title: 'ip', dataIndex: 'ip'},
    {title: '地址', dataIndex: 'addr'},
    {title: '用户名', dataIndex: 'userName'},
    {title: '等级', dataIndex: 'level'},
    {title: '标题', dataIndex: 'title'},
    {title: '日志时间', dataIndex: 'createdAt', slotName: "createdAt"},
    {title: '操作', slotName: 'action'},
  ],
  [logTypeEnum.runningType]: [
    {title: 'id', dataIndex: 'id'},
    {title: '标题', dataIndex: 'title'},
    {title: '服务', dataIndex: 'serviceName'},
    {title: '等级', dataIndex: 'level'},
    {title: '日志时间', dataIndex: 'createdAt', slotName: "createdAt"},
    {title: '操作', slotName: 'action'},
  ]
}


const logTypeValue = ref(logTypeEnum.actionType)
const gvdTable = ref();

function logTypeChange(val: logTypeEnum) {
  gvdTable.value.getList({type: val})
  setTimeout(() => {
    gvdTable.value.getColumnList(columnsDict[val])
  }, 10)

}


</script>