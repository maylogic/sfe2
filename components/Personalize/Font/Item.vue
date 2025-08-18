<template>
    <personalize-item :selected="isCurrent()" @click="updateFont">
        <loadable-image :fallback-src="fallback" :src="src" :alt="font.label" class="w-28 horizontal personalize-item-image"/>
    </personalize-item>
</template>
<script setup lang="ts">
import type { FrontendFont } from "~/data/types";

const props = defineProps<{
    currentFont: FrontendFont | null
    font: FrontendFont
}>()

const hash = props.font.updated_at.substr(-8).replace(/:/g, ''),
    src = `/font-preview/${props.font.id}/${hash}.webp`,
    fallback = `/api/font-preview/${props.font.id}/${hash}.webp`

const isCurrent = () => {
    return props.currentFont?.id === props.font.id
}

const updateFont = () => {
    emit("update:font", isCurrent() ? null : props.font)
}

const emit = defineEmits(['update:font'])
</script>
<style>

</style>