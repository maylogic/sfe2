<template>
    <div class="product-gallery" :class="{editor}">
        <div class="current-image">
            <gallery-item v-if="!editor && gallery[currentItem]" :data="gallery[currentItem]"/>
            <product-editor :text-lines-render-values="textLinesRenderValues"
                            :line-definitions="lineDefinitions"
                            :reverse-side-base="reverseSideBase"
                            :personalize-data="personalizeData" v-if="editor"/>
        </div>
        <div class="items-carousel">
            <gallery-carousel-item :class="{'selected': !editor && index === currentItem}" :data="item"
                                   @click="currentItem = index;emit('toggle-editor', false)"
                                   v-for="(item,index) in gallery"/>
            <div class="editor-item" :class="{'selected': editor}"
                 v-if="personalizeData.design !== null"
                 @click="emit('toggle-editor', !editor)">
                <u-icon name="i-lucide-pen-tool"/>
                <span class="font-fira-sans text-xs hidden md:block">Редактор</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {
    BaseFragmentFragmentDoc,
    GalleryItemFragmentDoc,
    type ProductLineDefinition
} from "~/gql/graphql";
import type { FragmentType } from "~/gql";
import GalleryCarouselItem from "~/components/GalleryCarouselItem.vue";
import type { InputTextLinesMap } from "~/utils/product";

defineProps<{
    gallery: FragmentType<typeof GalleryItemFragmentDoc>[],
    reverseSideBase: null | undefined | FragmentType<typeof BaseFragmentFragmentDoc>,
    personalizeData: PersonalizeInputData,
    editor: boolean,
    lineDefinitions: ProductLineDefinition[],
    textLinesRenderValues: InputTextLinesMap
}>()
const currentItem = ref(0)

const emit = defineEmits(['toggle-editor'])
</script>
<style lang="scss">
.product-gallery {
    @apply flex flex-col gap-2 top-0 md:top-[20px] self-start bg-white z-10 pb-2;
    @apply w-full sm:w-[320px] lg:w-[480px] xl:w-[550px];
    &.editor {
        @apply sticky;
    }

    .items-carousel {
        @apply grid grid-cols-6 gap-3;
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