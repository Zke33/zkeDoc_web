<template>
  <div class="gvd_admin">
    <aside :class="{isCollapse: isCollapse}">
      <div class="gvd_logo">
        LOGO
      </div>
      <Gvd_menu @collapse="onCollapse"></Gvd_menu>
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
        <router-view v-slot="{Component}">
          <transition name="fade" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
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
import {ref} from "vue";

function goHome() {
  router.push({name: "index"})
}

// 是否是折叠状态
const isCollapse = ref(false)

function onCollapse(val: boolean) {
  // true 收缩
  // false 展开
  isCollapse.value = val
}


</script>

<style lang="scss">
.gvd_admin {
  display: flex;
  height: 100vh;

  aside {
    background-color: var(--color-bg-1);
    width: 240px;
    border-right: 1px solid var(--bg);
    transition: all 0.3s;
    height: 100vh;
    overflow-y: auto;

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

      .arco-menu {
        position: static;
      }

      .arco-menu-collapse-button {
        opacity: 0;
        transition: all 0.3s;
        position: absolute;
        left: 240px;
        top: 50%;
        transform: translate(-50%, -50%);
      }

    }

    &:hover {
      .arco-menu-collapse-button {
        opacity: 1;
      }
    }
  }

  aside.isCollapse {
    width: 48px;

    .arco-menu-collapse-button {
      left: 48px;
    }
  }


  .gvd_main {
    overflow-y: auto;
    width: calc(100vw - 240px);
    transition: all 0.3s;
    overflow-x: hidden;

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

        .gvd_dropdown {
          cursor: pointer;
          transition: all .3s;
          color: var(--color-text-1);

          &:hover {
            color: rgb(var(--arcoblue-6));
          }
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
      position: relative;

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

        svg {
          margin-left: 5px;
          font-size: 12px;
          border-radius: 50%;
        }

        &:hover {
          svg {
            background-color: var(--bg);
          }
        }

        &.active {
          color: white;
          background-color: rgb(var(--arcoblue-6));

          &:hover {
            svg {
              background-color: rgb(var(--arcoblue-5));
            }
          }
        }

        &.close_tab_item {
          position: absolute;
          right: 10px;
          top: 3px;
        }
      }
    }

    > main {
      min-height: calc(100vh - 90px);
      background-color: var(--bg);
      padding: 20px;


      .gvd_view {
        background-color: var(--color-bg-1);
        padding: 20px;
        border-radius: 5px;
        min-height: calc(100vh - 130px);
        color: var(--color-text-1);

      }
    }
  }

  aside.isCollapse ~ .gvd_main {
    width: calc(100vw - 48px);
  }

}

.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.fade-enter-active {
  transform: translateX(-30px);
  opacity: 0;
}

.fade-enter-to {
  transform: translateX(0px);
  opacity: 1;
}

.fade-leave-active, .fade-enter-active {
  transition: all 0.3s ease-out;
}


</style>