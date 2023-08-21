<template>
  <div>
    <a-button @click="setTheme('dark')">黑夜主题</a-button>
    <a-button @click="setTheme('')">白天主题</a-button>
  </div>
  <div>
    <h1>编辑区</h1>
    <MdEditor v-model="text" :theme="theme"/>
  </div>
  <div>
    <h1>预览</h1>
    <MdPreview :model-value="text" :theme="theme"></MdPreview>
  </div>

</template>
<script setup lang="ts">
import {ref} from 'vue';
import type {Ref} from 'vue';
import {MdEditor, MdPreview} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';


type themeType = "" | "dark"
const text = ref('# Hello Editor');
const theme: Ref<themeType> = ref("dark")

function setTheme(value: themeType) {
  theme.value = value
}
</script>