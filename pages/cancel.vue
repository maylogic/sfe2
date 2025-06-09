<template>
    <form-login />
</template>
<script setup lang="ts">
import {
    getCanonicalUrl,
    getSiteTitle
} from "~/utils/seo";

definePageMeta({
    middleware: ['auth'],
    requiresGuest: true
})
useHead({
    title: getSiteTitle('Отмена заказа'),
    link: [
        {
            rel: 'canonical',
            href: getCanonicalUrl('cancel')
        }
    ]
})
</script>
