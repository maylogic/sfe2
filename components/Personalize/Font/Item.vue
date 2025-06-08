<template>
    <personalize-item :selected="isCurrent()" @click="updateFont">
        <personalize-item-image :src="font.preview" :label="font.label" class="w-28 horizontal"/>
    </personalize-item>
</template>
<script setup lang="ts">
import type { FrontendFont } from "~/data/types";

const props = defineProps<{
    currentFont: FrontendFont | null
    font: FrontendFont
}>()

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