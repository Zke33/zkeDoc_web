<template>
  <div>
    <a-modal :title="form.id === undefined ? '创建角色' : '更新角色'" @cancel="cancel" :on-before-ok="roleMethod"
             v-model:visible="visible">
      <a-form ref="formRef" :model="form">
        <a-form-item label="角色名称" field="title" :rules="[{required:true,message:'请输入角色名称'}]"
                     :validate-trigger="['blur']">
          <a-input v-model="form.title" placeholder="请输入角色名称"/>
        </a-form-item>
        <a-form-item label="角色密码" field="pwd">
          <a-input v-model="form.pwd" type="password" placeholder="请输入角色密码"/>
        </a-form-item>
      </a-form>
    </a-modal>
    <Gvd_role_config v-model:visible="drawer.visible" :title="drawer.title" :role-id="drawer.roleID"></Gvd_role_config>

    <Gvd_table
        url="/api/roles"
        :columns="columns"
        :is-batch-delete="false"
        @edit="updateRoleModal"
        @create="visible = true"
        :is-action-group="false"
        ref="gvdTable"
    >
      <template #isSystem="{record}:{record: roleItem}">
        <a-tag v-if="record.isSystem" color="red">系统角色</a-tag>
        <a-tag v-else color="blue">自定义角色</a-tag>
      </template>
      <template #pwd="{record}:{record:roleItemAddPwdShow}">
        <span v-if="record.pwd !== ''">
          {{ record.isShow ? record.pwd : "******" }}
          <a href="javascript:void (0)"
             style="color: rgb(var(--arcoblue-5));
             font-size: 12px"
             @mousedown="record.isShow=true"
             @mouseup="record.isShow=false">显示</a></span>
        <span v-else>-</span>
      </template>
      <template #remove="{record}:{record:roleItem}">
        <a-popconfirm content="是否确认执行此操作?" @ok="removeRole(record)">
          <a-button v-if="!record.isSystem" type="primary" status="danger">删除</a-button>
        </a-popconfirm>
      </template>
      <template #action_2="{record}:{record: roleItem}">
        <a-button status="warning" @click="showDrawer(record)" type="primary">角色配置</a-button>
      </template>
    </Gvd_table>
  </div>
</template>

<script setup lang="ts">
import Gvd_table from "@/components/admin/gvd_table.vue";
import type {roleItem, roleRequest} from "@/api/role_api";
import {reactive, ref} from "vue";
import {roleApi, roleRemoveApi} from "@/api/role_api";
import {Message} from "@arco-design/web-vue";
import Gvd_role_config from "@/components/admin/gvd_role_config.vue";


const columns = [
  {title: 'ID', dataIndex: 'id'},
  {title: '角色名称', dataIndex: 'title'},
  {title: '文档数', dataIndex: 'docCount'},
  {title: '用户数', dataIndex: 'userCount'},
  {title: '密码', slotName: 'pwd'},
  {title: '系统角色', slotName: 'isSystem'},
  {title: '创建时间', slotName: 'createdAt'},
  {title: '操作', slotName: 'action'},
]


interface drawerType {
  visible: boolean
  title: string
  roleID: undefined | number
}

const drawer = reactive<drawerType>({
  visible: false,
  title: "",
  roleID: undefined,
})

function showDrawer(record: roleItem) {
  drawer.title = `角色配置 [${record.title}]`
  drawer.visible = true
  drawer.roleID = record.id
}

interface roleItemAddPwdShow extends roleItem {
  isShow: boolean // 是否显示密码
}

const visible = ref(false)

const form = reactive<roleRequest>({
  id: undefined,
  title: "",
  pwd: ""
})
const formRef = ref()
const gvdTable = ref()

async function roleMethod() {
  let _res = await formRef.value.validate()
  if (_res) {
    return false
  }
  let res = await roleApi(form)
  if (res.code) {
    Message.error(res.msg)
    return false
  }
  Message.success(res.msg)
  gvdTable.value.getList()
  visible.value = false
  cancel()
  return
}

function cancel() {
  formRef.value.resetFields(Object.keys(form))
  formRef.value.clearValidate(Object.keys(form))
  form.id = undefined
}


function updateRoleModal(record: roleItem) {
  form.pwd = record.pwd
  form.title = record.title
  form.id = record.id

  visible.value = true
}

async function removeRole(record: roleItem) {
  let res = await roleRemoveApi(record.id)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  gvdTable.value.getList()
}

</script>