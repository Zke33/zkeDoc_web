<template>
  <div class="gvd_doc_main">
    <main :class="{isNoMdCatalog: isNoMdCatalog}">
      <div class="doc_head">
        <h1>{{ data.title }}</h1>
        <div class="doc_data">
          <span>浏览量： <b>{{ data.lookCount }}</b></span>
          <span>点赞量： <b>{{ data.diggCount }}</b></span>
          <span>收藏量： <b>{{ data.collCount }}</b></span>
        </div>
        <div class="date">
          <span>发布时间：{{ dateTimeFormat(data.createdAt) }}（{{ relativeToCurrentTime(data.createdAt) }}）</span>
        </div>
      </div>
      <div class="doc_body">
        <div :class="{doc_pwd_mask: true, isSee: data.isSee}" v-if="data.isPwd">
          <div class="head">此文档需要输入密码查看</div>
          <div class="ipt_box">
            <a-input placeholder="密码" v-model="pwd"></a-input>
            <a-button type="primary" @click="docPwd">提交</a-button>
          </div>
          <div class="note">未登陆用户刷新页面需要重新输入密码，登陆用户自动记住密码</div>
        </div>

        <MdPreview :editorId="id" :model-value="data.content" :theme="store.theme"></MdPreview>
        <div class="doc_see_mask" v-if="data.isSee">
          <div class="pwd_mask" v-if="data.isPwd"></div>
          <div class="head">试看结束 以下为更高级别权限可看</div>
          <div class="body">
            <a-skeleton>
              <a-space direction="vertical" :style="{width:'100%'}" size="large">
                <a-skeleton-line :rows="widthList.length" :widths="widthList"/>
              </a-space>
            </a-skeleton>
          </div>
        </div>
      </div>
    </main>
    <Gvd_md_catalog @catalog-show="catalogShow" :editor-id="id" :scrollElement="scrollElement">
      <div class="doc_action">
        <div @click="docDigg" :class="{item: true, active: isDigg}">
          <icon-thumb-up-fill/>
          <span>点赞</span>
        </div>
        <div @click="docColl" :class="{item: true, active: data.isColl}">
          <icon-star-fill/>
          <span>收藏</span>
        </div>
        <div @click="goTop" class="item">
          <icon-to-top/>
          <span>Top</span>
        </div>
      </div>
    </Gvd_md_catalog>
  </div>
</template>

<script setup lang="ts">
import {MdPreview, MdCatalog} from 'md-editor-v3';
import {reactive, ref, watch, onUnmounted} from "vue";
import {IconThumbUpFill, IconStarFill, IconToTop} from "@arco-design/web-vue/es/icon";
import 'md-editor-v3/lib/style.css';
import {useStore} from "@/stores";
import {useRoute} from "vue-router";
import {getDocDetailApi} from "@/api/doc_api";
import type {docItem} from "@/api/doc_api";
import {Message} from "@arco-design/web-vue";
import {dateTimeFormat, relativeToCurrentTime} from "@/utils/datetime";
import {docDiggApi, docPwdContent} from "@/api/doc_api";
import {userCollApi} from "@/api/user_center_api";
import Gvd_md_catalog from "@/components/web/gvd_md_catalog.vue";

const widthList = [
  "23%", "45%", "67%", "34%", "12%", "34%", "67%", "89%", "23%", "45%", "67%", "89%", "34%", "56%"
]
const route = useRoute()
const id = 'preview-only';
const scrollElement = document.documentElement;
const store = useStore()
// const text = ref(catalogMd)

const isNoMdCatalog = ref(false)


function catalogShow(isShow: boolean) {
  isNoMdCatalog.value = isShow
}

const data = reactive<docItem>({
  collCount: 0,
  content: "",
  createdAt: "",
  diggCount: 0,
  isColl: false,
  isPwd: false,
  isSee: false,
  lookCount: 0,
  title: "",
})


async function getDocContent(id: number) {
  let res = await getDocDetailApi(id)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(data, res.data)
}


watch(() => route.params, () => {
  if (route.name === "add_doc") {
    return;
  }
  const id = Number(route.params.id)
  if (isNaN(id)) {
    console.log("错误了", route.params)
    return
  }
  getDocContent(id)
}, {immediate: true})


function goTop() {
  document.documentElement.scrollTo({
    top: 0, // 100vh的值，滚动到视口高度的位置
    behavior: 'smooth' // 使用平滑滚动效果
  });
}

const isDigg = ref(false)

async function docDigg() {
  let res = await docDiggApi(Number(route.params.id))
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  data.diggCount++

  isDigg.value = true

  setTimeout(() => {
    isDigg.value = false
  }, 1000)
}

async function docColl() {
  if (!store.isLogin) {
    Message.warning("请登录")
    return
  }
  let res = await userCollApi(Number(route.params.id))
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  let count = 1
  if (data.isColl) {
    // 现在是收藏，我要取消收藏
    count = -1
  }
  data.collCount += count
  data.isColl = !data.isColl

}

const pwd = ref("")

async function docPwd() {
  if (pwd.value === "") {
    Message.warning("请输入密码")
    return
  }
  let res = await docPwdContent(Number(route.params.id), pwd.value)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  data.content = res.data.content
  data.isPwd = false
}

</script>

<style lang="scss">
.gvd_doc_main {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: var(--doc_bg);
  min-height: 100vh;

  > main {
    width: calc(100% - 240px);
    padding: 40px 20px 0 40px;
    transition: all 0.3s;

    .doc_head {
      color: var(--color-text-2);

      h1 {
        color: var(--md-theme-color);
      }

      .doc_data {
        margin-bottom: 10px;

        > span {
          margin-right: 10px;
        }
      }
    }

    .doc_body {
      margin-top: 20px;
      position: relative;

      .doc_pwd_mask {
        width: 50%;
        background-color: var(--color-fill-1);
        padding: 20px;
        border-radius: 5px;


        .ipt_box {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;

          .arco-btn {
            margin-left: 20px;
          }
        }

        .note {
          font-size: 12px;
          color: var(--color-text-3);
        }

      }

      .doc_see_mask {
        .head {
          font-size: 12px;
          color: var(--color-text-3);
          display: flex;
          align-items: center;

          &::before, &::after {
            content: "";
            display: inline-block;
            width: 100px;
            height: 1px;
            background-color: var(--color-text-3);
          }

          &::before {
            margin-right: 5px;
          }

          &::after {
            margin-left: 5px;
          }
        }

        .body {
          margin-top: 20px;
        }
      }

      .doc_pwd_mask.isSee {
        position: absolute;
        bottom: 300px;
        z-index: 2;

        box-shadow: 4px 6px 5px 0 var(--color-fill-3);
      }

      .doc_see_mask .pwd_mask {
        position: absolute;
        bottom: 0;
        height: 500px;
        width: 100%;
        z-index: 1;
        background: linear-gradient(to top, var(--doc_bg), rgba(0, 0, 0, 0));
      }
    }

    .md-editor-preview-wrapper {
      padding: 0;
    }
  }

  .doc_action {
    position: fixed;
    bottom: 100px;
    right: 93px;
    z-index: 101;

    .item {
      border: 1px solid var(--doc_border);
      width: 50px;
      height: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      cursor: pointer;
      border-radius: 5px;

      svg {
        font-size: 20px;
      }

      span {
        font-size: 12px;
      }

      &.active {
        color: rgb(var(--arcoblue-6));
      }
    }
  }

  main.isNoMdCatalog {
    width: 100%;

    & ~ section {
      transform: translateX(240px);
    }
  }
}
</style>