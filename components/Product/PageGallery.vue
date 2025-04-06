<template>
    <div class="product-gallery">
        <div class="current-image">
            <gallery-item v-if="gallery[currentItem]" :data="gallery[currentItem]"/>
        </div>
        <div class="items-carousel">
            <gallery-carousel-item :class="{'selected': index === currentItem}" :data="item"
                                   @click="currentItem = index"
                                   v-for="(item,index) in gallery"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import { GalleryItemFragmentDoc } from "~/gql/graphql";
import type { FragmentType } from "~/gql";
import GalleryCarouselItem from "~/components/GalleryCarouselItem.vue";

defineProps<{ gallery: FragmentType<typeof GalleryItemFragmentDoc>[] }>()
const currentItem = ref(0)
</script>
<style lang="scss">
.product-gallery {
    @apply flex flex-col gap-2;
    .items-carousel {
        @apply grid grid-cols-5 gap-3;
        & > * {
            @apply cursor-pointer;
        }
        .selected {
            @apply border-[1px] border-viking-500;
        }
    }
}
</style>