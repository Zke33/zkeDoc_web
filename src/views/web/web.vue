<template>
  <div class="gvd_web_root">
    <gvd_banner v-if="route.name === 'index'"></gvd_banner>
    <div class="gvd_web_view">
      <gvd_slide :class="{fixed: sideFixed}"></gvd_slide>
      <Gvd_fixed_menu></Gvd_fixed_menu>
      <div class="gvd_web_main">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Gvd_banner from "@/components/web/gvd_banner.vue";
import Gvd_slide from "@/components/web/gvd_slide.vue";
import Gvd_fixed_menu from "@/components/web/gvd_fixed_menu.vue";
import {ref, onUnmounted} from "vue";
import {useRoute} from "vue-router";
import {watch} from "vue";

const route = useRoute()
const sideFixed = ref(true)

function scrollEvent() {
  if (document.documentElement.scrollTop >= window.innerHeight) {
    sideFixed.value = true
  } else {
    sideFixed.value = false
  }
}


watch(() => route.name, () => {
  if (route.name === 'index') {
    scrollEvent()
    window.addEventListener("scroll", scrollEvent)
  } else {
    window.removeEventListener("scroll", scrollEvent)
    sideFixed.value = true
  }
}, {immediate: true})


onUnmounted(() => {
  window.removeEventListener("scroll", scrollEvent)
})

</script>
<style lang="scss">
.gvd_web_root {
  font-family: Adobe Source Sans Pro;
}

.gvd_web_view {
  position: relative;
}

.gvd_slide {
  width: 300px;
  height: 100vh;
  position: absolute;
  border-right: 1px solid var(--bg);
  background-color: var(--doc_bg);

  &.fixed {
    position: fixed;
    top: 0;
    left: 0;
  }

  .gvd_logo {
    height: 60px;
    border-bottom: 1px solid var(--bg);

    a {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 40px;
        height: 40px;
      }

      span {
        margin-left: 10px;
        font-weight: 600;
        font-size: 18px;
      }
    }
  }

  .gvd_search {
    display: flex;
    padding: 10px;
    align-items: center;
  }

  .gvd_doc_action {
    border-top: 1px solid var(--bg);
    padding: 10px;

  }

  .gvd_doc_tree {
    padding-top: 10px;
  }
}


.gvd_web_main {
  width: calc(100% - 300px);
  margin-left: 300px;
}
</style>