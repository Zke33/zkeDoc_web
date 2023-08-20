<template>
  <div class="gvd_table">
    <div class="gvd_table_head">
      <div class="action_create" v-if="props.isAdd">
        <a-button type="primary" @click="emits('create')">{{ props.addButtonLabel }}</a-button>
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
        <a-input-search :placeholder="props.searchPlaceholder" v-model="params.key" @change="search" search-button/>
      </div>
      <div class="ation_other_search">
        <slot name="other_search"></slot>
      </div>
      <div class="action_filters" v-if="filterGroups?.length">
        <a-select allow-clear v-for="item in filterGroups" @change="filterChange(item, $event as number)"
                  :options="item.values"
                  :placeholder="item.title"></a-select>
      </div>
      <div class="action_slot">
        <slot name="action_head"></slot>
      </div>
      <div class="action_flush">
        <a-button @click="flush">
          <icon-refresh/>
        </a-button>
      </div>
    </div>
    <div class="gvd_table_source">
      <a-table
          row-key="id"
          :data="data.list"
          :row-selection="props.isCheck as boolean ? rowSelection : undefined"
          v-model:selectedKeys="selectedKeys" :pagination="false">
        <template #columns>
          <template v-for="item in columns">
            <a-table-column :title="item.title" v-if="item.render">
              <template #cell="data">
                <component :is="item.render(data)"></component>
              </template>
            </a-table-column>
            <a-table-column :title="item.title" :data-index="item.dataIndex"
                            v-else-if="!item.slotName"></a-table-column>
            <a-table-column :data-index="item.dataIndex" :title="item.title" v-else>
              <template v-if="item.slotName === 'createdAt'" #cell="{ record }">
                <span>{{ dateTimeFormat(record.createdAt) }}</span>
              </template>
              <template v-else-if="item.slotName === 'action'" #cell="{ record }">
                <slot name="action" :record="record">
                  <div class="gvd_cell_actions">
                    <slot name="action_1" :record="record"></slot>
                    <a-button type="primary" v-if="props.isEdit" @click="clickEdit(record)">编辑</a-button>
                    <slot name="action_2" :record="record"></slot>
                    <a-popconfirm content="是否确认执行此操作?" @ok="clickDelete(record)">
                      <a-button v-if="props.isDelete" type="primary" status="danger">删除</a-button>
                    </a-popconfirm>
                    <slot name="action_3" :record="record"></slot>
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
import {reactive, ref, computed} from "vue";
import type {userItem} from "@/api/user_api";
import type {OptionsResponse, Params} from "@/api";
import {Message} from "@arco-design/web-vue";
import {dateTimeFormat} from "@/utils/datetime";
import type {Response} from "@/api";
import type {Ref} from "vue";
import type {TableRowSelection} from "@arco-design/web-vue";


export interface filterItem {
  urls?: () => Promise<Response<OptionsResponse[]>>
  title: string
  column: string
  values?: OptionsResponse[]
}

export interface actionItem {
  label: string
  value: number
  noConfirm?: boolean
}


export type RecordType<T> = T & {
  readonly id: number
}

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
  filterGroups: {
    type: Array,
  },
  isCheck: {
    type: Boolean,
    default: true,
  },
  isDefaultDelete: {
    type: Boolean,
    default: false
  },
  searchPlaceholder: {
    type: String,
    default: "搜索",
  },
  addButtonLabel: {
    type: String,
    default: "添加"
  },
  limit: {
    type: Number,
    default: 10,
  },
  params:{
    type: Object,
    default: {}
  }
})


// 子组件给通知父组件
const emits = defineEmits<{
  (e: "edit", record: RecordType<any>): void
  (e: "delete", record: RecordType<any>): void
  (e: "batchDelete"): void
  (e: "actionGroup", value: number, keys: number[]): void
  (e: "filters", column: string, value: number): void
  (e: "create"): void
}>()


/*
点击编辑或删除按钮
 */

// 点击编辑
function clickEdit(record: RecordType<any>) {
  record.props = record
  emits("edit", record)
}


// 点击删除
async function clickDelete(record: RecordType<any>) {
  if (props.isDefaultDelete) {
    // 走默认删除接口
    let res = await deleteApi(props.url as string, [record.id])
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


/*
动作相关操作
 */


const actionOptions: Ref<actionItem[]> = ref([
  {label: "批量删除", value: 1}
])
const actionValue: Ref<number | undefined> = ref(undefined)

function getActionOptions() {
  if (!props.actionGroups) {
    return
  }
  for (const item of props.actionGroups as actionItem[]) {
    actionOptions.value.push({
      label: item.label,
      value: item.value,
    })
  }
}

// 获取事件点击
getActionOptions()

// 动作的点击
async function actionClick() {
  if (actionValue.value as number === 1) {
    // 调用自己的批量删除接口
    if (selectedKeys.value.length > 0) {
      let res = await deleteApi(props.url as string, selectedKeys.value)
      if (res.code) {
        Message.error(res.msg)
        return
      }
      Message.success(res.msg)
      getList()

      actionValue.value = undefined

      return;
    }
    Message.warning("请选择数据")
    return
  }
  // 操作类型， 选择的元素id
  emits("actionGroup", actionValue.value as number, selectedKeys.value)

}

// 点击动作，是否需要二次确认
const noConfirm = computed(() => {
  const item = (props.actionGroups as actionItem[])?.find((item: actionItem) => item.value === actionValue.value)
  if (item === undefined) {
    return false
  }
  if (!item.noConfirm) {
    return false
  }
  return true
})

/*
过滤查询相关操作
 */

const filterGroups: Ref<filterItem[]> = ref([])

async function getFilterOptions() {
  if (!props.filterGroups) {
    return
  }
  for (const item of props.filterGroups as filterItem[]) {

    // 如果urls有东西，那就自己去请求
    const filterItem: filterItem = {
      title: item.title,
      column: item.column,
      values: item.values,
    }
    if (item.urls) {
      let res = await item.urls()
      if (res.code) {
        Message.error(res.msg)
        continue
      }
      filterItem.values = res.data
    }
    filterGroups.value.push(filterItem)
  }
}

// 获取过滤的列表数据
getFilterOptions()

// 过滤变化的事件
function filterChange(item: filterItem, val: number) {
  emits("filters", item.column, val)
}


// 往filter里面的values加数据
function getAddFilterOptions(index: number, values: any[]) {
  filterGroups.value[index].values = values
}


/*
分页查询相关操作
 */
// 数据列表，总数
const data = reactive<{ list: userItem[], count: number }>({
  list: [],
  count: 0,
})

// 分页查询参数
const params = reactive<Params>({
  key: "",
  limit: props.limit,
  page: 1,
})

// 分页
function pageChange() {
  getList()
}

// 模糊搜索
function search() {
  // 搜索，那个page默认是1
  params.page = 1
  getList()
}

// 获取列表数据
async function getList(param?: object) {

  Object.assign(params, param)
  let res = await listApi(props.url as string, params)
  if (res.code !== 0) {
    // 失败的
    Message.error(res.msg)
    return
  }
  data.list = res.data.list
  data.count = res.data.count
}

getList(props.params)

// 刷新
function flush() {
  getList()
  Message.success("刷新成功")
}


/*
行选择相关
 */


// 选中的行id列表
const selectedKeys: Ref<number[]> = ref([]);


// 多选行的一些配置
const rowSelection: TableRowSelection = reactive({
  type: 'checkbox',
  showCheckedAll: true,
  onlyCurrent: false,
});


const columns: Ref<any[]> = ref([])

// column数据切换
function getColumnList(columnList: any[]) {
  columns.value = columnList
}

getColumnList(props.columns as any[])


// 抛出子组件方法
defineExpose({
  getList,
  getAddFilterOptions,
  getColumnList,
  params,
})


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
    flex-wrap: wrap;


    > div {
      margin-right: 10px;
      display: flex;
      align-items: center;
    }

    .action_filters {
      display: flex;

      > * {
        margin-left: 10px;

        &:first-child {
          margin-left: 0;
        }
      }
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