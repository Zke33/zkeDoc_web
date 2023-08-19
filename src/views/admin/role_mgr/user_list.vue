<template>
  <div class="gvd_table">
    <div class="gvd_table_head">
      <div class="action_create">
        <a-button type="primary">添加</a-button>
      </div>
      <div class="action_group">
        <a-select :options="actionOptions" placeholder="操作"></a-select>
      </div>
      <div class="action_search">
        <a-input placeholder="搜索"></a-input>
      </div>
      <div class="action_filters">
        <a-select :options="filterOptions" placeholder="角色过滤"></a-select>
      </div>
      <div class="action_flush">
        <a-button>
          <icon-refresh/>
        </a-button>
      </div>
    </div>
    <div class="gvd_table_source">
      <a-table
          row-key="id"
          :columns="columns"
          :data="data.list"
          :row-selection="rowSelection"
          v-model:selectedKeys="selectedKeys" :pagination="false">
        <template #action="{ record }">
          <a-button type="primary">更新</a-button>
        </template>
        <template #avatar="{ record }">
          <a-image :src="record.avatar" width="40" height="40" style="border-radius: 50%"></a-image>
        </template>
        <template #createdAt="{ record }">
          <span>{{ dateTimeFormat(record.createdAt) }}</span>
        </template>
      </a-table>
    </div>
    <div class="gvd_table_page" v-if="data.count !== 0">
      <a-pagination :total="data.count" v-model:current="params.page" :page-size="params.limit" show-total show-jumper />
    </div>
  </div>
</template>

<script setup lang="ts">
import {userListApi} from "@/api/user_api";
import {reactive, ref, watch} from "vue";
import {IconRefresh} from "@arco-design/web-vue/es/icon";
import type {userItem} from "@/api/user_api";
import type {Params} from "@/api";
import {Message} from "@arco-design/web-vue";
import * as dayjs from 'dayjs'


const actionOptions = ref([
  {label: "批量删除", value: 1}
])

const filterOptions = ref([
  {label: "管理员", value: 1}
])


const params = reactive<Params>({
  key: "",
  limit: 1,
  page: 1,
})


watch(()=>params.page, ()=>{
  getList()
})


const data = reactive<{ list: userItem[], count: number}>({
  list: [],
  count: 0,
})


const selectedKeys = ref([1]);

const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});


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

async function getList() {
  let res = await userListApi(params)
  if (res.code !== 0){
    // 失败的
    Message.error(res.msg)
    return
  }
  data.list = res.data.list
  data.count = res.data.count
}

function dateTimeFormat(date: string) :string {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}


getList()
</script>

<style lang="scss">
.gvd_table {
  background-color: var(--color-bg-1);
  border-radius: 5px;

  .gvd_table_head {
    padding: 20px 20px 10px 20px;
    display: flex;
    border-bottom: 1px solid var(--bg);
    position: relative;

    > div {
      margin-right: 10px;
    }


    .action_flush {
      cursor: pointer;
      position: absolute;
      right: 20px;
      top: 20px;

      button {
        width: 32px;
        padding: 0;
      }
    }
  }

  .gvd_table_source {
    min-height: 100px;
    padding: 10px 20px 20px 20px;
  }

  .gvd_table_page {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
  }
}
</style>