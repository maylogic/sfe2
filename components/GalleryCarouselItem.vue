<template>
    <img
        v-if="!item.is_video"
        :src="getImageUrl(item.filename)"
        :alt="item.label"
        class="media-image"
        :class="{loaded}"
        @load="onLoad"
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
const loaded = ref(false)
const onLoad = () => {
    console.log('loaded carousel')
    setTimeout(() => {
        loaded.value = true
    })
}


</script>
