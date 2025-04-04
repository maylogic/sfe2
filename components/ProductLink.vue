<template>
    <nuxt-link :to="{ name: 'product-slug', params: { slug } }" class="text-black">
        <slot/>
    </nuxt-link>
</template>
<script setup lang="ts">
defineProps<{
    slug: string
}>()
</script>
