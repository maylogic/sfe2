<template>
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
const loaded = ref(false),
    imgRef = ref<HTMLImageElement>()

onMounted(() => {
    const img = imgRef.value
    if (!img) return

    if (img.complete) {
        console.log('уже загружено из кэша')
        loaded.value = true
    }
})

</script>
