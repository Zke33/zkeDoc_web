<template>
  <div>
    <a-modal :visible="props.visible" title="修改密码" @cancel="close" @close="close" :on-before-ok="updatePassword">
      <a-form ref="formRef" :model="form">
        <a-form-item label="原密码" field="oldPwd" :rules="[{required:true,message:'请输入原密码'}]"
                     :validate-trigger="['blur']">
          <a-input v-model="form.oldPwd" type="password" placeholder="请输入原密码"/>
        </a-form-item>
        <a-form-item label="新密码" field="password" :rules="[{required:true,message:'请输入新密码'}]"
                     :validate-trigger="['blur']">
          <a-input v-model="form.password" type="password" placeholder="请输入新密码"/>
        </a-form-item>
        <a-form-item label="确认密码" field="rePassword"
                     :rules="[{required:true,message:'确认密码'}, {validator: rePasswordValidate}]"
                     :validate-trigger="['blur']">
          <a-input v-model="form.rePassword" type="password" placeholder="确认密码"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>

</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {updateUserPasswordApi} from "@/api/user_center_api";
import {Message} from "@arco-design/web-vue";


const props = defineProps(["visible"])
const emits = defineEmits(["update:visible"])

function close() {
  emits("update:visible", false)

  formRef.value.resetFields(["userName", "password"])
  formRef.value.clearValidate(["userName", "password"])

}

const formRef = ref()

const form = reactive({
  oldPwd: "",
  password: "",
  rePassword: "", // 只前端判断
})


async function updatePassword() {
  let _res = await formRef.value.validate()
  if (_res) {
    return false
  }
  let res = await updateUserPasswordApi(form)
  if (res.code) {
    Message.error(res.msg)
    return false
  }
  Message.success(res.msg)
  close()
  return
}

function rePasswordValidate(value: string, callback: (error?: string) => void) {
  if (form.password !== value) {
    callback("两次密码不一致")
  }
}


</script>