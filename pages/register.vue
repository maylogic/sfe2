<template>
    <form-register />
</template>
<script setup lang="ts">
import {
    getCanonicalUrl,
    getSiteTitle
} from "~/utils/seo";

definePageMeta({
    middleware: ['auth'],
    requiresGuest: true,
})
useHead({
    title: getSiteTitle('Регистрация'),
    link: [
        {
            rel: 'canonical',
            href: getCanonicalUrl('register')
        }
    ]
})
</script>
