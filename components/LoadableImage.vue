<template>
    <div class="loadable-image">
        <slot v-if="!loaded">
            <div class="image-placeholder w-full"></div>
        </slot>
        <img
            ref="imgRef"
            :src="src"
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
    alt: string
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
    }
}
</style>
