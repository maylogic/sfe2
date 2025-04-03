<template>
    <div class="gallery-item">
        <!-- Отображение медиафайла -->
        <div class="media-container">
            <img
                v-if="!item.is_video"
                :src="getImageUrl(item.filename)"
                :alt="item.label"
                class="media-image"
            />
            <video
                v-else
                :src="getVideoUrl(item.filename)"
                controls
                class="media-video"
            ></video>
        </div>
    </div>
</template>

<script setup lang="ts">
// Принимаем данные через props
import { type FragmentType, useFragment } from '~/gql'
import { GalleryItemFragmentDoc } from '~/gql/graphql'

const props = defineProps<{
    data: FragmentType<typeof GalleryItemFragmentDoc>
}>()

const item = useFragment(GalleryItemFragmentDoc, props.data)

// Формирование URL для изображений
const getImageUrl = (filename: string) => {
    return `http://localhost:8080/storage/${filename}` // Замените на реальный путь к изображениям
}

// Формирование URL для видео
const getVideoUrl = (filename: string) => {
    return `http://localhost:8080/storage/${filename}` // Замените на реальный путь к видео
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

.label {
    font-size: 0.9rem;
    color: #333;
    text-align: center;
}
</style>
