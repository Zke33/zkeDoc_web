<template>
  <div class="gvd_doc_config">
    <div class="head">
      文档配置
    </div>
    <div class="body">
      <a-form ref="formRef" :model="form" :label-col-props="{span: 3, offset: 0}"
              :wrapper-col-props="{span:21, offset: 0}">
        <a-form-item label="是否启用密码">
          <a-switch v-model="form.isPwd"></a-switch>
        </a-form-item>
        <a-form-item label="角色文档密码">
          <a-input placeholder="角色文档密码" v-model="form.pwd"></a-input>
        </a-form-item>
        <a-alert style="margin-bottom: 20px">文档密码优先级： 角色文档密码 > 角色密码</a-alert>
        <a-form-item label="开启试看">
          <a-switch v-model="form.isSee"></a-switch>
        </a-form-item>
        <a-form-item label="试看内容">
          <a-textarea v-model="form.freeContent" placeholder="试看内容"></a-textarea>
        </a-form-item>
        <a-alert style="margin-bottom: 20px">试看内容优先级： 角色文档试看内容 > 文档的试看内容 > 文档按特殊字符截取的试看内容</a-alert>
        <a-form-item label="更新">
          <a-button type="primary">更新</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import {reactive} from "vue";

const form = reactive({
  isPwd: false,
  pwd: "",
  isSee: false,
  freeContent: "",
})

</script>