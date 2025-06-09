<script setup lang="ts">
import { getCanonicalUrl } from "~/utils/seo";

definePageMeta({
    middleware: ['auth'], // Используем middleware для защиты маршрута
    requiresAuth: true, // Добавляем метаданные для middleware
})
useHead({
    title: 'Мой профиль на safepets',
    link: [
        {
            rel: 'canonical',
            href: getCanonicalUrl('profile')
        }
    ]
})
</script>

<template>
    <div>
        <h1>Profile Page</h1>
        <!-- Содержимое страницы профиля -->
    </div>
</template>
