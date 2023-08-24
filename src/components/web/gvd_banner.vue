<template>
  <div class="gvd_banner" :style="{
      background: activeBannerColor,
    }">
    <div class="gvd_head">
      <div class="banner_logo">
        <img :src="store.site.icon" alt="">
      </div>
      <h1 class="banner_h1">
        <a href="javascript:void (0)">
          <strong>{{store.site.title}}</strong>
        </a>
      </h1>
      <ul class="banner_desc">
        <li v-for="item in abstract">{{ item }}</li>
      </ul>
      <div class="banner_images" v-html="store.site.iconHref"></div>
      <gvd_login v-model:visible="visible"></gvd_login>
      <div class="banner_btns" v-if="!store.isLogin">
        <a href="javascript:void (0)" class="banner_go_btn">Go</a>
        <a href="javascript:void (0)" class="banner_login_btn" @click="visible=true">登录</a>
      </div>
      <div class="banner_btn_login" v-else>
        <icon-double-down @click="down"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {IconDoubleDown} from "@arco-design/web-vue/es/icon";
import Gvd_login from "@/components/web/gvd_login.vue";
import {useStore} from "@/stores";
import {ref, watch} from "vue";
import {Random} from "mockjs";
import {computed} from "vue";
import type {themeType} from "@/type/type";

const store = useStore()
store.getSiteData()

interface BannerColorType {
  dark: string[]
  "light": string[]
}

const bannerColor: BannerColorType = {
  "light": [
    "linear-gradient(to left bottom, #CCDAEE 0%, #D0F0CF 100%)",
  ],
  "dark": [
    "linear-gradient(to left bottom, #19162C 0%, #280B38 100%)",
  ]
}

const visible = ref(false)

const activeBannerColor = ref("linear-gradient(to left bottom, #CCDAEE 0%, #D0F0CF 100%)")
watch(() => store.theme, () => {
  activeBannerColor.value = Random.pick(bannerColor[store.theme as keyof BannerColorType])
}, {immediate: true})


const abstract = computed(()=>{
  return store.site.abstract.split("\n")
})

function down(){
  document.documentElement.scrollTo({
    top:  window.innerHeight, // 100vh的值，滚动到视口高度的位置
    behavior: 'smooth' // 使用平滑滚动效果
  });
}

</script>

<style lang="scss">
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

    .banner_btn_login {
      text-align: center;
      margin-top: 20px;

      svg {
        font-size: 25px;
        color: var(--index_color);
        cursor: pointer;
      }
    }
  }
}
</style>