<template>
    <personalize-item :class="{'selected': isCurrent()}" @click="updateFont">
        <img :src="getStorageUrl(font.preview)" :alt="font.label" class="w-28"/>
    </personalize-item>
</template>
<script setup lang="ts">
import { type Font } from "~/gql/graphql";
import { getStorageUrl } from "~/constants/storage";

const props = defineProps<{
    currentFontId: string | null
    font: Pick<Font, 'id' | 'label' | 'preview'>
}>()

const isCurrent = () => {
    return props.currentFontId === props.font.id
}

const updateFont = () => {
    emit("update:font", isCurrent() ? null : props.font.id)
}

const emit = defineEmits(['update:font'])
</script>
<style>

</style>