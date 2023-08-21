<template>
  <div class="gvd_upload_image">
    <div class="gvd_upload">
      <a-upload
          class="site_icon_upload"
          :action="props.action"
          :name="props.name"
          :headers="{token: store.userInfo.token}"
          @success="imageUploadSuccess"
      ></a-upload>
      <a-image :src="text" v-if="text !==''" height="100px"></a-image>
      <div class="no_image" v-else>
        <icon-file-image/>
      </div>

    </div>


    <a-input v-model="text" placeholder="站点图标"/>
  </div>
</template>

<script setup lang="ts">
import {Message} from "@arco-design/web-vue";
import type {FileItem} from "@arco-design/web-vue";
import type {Response} from "@/api";
import {ref, watch} from "vue";
import {useStore} from "@/stores";
import {IconFileImage} from "@arco-design/web-vue/es/icon";

const store = useStore()
const url = ref("")
const props = defineProps({
  modelValue: {
    type: String,
  },
  action: {
    type: String,
    default: "/api/image",
  },
  name: {
    type: String,
    default: "image"
  }
})

const text = ref("")
const emits = defineEmits(["update:modelValue"])

watch(() => props.modelValue, () => {
  text.value = props.modelValue
})


watch(text, () => {
  emits("update:modelValue", text.value)
})


function imageUploadSuccess(fileItem: FileItem) {
  const response = fileItem.response as Response<string>
  if (response.code) {
    Message.error(response.msg)
    return
  }
  Message.success(response.msg)
  text.value = response.data
}


</script>
<style lang="scss">
.gvd_upload_image {
  width: 100%;

  .gvd_upload {
    position: relative;

    .site_icon_upload {
      left: 0;
      top: 0;
      z-index: 1;
      opacity: 0;
      position: absolute;

      button {
        height: 100px;
        width: 100px;
      }

    }

    .no_image {
      width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--color-fill-2);
      border-radius: var(--border-radius-small);

      svg {
        width: 50%;
        height: 50%;
        color: var(--color-text-2);
      }
    }
  }

  > span {
    margin-top: 10px;
  }

}
</style>