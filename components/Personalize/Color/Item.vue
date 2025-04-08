<template>
    <personalize-item :selected="isCurrentColor()" @click="updateColor">
        <div class="color-item font-iskra" :style="`background: ${color.hex}`">
            {{ color.label }}
        </div>
    </personalize-item>
</template>
<script setup lang="ts">
import { type Color } from "~/gql/graphql";

const props = defineProps<{
    currentColor: Color | null
    color: Color
}>()

const isCurrentColor = () => {
    return props.currentColor?.id === props.color.id
}

const updateColor = () => {
    emit("update:color", isCurrentColor() ? null : props.color)
}

const emit = defineEmits(['update:color'])
</script>
<style>
.color-item {
    @apply text-white text-sm flex items-center justify-center text-center w-28 h-14;
}
</style>