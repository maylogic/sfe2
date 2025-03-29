<template>
    <nuxt-link :to="{ name: 'product-slug', params: { slug } }">
        <slot />
    </nuxt-link>
</template>
<script setup lang="ts">
defineProps<{
    slug: string
}>()
</script>
