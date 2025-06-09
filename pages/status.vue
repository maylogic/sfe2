<template>
    <form-login />
</template>
<script setup lang="ts">
import {
    getCanonicalUrl,
    getSiteTitle
} from "~/utils/seo";

definePageMeta({
    layout: 'care'
})
useHead({
    title: getSiteTitle('Статус заказа'),
    link: [
        {
            rel: 'canonical',
            href: getCanonicalUrl('status')
        }
    ]
})
</script>
