<template>
  <div class="gvd_view gvd_site_view">
    <div class="left">
      <a-form ref="formRef" :model="form" :label-col-props="{span: 4}" :wrapper-col-props="{span: 20}">
        <a-form-item label="站点名称" field="title" :rules="[{required:true,message:'请输入站点名称'}]"
                     :validate-trigger="['blur']">
          <a-input v-model="form.title" placeholder="站点名称"/>
        </a-form-item>
        <a-form-item label="站点图标" field="icon">
          <Gvd_upload_image v-model="form.icon"></Gvd_upload_image>
        </a-form-item>
        <a-form-item label="网站简介" field="abstract" :rules="[{required:true,message:'请输入网站简介'}]"
                     :validate-trigger="['blur']">
          <a-textarea v-model="form.abstract" :auto-size="{minRows: 5}" placeholder="网站简介"/>
        </a-form-item>
        <a-form-item label="图片链接" field="iconHref">
          <div class="site_iconHref">
            <div class="icon_href_preview" v-html="form.iconHref"></div>
            <a-textarea v-model="form.iconHref" :auto-size="{minRows: 5}" placeholder="图片链接"/>
          </div>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="updateSite">更新</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="right">
      <Gvd_md v-if="isShow" v-model="form.content"></Gvd_md>
    </div>
  </div>
</template>

<script setup lang="ts">
import Gvd_upload_image from "@/components/admin/gvd_upload_image.vue";
import {reactive, ref} from "vue";
import type {siteType} from "@/api/site_api";
import {useStore} from "@/stores";
import {Message} from "@arco-design/web-vue";
import Gvd_md from "@/components/admin/gvd_md.vue";
import {siteApi, siteUpdateApi} from "@/api/site_api";

const store = useStore()


const form = reactive<siteType>({
  abstract: "",
  content: "",
  icon: "",
  iconHref: "",
  title: "",
})



const isShow = ref(false)

async function getList() {
  let res = await siteApi()
  Object.assign(form, res.data)
  isShow.value = true
}

getList()

const formRef = ref()

async function updateSite() {
  let _res = await formRef.value.validate()
  if (_res) {
    return false
  }
  let res = await siteUpdateApi(form)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
}

</script>

<style lang="scss">
.gvd_site_view {
  width: 100%;
  display: flex;

  .left {
    width: 35%;

    .site_iconHref {
      width: 100%;

      .icon_href_preview {
        margin-bottom: 10px;

        img {
          margin-right: 5px;
        }
      }
    }
  }

  .right {
    width: 65%;
    margin-left: 20px;

    .md-editor {
      height: calc(100vh - 170px);
    }
  }
}
</style>