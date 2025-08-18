<template>
    <div class="loadable-image">
        <slot v-if="!loaded">
            <div class="image-placeholder w-full"></div>
        </slot>
        <img
            ref="imgRef"
            :src="src"
            :alt="alt"
            :class="{loaded, error}"
        />
        <img
            v-if="error && fallbackSrc"
            :src="fallbackSrc"
            :alt="alt"
            :class="{loaded}"
        />
    </div>
</template>

<script setup lang="ts">

const imgRef = ref<HTMLImageElement>()
const {loaded, error} = useImageLoad(imgRef)

defineProps<{
    src: string,
    alt: string,
    fallbackSrc?: string
}>()
</script>
<style lang="scss">
.loadable-image {
    img {
        &:not(.loaded) {
            width: 1px;
            height: 1px;
            opacity: 1%;
        }
        &.error {
            display: none;
        }
    }
}
.personalize-item-image {
    .image-placeholder {
        aspect-ratio: 1/1;
    }
    &.horizontal .image-placeholder {
        aspect-ratio: 16/9;
    }
}
</style>
