<template>
  <div class="logs_view">
    <a-modal title="日志详情" v-model:visible="visible" body-class="logs_body" width="50%" :footer="false">
      <div class="logs_html" v-html="logContent"></div>
    </a-modal>
    <Gvd_table
        url="/api/logs"
        :columns="columnsDict[logTypeEnum.actionType]"
        is-default-delete
        search-placeholder="搜索日志标题和用户名"
        :is-edit="false"
        :is-add="false"
        :limit="15"
        :params="params"
        ref="gvdTable"
    >
      <template #action_head>
        <a-radio-group v-model="logTypeValue" @change="logTypeChange">
          <a-radio :value="logTypeEnum.loginType">登录日志</a-radio>
          <a-radio :value="logTypeEnum.actionType">操作日志</a-radio>
          <a-radio :value="logTypeEnum.runningType">运行日志</a-radio>
        </a-radio-group>
      </template>
      <template #other_search>
        <a-input placeholder="搜索用户" allow-clear v-model="params.userName" @change="searchChange"></a-input>
        <a-input placeholder="搜索地址" allow-clear style="margin-left: 10px" v-model="params.addr"
                 @change="searchChange"></a-input>
        <a-date-picker style="width: 360px; margin-left: 10px" v-model="params.date" @change="searchChange"/>
      </template>
      <template #status="{record}">
        <a-tag v-if="record.status" color="blue">成功</a-tag>
        <a-tag v-else color="red">失败</a-tag>
      </template>
      <template #level="{record}:{record:logType}">
        <a-tag :color="logLevelDict[record.level]">{{ record.level }}</a-tag>
      </template>
      <template #title="{record}:{record:logType}">
        <div class="log_column_title" @click="logReadMethod(record)">
             <span v-if="record.readStatus">
          {{ record.title }}
        </span>
          <a href="javascript:void (0)" v-else>{{ record.title }}</a>
        </div>

      </template>
      <template #userName="{record}:{record:logType}">
        <a-dropdown trigger="contextMenu" alignPoint :style="{display:'block'}">
          <div style="cursor: pointer">{{ record.userName }}</div>
          <template #content>
            <a-doption @click="searchKeyByLogs(record, 'userName')">只看该用户的</a-doption>
          </template>
        </a-dropdown>
      </template>
      <template #addr="{record}:{record:logType}">
        <a-dropdown trigger="contextMenu" alignPoint :style="{display:'block'}">
          <div style="cursor: pointer">{{ record.addr }}</div>
          <template #content>
            <a-doption @click="searchKeyByLogs(record, 'addr')">只看该地址的</a-doption>
          </template>
        </a-dropdown>
      </template>
      <template #logDate="{record}:{record:logType}">
        <a-dropdown trigger="contextMenu" alignPoint :style="{display:'block'}">
          <div style="cursor: pointer">{{ dateTimeFormat(record.createdAt) }}</div>
          <template #content>
            <a-doption @click="searchKeyByLogs(record, 'date')">只看当天的</a-doption>
          </template>
        </a-dropdown>
      </template>
    </Gvd_table>
  </div>

</template>

<script setup lang="ts">
import Gvd_table from "@/components/admin/gvd_table.vue";
import {h, reactive, ref, createApp} from "vue";
import {useStore} from "@/stores";
import {logStringLevel, logTypeEnum} from "@/api/log_api";
import type {logType} from "@/api/log_api";
import {logReadApi} from "@/api/log_api";
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import {Image} from "@arco-design/web-vue";
import {dateTimeFormat, dateFormat} from "@/utils/datetime";

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
    {title: '地址', dataIndex: 'addr', slotName: "addr"},
    {title: '标题', dataIndex: 'title'},
    {title: '状态', dataIndex: 'status', slotName: "status"},
    {title: '用户名', dataIndex: 'userName', slotName: "userName"},
    {title: '密码', dataIndex: 'content'},
    {title: '日志时间', dataIndex: 'logDate', slotName: "logDate"},
    {title: '操作', slotName: 'action'},
  ],
  [logTypeEnum.actionType]: [
    {title: 'id', dataIndex: 'id'},
    {title: 'ip', dataIndex: 'ip'},
    {title: '地址', dataIndex: 'addr', slotName: "addr"},
    {title: '用户名', dataIndex: 'userName', slotName: "userName"},
    {title: '等级', dataIndex: 'level', slotName: "level"},
    {title: '标题', dataIndex: 'title', slotName: "title"},
    {title: '日志时间', dataIndex: 'logDate', slotName: "logDate"},
    {title: '操作', slotName: 'action'},
  ],
  [logTypeEnum.runningType]: [
    {title: 'id', dataIndex: 'id'},
    {title: '标题', dataIndex: 'title'},
    {title: '服务', dataIndex: 'serviceName'},
    {title: '等级', dataIndex: 'level'},
    {title: '日志时间', dataIndex: 'logDate', slotName: "logDate"},
    {title: '操作', slotName: 'action'},
  ]
}

interface logParams {
  // type: logTypeEnum
  userName: string
  addr: string
  ip: string
  date: string,
}

const params: logParams = reactive({
  type: logTypeEnum.actionType,
  userName: "",
  addr: "",
  ip: "",
  date: "",
})

const logTypeValue = ref(logTypeEnum.actionType)
const gvdTable = ref();

function logTypeChange(val: string | number | boolean, ev: Event): any {
  gvdTable.value.getList({type: val})
  setTimeout(() => {
    gvdTable.value.getColumnList(columnsDict[val as logTypeEnum])
  }, 10)

}

const visible = ref(false)
const logContent = ref("")

async function logReadMethod(record: logType) {
  if (!record.readStatus) {
    await logReadApi(record.id)
    record.readStatus = true
  }

  visible.value = true
  logContent.value = record.content
  setTimeout(() => {
    jsonPreview()
    imagePreview()
  }, 100)
}

function jsonPreview() {
  let jsonList = document.querySelectorAll(".log_json_body")
  jsonList.forEach((value: Element) => {
    const jsonString = (value as HTMLPreElement).innerText
    if (jsonString === "") {
      return
    }
    let jsonData = JSON.parse(jsonString)
    // 生成虚拟dom
    const vNode = h(VueJsonPretty, {data: jsonData})
    // 创建虚拟节点
    let app = createApp({render: () => vNode})
    app.mount(value)
  })
}


function imagePreview() {
  let imageList = document.querySelectorAll(".log_image img")
  imageList.forEach((value: Element) => {
    const src = (value as HTMLImageElement).src
    // 生成虚拟dom
    const vNode = h(Image, {src: src})
    // 创建虚拟节点
    let app = createApp({render: () => vNode})
    let div = document.createElement("div")
    app.mount(div)
    // 把之前的img替换为 新加的这个div
    if (value.parentNode) {
      value.parentNode.replaceChild(div, value)
    }
  })
}

function searchKeyByLogs(record: logType, key: keyof logParams) {
  if (key === "date") {
    params[key] = dateFormat(record.createdAt)
  } else {
    params[key] = record[key]
  }
  gvdTable.value.getList(params)
}

function searchChange() {
  gvdTable.value.getList(params)
}


</script>


<style lang="scss">

.logs_body {
  padding: 20px;
  max-height: 60vh;
  overflow-y: auto;
  overflow-x: hidden;

  .logs_html > * {
    margin-bottom: 10px;
  }

  .log_request_header {
    padding: 20px;
    border-radius: 5px;
    background-color: rgb(var(--green-2));
    color: rgb(var(--green-6));
    position: relative;

    &::before {
      display: block;
      content: "请求头";
      right: 5px;
      top: 5px;
      position: absolute;
    }
  }

  .log_request {
    padding: 20px;
    border-radius: 5px;
    background-color: rgb(var(--arcoblue-2));
    color: rgb(var(--arcoblue-6));
    position: relative;

    .log_request_head {
      .log_request_method {
        font-weight: 600;
      }

      .log_request_path {
        margin-left: 10px;
      }
    }

    &::before {
      display: block;
      content: "请求";
      right: 5px;
      top: 5px;
      position: absolute;
    }
  }

  .log_response {
    padding: 20px;
    border-radius: 5px;
    background-color: rgb(var(--orange-2));
    color: rgb(var(--orange-6));
    position: relative;

    &::before {
      display: block;
      content: "响应";
      right: 5px;
      top: 5px;
      position: absolute;
    }
  }

  .log_item {
    display: flex;
    padding: 20px;
    border-radius: 5px;
    background-color: var(--color-fill-2);
    color: var(--color-text-2);
    position: relative;

    .log_item_label {
      font-weight: 600;

      &:after {
        content: ":";
        display: inline-block;
      }
    }

    .log_item_content {
      margin-left: 5px;
    }


    &.info {
      background-color: rgb(var(--arcoblue-1));
      color: rgb(var(--arcoblue-5));

      &::after {
        display: block;
        content: "info";
        right: 5px;
        top: 5px;
        position: absolute;
      }
    }

    &.warning {
      background-color: rgb(var(--orange-1));
      color: rgb(var(--orange-5));

      &::after {
        display: block;
        content: "warning";
        right: 5px;
        top: 5px;
        position: absolute;
      }
    }

    &.error {
      background-color: rgb(var(--red-1));
      color: rgb(var(--red-5));

      &::after {
        display: block;
        content: "error";
        right: 5px;
        top: 5px;
        position: absolute;
      }
    }
  }

  .log_image {
    img {
      width: 100%;
    }
  }

  .log_upload {
    padding: 20px;
    border-radius: 5px;
    background-color: rgb(var(--red-2));
    color: rgb(var(--red-6));
    position: relative;

    &::before {
      display: block;
      content: "文件上传";
      right: 5px;
      top: 5px;
      position: absolute;
    }

    .log_upload_head {
      .log_upload_file_key {
        &:after {
          content: ":";
          display: inline-block;
        }
      }

      .log_upload_file_name {

      }

      .log_upload__file_size {
        margin-left: 10px;
        color: var(--color-text-2);
      }
    }
  }

  .vjs-value-string {
    white-space: break-spaces;
  }
}

.logs_view {

  .log_column_title {
    span {
      cursor: pointer;
    }

    a {
      color: rgb(var(--arcoblue-6));
    }
  }

  .ation_other_search {
    width: 500px;
  }
}


</style>