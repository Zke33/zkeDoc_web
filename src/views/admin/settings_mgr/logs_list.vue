<template>
  <div>
    <Gvd_table
        url="/api/logs"
        :columns="columnsDict[logTypeEnum.actionType]"
        is-default-delete
        search-placeholder="搜索日志标题和用户名"
        :is-edit="false"
        :is-add="false"
        :limit="15"
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
        <a-tag v-if="record.status" color="blue">成功</a-tag>
        <a-tag v-else color="red">失败</a-tag>
      </template>
      <template #level="{record}:{record:logType}">
        <a-tag :color="logLevelDict[record.level]">{{ record.level }}</a-tag>
      </template>
    </Gvd_table>
  </div>

</template>

<script setup lang="ts">
import Gvd_table from "@/components/admin/gvd_table.vue";
import {h, reactive, ref} from "vue";
import {useStore} from "@/stores";
import {logStringLevel, logTypeEnum} from "@/api/log_api";
import type {logType} from "@/api/log_api";

const store = useStore()

const logLevelDict = {
  [logStringLevel.info]: "arcoblue",
  [logStringLevel.warning]: "orange",
  [logStringLevel.error]: "red",
}

const columnsDict = {
  [logTypeEnum.loginType]: [
    {title: 'id', dataIndex: 'id'},
    {title: 'ip', dataIndex: 'ip'},
    {title: '地址', dataIndex: 'addr'},
    {title: '标题', dataIndex: 'title'},
    {title: '状态', dataIndex: 'status', slotName: "status"},
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
    {title: '等级', dataIndex: 'level', slotName: "level"},
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

function logTypeChange(val: string | number | boolean, ev: Event): any {
  gvdTable.value.getList({type: val})
  setTimeout(() => {
    gvdTable.value.getColumnList(columnsDict[val as logTypeEnum])
  }, 10)

}


</script>