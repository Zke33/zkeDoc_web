<template>
  <div>
    <a-modal v-model:visible="visible" title="创建用户" @cancel="cancel" :on-before-ok="createUser">
      <a-form ref="formRef" :model="form">
        <a-form-item label="用户名" field="userName" :rules="[{required:true,message:'请输入用户名'}]"
                     :validate-trigger="['blur']">
          <a-input v-model="form.userName" placeholder="用户名"/>
        </a-form-item>
        <a-form-item label="昵称" field="nickName">
          <a-input v-model="form.nickName" placeholder="昵称"/>
        </a-form-item>
        <a-form-item label="密码" field="password" :rules="[{required:true,message:'请输入密码'}]"
                     :validate-trigger="['blur']">
          <a-input v-model="form.password" type="password" placeholder="密码" @dblclick="genPassword"/>
        </a-form-item>
        <a-form-item label="确认密码" field="rePassword"
                     :rules="[{required:true,message:'请输入确认密码'}, {validator: rePasswordValidate}]"
                     :validate-trigger="['blur']">
          <a-input v-model="form.rePassword" type="password" placeholder="请输入确认密码"/>
        </a-form-item>
        <a-form-item label="角色" field="roleID" :rules="[{required:true,message:'请选择角色'}]"
                     :validate-trigger="['blur']">
          <a-select v-model="form.roleID" placeholder="选择角色" :options="roleIDList" allow-clear></a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal title="更新用户信息" v-model:visible="editVisible" @cancel="editCancel" :on-before-ok="updateUser">
      <a-form ref="editFormRef" :model="editForm">
        <a-form-item label="昵称" field="nickName">
          <a-input v-model="editForm.nickName" placeholder="昵称"/>
        </a-form-item>
        <a-form-item label="角色" field="roleID">
          <a-select v-model="editForm.roleID" placeholder="选择角色" :options="roleIDList" allow-clear></a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal title="重置密码" v-model:visible="resetPasswordVisible" :on-before-ok="updateUser">
      <a-form :model="editForm">
        <a-form-item label="新密码" field="password">
          <a-input v-model="editForm.password" placeholder="新密码"/>
        </a-form-item>
      </a-form>
    </a-modal>
    <Gvd_table
        url="/api/users"
        :columns="columns"
        is-default-delete
        :filter-groups="filters"
        @filters="filterChange"
        @create="visible=true"
        @edit="showEdit"
        search-placeholder="搜索用户名、昵称"
        add-button-label="创建用户"
        ref="gvdTable"
    >
      <template #avatar="{ record }">
        <a-image :src="record.avatar" width="40" height="40" style="border-radius: 50%"></a-image>
      </template>
      <template #action_1="{ record }">
        <a-button @click="resetPasswordModal(record)">重置密码</a-button>
      </template>
    </Gvd_table>
  </div>

</template>

<script setup lang="ts">
import Gvd_table from "@/components/admin/gvd_table.vue";
import type {RecordType} from "@/components/admin/gvd_table.vue";
import type {filterItem, actionItem} from "@/components/admin/gvd_table.vue";
import {h, reactive, ref} from "vue";
import type {Ref} from "vue";
import {roleIDListApi} from "@/api/role_api";
import type {userCreateRequest, userItem, userUpdateRequest} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";
import {userCreateApi} from "@/api/user_api";
import {mock} from "mockjs";
import {dateTimeFormat} from "@/utils/datetime";
import {userUpdateApi} from "@/api/user_api";
import type {OptionsResponse} from "@/api";

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
  {
    title: '上次登录时间', dataIndex: 'lastLogin', render({record}: { record: userItem }) {
      return h("span", null, {default: () => dateTimeFormat(record.lastLogin)})
    }
  },
  {title: '操作', slotName: 'action'},
]

const filters: filterItem[] = [
  {
    title: "角色过滤",
    column: "roleID",
  }
]
const gvdTable = ref();

const roleIDList: Ref<OptionsResponse[]> = ref([])

async function getRoleList() {
  let res = await roleIDListApi()
  if (res.code) {
    Message.error(res.msg)
    return
  }
  roleIDList.value = res.data
  gvdTable.value.getAddFilterOptions(0, roleIDList.value)
}

getRoleList()



function filterChange(column: string, val: number) {
  let obj: any = {}
  obj[column] = val
  gvdTable.value.getList(obj)
}


const visible = ref(false)

const form = reactive<userCreateRequest>({
  nickName: "",
  password: "",
  roleID: undefined,
  userName: "",
  rePassword: ""
})

function genPassword() {
  form.password = mock(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!%*?&])[A-Za-z\d@!%*?&]{8,16}$/)
  form.rePassword = form.password
}


function rePasswordValidate(value: string, callback: (error?: string) => void) {
  if (form.password !== value) {
    callback("两次密码不一致")
  }
}


const formRef = ref()

async function createUser() {
  let _res = await formRef.value.validate()
  if (_res) {
    return false
  }
  let res = await userCreateApi(form)
  if (res.code) {
    Message.error(res.msg)
    return false
  }
  cancel()
  Message.success(res.msg)
  await gvdTable.value.getList({})
}

function cancel() {
  formRef.value.resetFields(Object.keys(form))
  formRef.value.clearValidate(Object.keys(form))
}

const editVisible = ref(false)
const editFormRef = ref()
const editForm = reactive<userUpdateRequest>({
  id: 0,
  nickName: "",
  password: "",
  roleID: undefined,
})

function showEdit(record: RecordType<userItem>): any {
  editForm.id = record.id
  editForm.roleID = record.roleID
  editForm.nickName = record.nickName
  editVisible.value = true
}


async function updateUser() {
  editForm.roleID = !editForm.roleID ? undefined : editForm.roleID
  let res = await userUpdateApi(editForm)
  if (res.code) {
    Message.error(res.msg)
    return false
  }
  editCancel()
  Message.success(res.msg)
  await gvdTable.value.getList({})
}

function resetPasswordModal(record: RecordType<userItem>) {
  resetPasswordVisible.value = true
  editForm.id = record.id
}


function editCancel() {
  editFormRef.value.resetFields(Object.keys(editForm))
}


const resetPasswordVisible = ref(false)


</script>
