<template>
    <personalize-item :selected="isCurrent()" @click="updateFont">
        <img :src="getStorageUrl(font.preview)" :alt="font.label" class="w-28"/>
    </personalize-item>
</template>
<script setup lang="ts">
import { type Font } from "~/gql/graphql";
import { getStorageUrl } from "~/constants/storage";

const props = defineProps<{
    currentFont: Font | null
    font: Font
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