<template>
    <personalize-item :selected="isCurrent()" @click="updateFont">
        <personalize-item-image :src="font.preview" :label="font.label" class="w-28 horizontal"/>
    </personalize-item>
</template>
<script setup lang="ts">
import { type Font } from "~/gql/graphql";

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