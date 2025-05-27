<template>
    <div class="gallery-item">
        <div class="media-container">
            <div v-if="!loaded" class="placeholder"></div>
            <img
                v-if="!item.is_video"
                :src="getStorageUrl(item.filename)"
                :alt="item.label"
                class="media-image"
                :class="{loaded}"
                @load="loaded=true"
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

const loaded = ref(false)

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
