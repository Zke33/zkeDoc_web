<template>
  <MdPreview :model-value="store.site.content" :theme="store.theme"></MdPreview>
</template>

<script setup lang="ts">
import {MdPreview} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {useStore} from "@/stores";

const store = useStore()
</script>

