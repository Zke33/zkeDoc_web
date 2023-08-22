<template>
  <div>
    <a-drawer width="70vw" @cancel="drawerCache" @close="drawerCache" :visible="props.visible" :footer="false"
              :title="props.title" unmountOnClose class="gvd_drawer">
      <div class="gvd_drawer_body">
        <Gvd_role_doc_tree :role-id="props.roleId"></Gvd_role_doc_tree>
        <Gvd_doc_config></Gvd_doc_config>
      </div>
    </a-drawer>
  </div>
</template>


<script setup lang="ts">
import Gvd_role_doc_tree from "@/components/admin/gvd_role_doc_tree.vue";
import Gvd_doc_config from "@/components/admin/gvd_doc_config.vue";

const props = defineProps(["visible", "title", "roleId"])
const emits = defineEmits(["update:visible"])

function drawerCache() {
  emits("update:visible", false)
}


</script>


<style lang="scss">
.gvd_drawer {
  .arco-drawer-body {
    padding: 0;
  }
}

.gvd_drawer_body {
  display: flex;
}

.gvd_role_doc_tree {
  width: 30%;
}

.gvd_doc_config {
  width: 70%;

  .head {
    height: 40px;
    border-bottom: 1px solid var(--bg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }

  .body {
    padding: 20px;
  }
}
</style>