<template>
    <div class="product-gallery">
        <div class="current-image">
            <gallery-item v-if="!editor && gallery[currentItem]" :data="gallery[currentItem]"/>
            <product-editor :reverse-side-base="reverseSideBase" :personalize-data="personalizeData" v-if="editor"/>
        </div>
        <div class="items-carousel">
            <gallery-carousel-item :class="{'selected': !editor && index === currentItem}" :data="item"
                                   @click="currentItem = index;emit('toggle-editor', false)"
                                   v-for="(item,index) in gallery"/>
            <div class="editor-item" :class="{'selected': editor}"
                 @click="emit('toggle-editor', !editor)">
                <u-icon name="i-lucide-pen-tool"/>
                <span class="font-fira-sans">Редактор</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {
    BaseFragmentFragmentDoc,
    GalleryItemFragmentDoc
} from "~/gql/graphql";
import type { FragmentType } from "~/gql";
import GalleryCarouselItem from "~/components/GalleryCarouselItem.vue";

defineProps<{
    gallery: FragmentType<typeof GalleryItemFragmentDoc>[],
    reverseSideBase: null | undefined | FragmentType<typeof BaseFragmentFragmentDoc>,
    personalizeData: PersonalizeInputData,
    editor: boolean
}>()
const currentItem = ref(0)

const emit = defineEmits(['toggle-editor'])
</script>
<style lang="scss">
.product-gallery {
    @apply flex flex-col gap-2 sticky top-[20px] self-start;
    .items-carousel {
        @apply grid grid-cols-5 gap-3;
        & > * {
            @apply cursor-pointer;
        }

        .selected {
            @apply border-[1px] border-viking-500;
        }

        .editor-item {
            @apply flex flex-col gap-2 text-center items-center justify-center bg-storm-dust-50;
        }
    }
}
</style>