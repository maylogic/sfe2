<template>
    <div class="gallery-item">
        <div class="media-container">
            <img
                v-if="!item.is_video"
                :src="getStorageUrl(item.filename)"
                :alt="item.label"
                class="media-image"
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

const props = defineProps<{
    data: FragmentType<typeof GalleryItemFragmentDoc>
}>()

const item = useFragment(GalleryItemFragmentDoc, props.data)
</script>

<style scoped>
.gallery-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.media-container {
    width: 100%;
    overflow: hidden;
}

.media-image,
.media-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
