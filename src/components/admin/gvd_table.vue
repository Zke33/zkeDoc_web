<template>
  <div class="gvd_table">
    <div class="gvd_table_head">
      <div class="action_create" v-if="props.isAdd">
        <a-button type="primary">添加</a-button>
      </div>
      <div class="action_group" v-if="props.isActionGroup">
        <a-select :options="actionOptions" placeholder="操作" allow-clear v-model="actionValue"
                  style="width: 120px"></a-select>
        <a-popconfirm content="是否确认执行此操作?" v-if="!noConfirm" @ok="actionClick">
        <a-button type="primary" status="danger" v-if="actionValue">执行</a-button>
        </a-popconfirm>
        <a-button v-else type="primary" status="danger" v-if="actionValue" @click="actionClick">执行</a-button>
      </div>
      <div class="action_search">
        <a-input-search placeholder="搜索" v-model="params.key" @change="search" search-button/>
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
          :columns="props.columns"
          :data="data.list"
          :row-selection="props.isCheck ? rowSelection : null"
          v-model:selectedKeys="selectedKeys" :pagination="false">
        <template #columns>
          <template v-for="item in props.columns">
            <a-table-column
                :title="item.title"
                :data-index="item.dataIndex"
                v-if="item.slotName === undefined || item.slotName === ''"
            ></a-table-column>
            <a-table-column :data-index="item.dataIndex" :title="item.title" v-else>
              <template v-if="item.slotName === 'createdAt'" #cell="{ record }">
                <span>{{ dateTimeFormat(record.createdAt) }}</span>
              </template>
              <template v-else-if="item.slotName === 'action'" #cell="{ record }">
                <slot name="action" :record="record">
                  <div class="gvd_cell_actions">
                    <a-button type="primary" v-if="props.isEdit" @click="clickEdit(record)">编辑</a-button>
                    <a-popconfirm content="是否确认执行此操作?" @ok="clickDelete(record)">
                    <a-button v-if="props.isDelete" type="primary" status="danger">删除</a-button>
                    </a-popconfirm>
                  </div>
                </slot>

              </template>
              <template v-else #cell="{ record }">
                <slot :name="item.slotName" :record="record"></slot>
              </template>
            </a-table-column>
          </template>
        </template>
      </a-table>
    </div>
    <div class="gvd_table_page" v-if="data.count !== 0">
      <a-pagination :total="data.count" v-model:current="params.page" @change="pageChange" :page-size="params.limit"
                    show-total show-jumper/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {IconRefresh} from "@arco-design/web-vue/es/icon";
import {listApi, deleteApi} from "@/api/base_api";
import {reactive, ref, watch, computed} from "vue";
import type {userItem} from "@/api/user_api";
import type {Params} from "@/api";
import {Message} from "@arco-design/web-vue";
import * as dayjs from 'dayjs'


const props = defineProps({
  url: {
    type: String
  },
  columns: {
    type: Array,
  },
  isAdd: {
    type: Boolean,
    default: true,
  },
  isDelete: {
    type: Boolean,
    default: true,
  },
  isBatchDelete: { // 是否需要批量删除
    type: Boolean,
    default: true,
  },
  isEdit: { // 是否显示编辑按钮
    type: Boolean,
    default: true,
  },
  isActionGroup: {
    type: Boolean,
    default: true,
  },
  actionGroups: {
    type: Array,
  },
  isCheck: {
    type: Boolean,
    default: true,
  },
  isDefaultDelete: {
    type: Boolean,
    default: false
  }
})

interface RecordType {
  readonly id: number
}


const emits = defineEmits(["edit", "delete", "batchDelete", "actionGroup"])


const noConfirm = computed(()=>{
  const item = props.actionGroups.find((item)=>item.value===actionValue.value)
  if (item === undefined){
    return false
  }
  if (!item.noConfirm){
    return false
  }
  return true
})

// 模糊搜索
function search() {
  // 搜索，那个page默认是1
  params.page = 1
  getList()
}

function clickEdit(record) {
  emits("edit", record)
}

async function clickDelete(record: RecordType) {
  if (props.isDefaultDelete) {
    // 走默认删除接口
    let res = await deleteApi(props.url, [record.id])
    if (res.code) {
      Message.error(res.msg)
      return
    }
    Message.success("删除成功")
    getList()
    return
  }
  emits("delete", record)
}


const actionOptions = ref([
  {label: "批量删除", value: 1}
])

function getActionOptions() {
  for (const item of props.actionGroups) {
    actionOptions.value.push({
      label: item.label,
      value: item.value,
    })
  }
}
getActionOptions()

const actionValue = ref(null)

async function actionClick() {
  if (actionValue.value === 1) {
    // 调用自己的批量删除接口
    if (selectedKeys.value.length > 0) {
      let res = await deleteApi(props.url, selectedKeys.value)
      if (res.code) {
        Message.error(res.msg)
        return
      }
      Message.success(res.msg)
      getList()

      actionValue.value = null

      return;
    }
    Message.warning("请选择数据")
    return
  }
  // 操作类型， 选择的元素id
  emits("actionGroup", actionValue.value, selectedKeys.value)

}

const filterOptions = ref([
  {label: "管理员", value: 1}
])


const params = reactive<Params>({
  key: "",
  limit: 5,
  page: 1,
})

function pageChange() {
  getList()
}


const data = reactive<{ list: userItem[], count: number }>({
  list: [],
  count: 0,
})


const selectedKeys = ref([]);

const rowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});

async function getList() {
  let res = await listApi(props.url, params)
  if (res.code !== 0) {
    // 失败的
    Message.error(res.msg)
    return
  }
  data.list = res.data.list
  data.count = res.data.count
}

function dateTimeFormat(date: string): string {
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

    .gvd_cell_actions {
      button {
        margin-right: 10px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .gvd_table_page {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
  }
}
</style>