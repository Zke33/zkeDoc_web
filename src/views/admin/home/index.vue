<template>
  <div class="home_view">
    <div class="left">

    </div>
    <div class="right">
      <div class="doc_sum_data">
        <div class="item">
          <div class="left">
            <div class="head">{{ doc_sum_data.docCount }}</div>
            <div class="abs">文档数</div>
          </div>
          <div class="right">
            <icon-book/>
          </div>
        </div>
        <div class="item">
          <div class="left">
            <div class="head">{{ doc_sum_data.userCount }}</div>
            <div class="abs">用户数</div>
          </div>
          <div class="right">
            <icon-user-group/>
          </div>
        </div>
        <div class="item">
          <div class="left">
            <div class="head">{{ doc_sum_data.lookCount }}</div>
            <div class="abs">浏览量</div>
          </div>
          <div class="right">
            <icon-fire/>
          </div>
        </div>
        <div class="item">
          <div class="left">
            <div class="head">{{ doc_sum_data.diggCount }}</div>
            <div class="abs">点赞量</div>
          </div>
          <div class="right">
            <icon-thumb-up-fill/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {IconBook, IconThumbUpFill, IconUserGroup, IconFire} from "@arco-design/web-vue/es/icon";
import {dataSumApi} from "@/api/data_api";
import type {dataSumItem} from "@/api/data_api";
import {Message} from "@arco-design/web-vue";

const doc_sum_data = reactive<dataSumItem>({
  userCount: 0,
  docCount: 0,
  diggCount: 0,
  lookCount: 0
})

async function getData() {
  let res = await dataSumApi()
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(doc_sum_data, res.data)
}

getData()

</script>

<style lang="scss">
.home_view {
  display: flex;

  > .left {
    width: 70%;
  }

  > .right {
    width: 30%;

    .doc_sum_data {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 20px;
      grid-row-gap: 20px;

      .item {
        background-color: var(--color-bg-1);
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 5px;
        color: var(--color-text-1);

        .head {
          font-size: 18px;
          font-weight: 600;
        }

        .abs {
          color: var(--color-text-2);
        }

        .right {
          > svg {
            font-size: 30px;
            color: rgb(var(--arcoblue-6));
          }
        }
      }
    }
  }
}
</style>