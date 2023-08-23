<template>
  <div class="gvd_doc_config">
    <template v-if="props.docId">
      <div class="head">
        文档配置 [{{ (props.docItem as roleDocItem).title }}]
      </div>
      <div class="body">
        <div class="no_role_mask" v-if="!(props.docItem as roleDocItem).show">
          <a-button type="primary" @click="roleAddDoc">加入角色</a-button>
        </div>
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
import {roleDocGetConfigApi, roleDocUpdateConfigApi, roleAddDocApi} from "@/api/role_doc_api";
import type {roleDocConfigItem, roleDocConfigUpdateItem, roleDocItem} from "@/api/role_doc_api";
import {Message} from "@arco-design/web-vue";

interface Props {
  roleId: number
  docId: number|undefined
  docItem: roleDocItem|undefined
}


// 没有默认值的情况下
const props = defineProps<Props>()
// 如果有默认值
// const {roleId, docId, docItem} = defineProps<Props>()

// const props = defineProps({
//   roleId: {
//     type: Number
//   },
//   docId: {
//     type: Number
//   },
//   docItem: {
//     type: Object
//   }
// })

const emits = defineEmits(["update", "create"])

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
  if (!(props.docItem as roleDocItem).show) {
    return
  }
  let res = await roleDocGetConfigApi(props.roleId, props.docId)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(form, res.data)
}

async function roleAddDoc(){
  let res = await roleAddDocApi(props.roleId, props.docId as number)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(form, res.data)
  Message.success(res.msg)
  emits("create")
}

async function updateDocConfig() {
  const data: roleDocConfigUpdateItem = {
    freeContent: form.freeContent,
    isPwd: form.isPwd,
    isSee: form.isSee,
    roleDocPwd: form.roleDocPwd,
    rolePwd: form.rolePwd,
    docID: props.docId as number,
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
.gvd_doc_config {
  .body {
    position: relative;

    .no_role_mask {
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      background-color: var(--translucent_bg);

      & ~ .arco-form {
        filter: blur(2px);
      }
    }
  }
}

.gvd_doc_config_no_data {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>