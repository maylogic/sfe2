<template>
    <div class="preload-font" :style="`font-family: ${font.name}`">.</div>
</template>
<script setup lang="ts">
import type { Font } from "~/gql/graphql";

defineProps<{
    font: Font
}>()
</script>
<style>
.preload-font {
    position: absolute;
    left: -9999px;
}
</style>