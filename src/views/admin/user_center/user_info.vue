<template>
  <div class="gvd_view user_info_view">
    <div class="head">个人信息</div>
    <div class="body">
      <a-form ref="formRef" :model="data" :label-col-props="{span: 2}" :wrapper-col-props="{span:5}">
        <a-form-item label="头像">
          <a-image width="120" :src="data.avatar"></a-image>
        </a-form-item>
        <a-form-item label="昵称" field="nickName">
          <a-input v-model="data.nickName" placeholder="昵称"/>
        </a-form-item>
        <a-form-item label="邮箱" field="email">{{ data.email }}</a-form-item>
        <a-form-item label="地址" field="addr">{{ data.addr }}</a-form-item>
        <a-form-item label="角色" field="role">{{ data.role }}</a-form-item>
        <a-form-item label="注册时间" field="createdAt">{{ dateTimeFormat(data.createdAt) }}</a-form-item>
        <a-form-item label="上次登录" field="lastLogin">{{ dateTimeFormat(data.lastLogin) }} ({{ relativeToCurrentTime(data.lastLogin) }})</a-form-item>
        <a-form-item label="修改密码">
          <a-button type="primary">修改密码</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getUserInfoApi} from "@/api/user_center_api";
import type {userInfoItem} from "@/api/user_center_api";
import {reactive} from "vue";
import {dateTimeFormat, relativeToCurrentTime} from "@/utils/datetime";

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