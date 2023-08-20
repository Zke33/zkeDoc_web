<template>
  <div>
    <a-modal title="上传图片" v-model:visible="visible" @ok="gvdTable.getList()">
      <a-upload
          list-type="picture-card"
          action="/api/image"
          class="gvd_image_upload"
          :default-file-list="fileList"
          name="image"
          :headers="{token: store.userInfo.token}"
          image-preview
          @success="imageUploadSuccess"
      />
    </a-modal>
    <Gvd_table
        url="/api/images"
        :columns="columns"
        is-default-delete
        search-placeholder="搜索文件名"
        :is-edit="false"
        @create="visible=true"
        ref="gvdTable"
    >
      <template #webPath="{ record }">
        <a-image :src="record.webPath" height="60"></a-image>
      </template>
      <template #action_1="{ record }">

          <a :href="record.webPath" style="margin-right: 10px" :download="record.fileName">
            <a-button type="primary">
              <template #icon>
                <icon-download />
              </template>
              文件下载
            </a-button>
          </a>
      </template>
    </Gvd_table>
  </div>

</template>

<script setup lang="ts">
import Gvd_table from "@/components/admin/gvd_table.vue";
import {h, ref} from "vue";
import bytes from "bytes";
import {useStore} from "@/stores";
import type {Response} from "@/api";
import {Message} from "@arco-design/web-vue";
import {IconDownload} from "@arco-design/web-vue/es/icon";
import type {imageType} from "@/api/image_api";
import type {FileItem} from "@arco-design/web-vue";

const store = useStore()
const columns = [
  {title: 'id', dataIndex: 'id'},
  {title: '文件名', dataIndex: 'fileName'},
  {title: '预览', dataIndex: 'webPath', slotName: "webPath"},
  {title: '文件路径', dataIndex: 'path'},
  {
    title: '文件大小', dataIndex: 'size', render({record}:{record: imageType}) {
      return h("span", {}, {default: () => bytes(record.size)})
    }
  },
  {title: '上传者', dataIndex: 'nickName'},
  {title: '上传时间', dataIndex: 'createdAt', slotName: "createdAt"},
  {title: '操作', slotName: 'action'},
]

const gvdTable = ref();
const visible = ref(false)

const fileList = ref([])

function imageUploadSuccess(fileItem: FileItem) {
  const response = fileItem.response as Response<string>
  if (response.code){
    Message.error(response.msg)
    return
  }
  Message.success(response.msg)
}

</script>


<style lang="scss">
.gvd_image_upload{
  .arco-upload-list-picture{
   width: inherit;
  }
}
</style>