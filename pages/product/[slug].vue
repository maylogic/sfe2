<template>
    <div class="flex">
        {{ productSlug }}
    </div>
</template>

<script setup>
const route = useRoute()
const productSlug = route.params.slug.toString()
</script>

<style scoped>
/* Добавьте стили по необходимости */
</style>
