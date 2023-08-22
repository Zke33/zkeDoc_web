<template>
  <div class="gvd_view user_info_view">
    <div class="head">个人信息</div>
    <Gvd_update_password v-model:visible="visible"></Gvd_update_password>
    <div class="body">
      <a-form ref="formRef" :model="{}" :label-col-props="{span: 2}" :wrapper-col-props="{span:5}">
        <a-form-item label="头像">
          <Gvd_upload_image v-model="data.avatar" @change="saveUserInfo('avatar', $event)"></Gvd_upload_image>
        </a-form-item>
        <a-form-item label="昵称">
          <a-input v-model="data.nickName" @change="saveUserInfo('nickName', $event)" placeholder="昵称"/>
        </a-form-item>
        <a-form-item label="邮箱" field="email">{{ data.email }}</a-form-item>
        <a-form-item label="地址" field="addr">{{ data.addr }}</a-form-item>
        <a-form-item label="角色" field="role">{{ data.role }}</a-form-item>
        <a-form-item label="注册时间" field="createdAt">{{ dateTimeFormat(data.createdAt) }}</a-form-item>
        <a-form-item label="上次登录" field="lastLogin">{{ dateTimeFormat(data.lastLogin) }}
          ({{ relativeToCurrentTime(data.lastLogin) }})
        </a-form-item>
        <a-form-item label="修改密码">
          <a-button type="primary" @click="visible=true">修改密码</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Gvd_update_password from "@/components/admin/gvd_update_password.vue";
import Gvd_upload_image from "@/components/admin/gvd_upload_image.vue";
import {getUserInfoApi} from "@/api/user_center_api";
import type {updateUserInfoRequest} from "@/api/user_center_api";
import type {userInfoItem} from "@/api/user_center_api";
import {reactive, ref} from "vue";
import {dateTimeFormat, relativeToCurrentTime} from "@/utils/datetime";
import {updateUserInfoApi} from "@/api/user_center_api";
import {Message} from "@arco-design/web-vue";

const data = reactive<userInfoItem>({
  id: 0,
  createdAt: "",
  avatar: "",
  nickName: "",
  email: "",
  ip: "",
  addr: "",
  roleID: 0,
  lastLogin: "",
  userName: "",
  role: "",
})


async function getData() {
  let res = await getUserInfoApi()
  Object.assign(data, res.data)
}

getData()
const visible = ref(false)

async function saveUserInfo(key: keyof updateUserInfoRequest, value: string) {
  // 调用change的时候，和实际双向数据绑定的时候，会有一个时间差
  const data: updateUserInfoRequest = {}
  data[key] = value
  let res = await updateUserInfoApi(data)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}

</script>

<style lang="scss">
.user_info_view {
  .head {
    font-weight: 600;
    display: flex;
    align-items: center;

    &:before {
      content: "";
      display: inline-block;
      width: 5px;
      height: 1rem;
      background-color: rgb(var(--arcoblue-6));
      margin-right: 5px;
    }
  }
}
</style>