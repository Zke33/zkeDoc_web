<template>
  <div class="gvd_view gvd_site_view">
    <div class="left">
      <a-form ref="formRef" :model="form" :label-col-props="{span: 4}" :wrapper-col-props="{span: 20}">
        <a-form-item label="站点名称" field="title" :rules="[{required:true,message:'请输入站点名称'}]"
                     :validate-trigger="['blur']">
          <a-input v-model="form.title" placeholder="站点名称"/>
        </a-form-item>
        <a-form-item label="站点图标" field="icon">
          <div class="site_icon">
            <a-upload
                class="site_icon_upload"
                action="/api/image"
                name="image"
                :headers="{token: store.userInfo.token}"
                @success="imageUploadSuccess"
            ></a-upload>
            <a-image :src="form.icon" height="100px"></a-image>

            <a-input v-model="form.icon" placeholder="站点图标"/>
          </div>
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
import {useStore} from "@/stores";
import type {FileItem} from "@arco-design/web-vue";
import {Response} from "@/api";
import {Message} from "@arco-design/web-vue";

const store = useStore()


const form = reactive<siteType>({
  abstract: "枫枫知道官方文档，致力于帮助更多的人学好知识\n" +
      "哔哩哔哩视频总播放量突破10w\n" +
      "文档浏览量突破3w\n" +
      "越来越多的人，开始了解枫枫知道",
  content: "",
  icon: "https://docs.fengfengzhidao.com/static/avatar/zzf-1.png",
  iconHref: "<img src=\"https://img.shields.io/badge/fengfengdoc-2.0.1-red\"><img src=\"https://img.shields.io/badge/%E6%9E%AB%E6%9E%AB%E7%9F%A5%E9%81%93-6.0.2-brightgreen\"><img src=\"https://img.shields.io/badge/python-3.8.6-yellowgreen\"><img src=\"https://img.shields.io/badge/golang-1.19-orange\">",
  title: "fengfeng docs",
})

function imageUploadSuccess(fileItem: FileItem) {
  const response = fileItem.response as Response<string>
  if (response.code) {
    Message.error(response.msg)
    return
  }
  Message.success(response.msg)
  form.icon = response.data

}

</script>

<style lang="scss">
.gvd_site_view {
  width: 100%;
  display: flex;

  .left {
    width: 35%;

    .site_icon {
      width: 100%;
      position: relative;

      .site_icon_upload {
        left: 0;
        top: 0;
        z-index: 1;
        opacity: 0;
        position: absolute;

        button {
          height: 100px;
          width: 100px;
        }

      }

      > span {
        margin-top: 10px;
      }
    }

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
}
</style>