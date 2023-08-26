<template>
  <div>
    <MdEditor @onSave="onSave" :editorId="props.editorId"  v-model="text" :theme="store.theme" :on-upload-img="onUploadImg"/>
  </div>

</template>
<script setup lang="ts">
import {ref, watch} from 'vue';
import {MdEditor} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {uploadImageApi} from "@/api/image_api";
import {useStore} from "@/stores";
import type {Response} from "@/api";
import {Message} from "@arco-design/web-vue";
import type {Ref} from "vue";


const store = useStore()
const props = defineProps({
  modelValue: {
    type: String
  },
  editorId: {
    type: String
  }
})
const text: Ref<string> = ref("")
const emits = defineEmits(["update:modelValue", "onSave"])

function onSave(text: string, html:Promise<string>){
  emits("onSave", text, html)
}

function initValue() {
  text.value = props.modelValue as string
}

initValue()


async function onUploadImg(files: Array<File>, callback: (urls: Array<string>) => void): Promise<void> {
  let resList: Response<string>[] = []

  try {
    resList = await Promise.all(files.map(file => uploadImageApi(file)))
  } catch (e) {
    // Message.error(e.message)

    return
  }

  const urlList: string[] = []
  resList.forEach(res => {
    if (res.code) {
      Message.error(res.msg)
      return
    }
    urlList.push(res.data)
  })

  callback(urlList)
}


watch(text, () => {
  emits("update:modelValue", text.value)
})

</script>