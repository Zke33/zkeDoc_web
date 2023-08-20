<template>
  <div class="gvd_view gvd_site_view">
    <div class="left">
      <a-form ref="formRef" :model="form">
        <a-form-item label="站点名称" field="title" :rules="[{required:true,message:'请输入站点名称'}]"
                     :validate-trigger="['blur']">
          <a-input v-model="form.title" placeholder="站点名称"/>
        </a-form-item>
        <a-form-item label="站点图标" field="icon">
          <div class="site_icon">
            <a-image :src="form.icon" height="80px"></a-image>
            <a-input v-model="form.icon" placeholder="站点图标"/>
          </div>
        </a-form-item>
        <a-form-item label="网站简介" field="abstract" :rules="[{required:true,message:'请输入网站简介'}]"
                     :validate-trigger="['blur']">
          <a-textarea v-model="form.abstract" :auto-size="{minRows: 5}" placeholder="网站简介"/>
        </a-form-item>
        <a-form-item label="图片链接" field="iconHref">
          <a-textarea v-model="form.iconHref"  :auto-size="{minRows: 5}" placeholder="图片链接"/>
        </a-form-item>
        <a-form-item>
          <a-button type="primary">更新</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="right">

    </div>
  </div>
</template>

<script setup lang="ts">

import {reactive} from "vue";
import type {siteType} from "@/api/site_api";

const form = reactive<siteType>({
  abstract: "",
  content: "",
  icon: "https://docs.fengfengzhidao.com/static/avatar/zzf-1.png",
  iconHref: "",
  title: "",
})

</script>

<style lang="scss">
.gvd_site_view {
  width: 100%;
  display: flex;

  .left {
    width: 35%;
    .site_icon{
      width: 100%;
      >span{
        margin-top: 10px;
      }
    }
  }
}
</style>