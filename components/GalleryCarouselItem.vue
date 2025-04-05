<template>
    <img
        v-if="!item.is_video"
        :src="getImageUrl(item.filename)"
        :alt="item.label"
        class="media-image"
    />
</template>

<script setup lang="ts">
import {
    type FragmentType,
    useFragment
} from '~/gql'
import { GalleryItemFragmentDoc } from '~/gql/graphql'
import { STORAGE_URL } from "~/constants/storage";

const props = defineProps<{
    data: FragmentType<typeof GalleryItemFragmentDoc>
}>()

const item = useFragment(GalleryItemFragmentDoc, props.data)

const getImageUrl = (filename: string) => {
    return `${STORAGE_URL}/${filename}`
}

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
    border-radius: 0.5rem;
}

.media-image,
.media-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
