<template>
    <nuxt-link :to="{ name: 'product-slug', params: { slug } }" class="hover:text-viking-500 text-storm-dust-800">
        <slot />
    </nuxt-link>
</template>
<script setup lang="ts">
defineProps<{
    slug: string
}>()
</script>
