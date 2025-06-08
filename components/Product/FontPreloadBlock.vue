<template>
    <div class="preload-font" :style="`font-family: ${font.name}`">.</div>
</template>
<script setup lang="ts">
import type { FrontendFont } from "~/data/types";

defineProps<{
    font: FrontendFont
}>()
</script>
<style>
.preload-font {
    position: absolute;
    left: -9999px;
}
</style>