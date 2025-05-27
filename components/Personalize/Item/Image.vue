<template>
    <div class="personalize-item-image">
        <div v-if="!loaded" class="placeholder"></div>
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

const loaded = ref(false),
    imgRef = ref<HTMLImageElement>()

onMounted(() => {
    const img = imgRef.value
    if (!img) return

    if (img.complete) {
        console.log('уже загружено из кэша')
        loaded.value = true
    }
})

defineProps<{
    src: string
    label: string
}>()
</script>
<style lang="scss">
.personalize-item-image {
    &.horizontal .placeholder {
        aspect-ratio: 16/9;
    }
}
</style>