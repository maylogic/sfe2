<template>
    <div class="gallery-item">
        <div class="media-container">
            <div v-if="!loaded" class="image-placeholder w-full"></div>
            <img
                ref="imgRef"
                v-if="!item.is_video"
                @load="loaded = true"
                :src="getStorageUrl(item.filename)"
                :alt="item.label"
                class="media-image"
                :class="{loaded}"
            />
            <video
                v-else
                :src="getStorageUrl(item.filename)"
                controls
                class="media-video"
            ></video>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    type FragmentType,
    useFragment
} from '~/gql'
import { GalleryItemFragmentDoc } from '~/gql/graphql'
import { getStorageUrl } from "~/constants/storage";

const imgRef = ref<HTMLImageElement>()
const {loaded, error} = useImageLoad(imgRef)

const props = defineProps<{
    data: FragmentType<typeof GalleryItemFragmentDoc>
}>()

const item = useFragment(GalleryItemFragmentDoc, props.data)
</script>

<style scoped lang="scss">
.gallery-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    .media-container {
        width: 100%;
        overflow: hidden;
    }
}
</style>
