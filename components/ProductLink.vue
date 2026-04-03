<template>
    <nuxt-link :to="{ name: 'product-slug', params: { slug } }" class="text-black dark:text-white">
        <slot/>
    </nuxt-link>
</template>
<script setup lang="ts">
defineProps<{
    slug: string
}>()
</script>
