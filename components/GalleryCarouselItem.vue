<template>
    <div v-if="!loaded" class="image-placeholder"></div>
    <img
        v-if="!item.is_video"
        ref="imgRef"
        @load="loaded = true"
        :src="getImageUrl(item.filename)"
        :alt="item.label"
        class="media-image"
        :class="{loaded}"
    />
</template>

<script setup lang="ts">
import {
    type FragmentType,
    useFragment
} from '~/gql'
import { GalleryItemFragmentDoc } from '~/gql/graphql'
import { getStorageUrl } from "~/constants/storage";

const props = defineProps<{
    data: FragmentType<typeof GalleryItemFragmentDoc>
}>()

const item = useFragment(GalleryItemFragmentDoc, props.data)

const getImageUrl = (filename: string) => getStorageUrl(filename)
const imgRef = ref<HTMLImageElement>()
const { loaded, error } = useImageLoad(imgRef)

</script>
