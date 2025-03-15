<script setup lang="ts">
definePageMeta({
    middleware: ['auth'], // Используем middleware для защиты маршрута
    requiresAuth: true, // Добавляем метаданные для middleware
})
</script>

<template>
    <div>
        <h1>Profile Page</h1>
        <!-- Содержимое страницы профиля -->
    </div>
</template>
