<template>
  <div>
    <a-drawer width="70vw" @cancel="drawerCache" @close="drawerCache" :visible="props.visible" :footer="false"
              :title="props.title" unmountOnClose>
      123
    </a-drawer>
  </div>
</template>


<script setup lang="ts">
const props = defineProps(["visible", "title", "roleId"])
const emits = defineEmits(["update:visible"])

function drawerCache(){
  emits("update:visible", false)
}

console.log(props.roleId)

</script>
