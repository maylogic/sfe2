<template>
    <div class="personalize-item-image">
        <div v-if="!loaded" class="image-placeholder w-full"></div>
        <img
            ref="imgRef"
            @load="loaded = true"
            :src="getStorageUrl(src)"
            :alt="label"
            class="media-image"
            :class="{loaded}"
        />
    </div>
</template>

<script setup lang="ts">
import { getStorageUrl } from "~/constants/storage";

const imgRef = ref<HTMLImageElement>()
const {loaded, error} = useImageLoad(imgRef)

defineProps<{
    src: string
    label: string
}>()
</script>
<style lang="scss">
.personalize-item-image {
    &.horizontal .image-placeholder {
        aspect-ratio: 16/9;
    }
}
</style>