<template>
  <div class="index_view">
    <Gvd_banner></Gvd_banner>
    <div class="gvd_docs_view">
    </div>
    <Gvd_fixed_menu></Gvd_fixed_menu>
  </div>
</template>

<script setup lang="ts">
import Gvd_fixed_menu from "@/components/web/gvd_fixed_menu.vue";
import Gvd_banner from "@/components/web/gvd_banner.vue";


</script>

<style lang="scss">
.index_view {
  font-family: Adobe Source Sans Pro;

  .gvd_docs_view {
    min-height: 100vh;
    width: 100%;
    background-color: var(--color-bg-1);
  }
}
</style>
