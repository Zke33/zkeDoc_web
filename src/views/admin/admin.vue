<template>
  <div class="gvd_admin">
    <aside>
      <div class="gvd_logo">
        LOGO
      </div>
      <Gvd_menu></Gvd_menu>
    </aside>
    <div class="gvd_main">
      <header>
        <div class="left">
          <Gvd_bread></Gvd_bread>
        </div>
        <div class="right">
          <icon-home @click="goHome"/>
          <Gvd_theme></Gvd_theme>
          <Gvd_user_info></Gvd_user_info>
        </div>
      </header>
      <Gvd_tabs></Gvd_tabs>
      <main>
        <router-view/>
      </main>
    </div>
  </div>

</template>

<script setup lang="ts">
import {IconHome} from "@arco-design/web-vue/es/icon";
import router from "@/router";
import Gvd_menu from "@/components/admin/gvd_menu.vue";
import Gvd_bread from "@/components/admin/gvd_bread.vue";
import Gvd_theme from "@/components/admin/gvd_theme.vue";
import Gvd_user_info from "@/components/admin/gvd_user_info.vue";
import Gvd_tabs from "@/components/admin/gvd_tabs.vue";

function goHome() {
  router.push({name: "index"})
}

</script>

<style lang="scss">
.gvd_admin {
  display: flex;

  aside {
    background-color: var(--color-bg-1);
    width: 240px;
    border-right: 1px solid var(--bg);

    .gvd_logo {
      color: rgb(var(--arcoblue-6));
      width: 100%;
      height: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(var(--arcoblue-2));
    }

    .gvd_menu {
      width: 100%;
    }
  }

  .gvd_main {
    overflow-y: auto;
    width: calc(100vw - 240px);

    > header {
      height: 60px;
      background-color: var(--color-bg-1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;

      .right {
        > svg {
          color: var(--color-text-1);
          margin-right: 10px;
          cursor: pointer;
          font-size: 16px;
        }
      }
    }

    > .gvd_tabs {
      height: 30px;
      background-color: var(--color-bg-1);
      padding: 0 20px;
      border-top: 1px solid var(--bg);
      display: flex;
      align-items: center;

      .tab_item {
        color: var(--color-text-1);
        background-color: var(--color-bg-1);
        border: 1px solid var(--bg);
        border-radius: 5px;
        height: 24px;
        display: flex;
        padding: 0 10px;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        cursor: pointer;

        &.active {
          color: white;
          background-color: rgb(var(--arcoblue-6));
        }
      }
    }

    > main {
      min-height: calc(100vh - 90px);
      background-color: var(--bg);
      padding: 20px;
    }
  }
}
</style>