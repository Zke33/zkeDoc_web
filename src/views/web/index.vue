<template>
  <div class="index_view">
    <div class="gvd_banner" :style="{
      background: activeBannerColor,
    }">
      <div class="gvd_head">
        <div class="banner_logo">
          <img src="https://docs.fengfengzhidao.com/static/avatar/zzf-1.png" alt="">
        </div>
        <h1 class="banner_h1">
          <a href="javascript:void (0)">
            <strong>fengfeng docs</strong>
          </a>
        </h1>
        <ul class="banner_desc">
          <li>枫枫知道官方文档，致力于帮助更多的人学好知识</li>
          <li>哔哩哔哩视频总播放量突破10w</li>
          <li>文档浏览量突破3w</li>
          <li>越来越多的人，开始了解枫枫知道</li>
        </ul>
        <div class="banner_images">
          <img src="https://img.shields.io/badge/fengfengdoc-2.0.1-red">
          <img src="https://img.shields.io/badge/%E6%9E%AB%E6%9E%AB%E7%9F%A5%E9%81%93-6.0.2-brightgreen">
          <img src="https://img.shields.io/badge/python-3.8.6-yellowgreen">
          <img src="https://img.shields.io/badge/golang-1.19-orange">
        </div>
        <gvd_login v-model:visible="visible"></gvd_login>
        <div class="banner_btns">
          <a href="javascript:void (0)" class="banner_go_btn">Go</a>
          <a href="javascript:void (0)" class="banner_login_btn" @click="visible=true">登录</a>
        </div>
      </div>
    </div>
    <div class="gvd_docs_view">

    </div>

    <Gvd_fixed_menu></Gvd_fixed_menu>


  </div>
</template>

<script setup lang="ts">
import {useStore} from "@/stores";
import {reactive, ref, watch} from "vue";
import {Random} from "mockjs";
import Gvd_fixed_menu from "@/components/web/gvd_fixed_menu.vue";
import Gvd_login from "@/components/web/gvd_login.vue";

const store = useStore()

const visible = ref(false)


interface BannerColorType {
  dark: string[]
  "": string[]
}

const bannerColor: BannerColorType = {
  "": [
    "linear-gradient(to left bottom, #CCDAEE 0%, #D0F0CF 100%)",
  ],
  "dark": [
    "linear-gradient(to left bottom, #19162C 0%, #280B38 100%)",
  ]
}

const activeBannerColor = ref("linear-gradient(to left bottom, #CCDAEE 0%, #D0F0CF 100%)")


watch(() => store.theme, () => {
  activeBannerColor.value = Random.pick(bannerColor[store.theme as keyof BannerColorType])
}, {immediate: true})


</script>

<style lang="scss">
.index_view {
  font-family: Adobe Source Sans Pro;

  .gvd_banner {
    width: 100%;
    height: 100vh;
    position: relative;

    .gvd_head {

      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      .banner_logo {
        text-align: center;

        img {
          width: 160px;
          height: 160px;
          border-radius: 50%;
        }
      }

      .banner_h1 {
        text-align: center;
        font-size: 46px;
        margin: 20px 0;

        > a {
          color: var(--index_color);
        }
      }

      .banner_desc {
        list-style: none;
        padding: 0;
        line-height: 1.5rem;
        color: var(--index_text_color);

        li {
          text-align: center;
        }
      }

      .banner_images {
        img {
          margin-right: 5px;

          &:last-child {
            margin-right: 0;
          }
        }
      }

      .banner_btns {
        margin-top: 20px;
        display: flex;
        justify-content: space-evenly;

        > a {
          height: 50px;
          width: 100px;
          border: 1px solid var(--index_color);
          border-radius: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--index_color);
          font-size: 14px;
        }

        .banner_login_btn {
          background-color: var(--index_color);
          color: var(--bg);
        }
      }
    }
  }

  .gvd_docs_view {
    min-height: 100vh;
    width: 100%;
    background-color: var(--color-bg-1);
  }
}
</style>
