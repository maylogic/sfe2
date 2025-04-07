<template>
    <personalize-item :selected="currentColorId === color.id" @click="updateColor">
        <div class="color-item font-iskra" :style="`background: ${color.hex}`">
            {{ color.label }}
        </div>
    </personalize-item>
</template>
<script setup lang="ts">
import { type Color } from "~/gql/graphql";

const props = defineProps<{
    currentColorId: string | null
    color: Pick<Color, 'id' | 'label' | 'hex'>
}>()

const isCurrentColor = () => {
    return props.currentColorId === props.color.id
}

const updateColor = () => {
    emit("update:color", isCurrentColor() ? null : props.color.id)
}

const emit = defineEmits(['update:color'])
</script>
<style>
.color-item {
    @apply text-white text-sm flex items-center justify-center text-center w-28 h-14;
}
</style>