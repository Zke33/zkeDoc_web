<template>
  <div class="gvd_doc_config">
    <template v-if="props.docId">
      <div class="head">
        文档配置 [{{ props.docTitle }}]
      </div>
      <div class="body">
        <a-form ref="formRef" :model="form" :label-col-props="{span: 3, offset: 0}"
                :wrapper-col-props="{span:21, offset: 0}">
          <a-form-item label="是否启用密码">
            <a-switch v-model="form.isPwd"></a-switch>
          </a-form-item>
          <a-form-item label="角色文档密码">
            <a-input placeholder="角色文档密码" v-model="form.roleDocPwd"></a-input>
          </a-form-item>
          <a-alert style="margin-bottom: 20px">文档密码优先级： 角色文档密码 > 角色密码</a-alert>
          <a-form-item label="开启试看">
            <a-switch v-model="form.isSee"></a-switch>
          </a-form-item>
          <a-form-item label="试看内容">
            <a-textarea v-model="form.freeContent" placeholder="试看内容"></a-textarea>
          </a-form-item>
          <a-alert style="margin-bottom: 20px">试看内容优先级： 角色文档试看内容 > 文档的试看内容 >
            文档按特殊字符截取的试看内容
          </a-alert>
          <a-form-item label="更新">
            <a-button type="primary" @click="updateDocConfig">更新</a-button>
          </a-form-item>
        </a-form>
      </div>
    </template>
    <div v-else class="gvd_doc_config_no_data">
      <a-empty/>
    </div>
  </div>

</template>
<script setup lang="ts">
import {reactive, watch} from "vue";
import {roleDocGetConfigApi, roleDocUpdateConfigApi} from "@/api/role_doc_api";
import type {roleDocConfigItem, roleDocConfigUpdateItem} from "@/api/role_doc_api";
import {Message} from "@arco-design/web-vue";

const props = defineProps({
  roleId: {
    type: Number
  },
  docId: {
    type: Number
  },
  docTitle: {
    type: String
  }
})

const emits = defineEmits(["update"])

const form = reactive<roleDocConfigItem>({
  freeContent: "",
  isPwd: false,
  isSee: false,
  roleDocPwd: "",
  rolePwd: "",
})

async function getConfig() {
  if (!props.docId) {
    return
  }
  let res = await roleDocGetConfigApi(props.roleId, props.docId)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(form, res.data)
}


async function updateDocConfig() {
  const data: roleDocConfigUpdateItem = {
    freeContent: form.freeContent,
    isPwd: form.isPwd,
    isSee: form.isSee,
    roleDocPwd: form.roleDocPwd,
    rolePwd: form.rolePwd,
    docID: props.docId,
    roleID: props.roleId,
  }
  let res = await roleDocUpdateConfigApi(data)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  emits("update")
}

watch(() => props.docId, () => {
  getConfig()
})

</script>

<style>
.gvd_doc_config_no_data {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>