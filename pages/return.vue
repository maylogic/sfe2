<template>
    <form-return />
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
    title: getSiteTitle('Возврат заказа'),
    link: [
        {
            rel: 'canonical',
            href: getCanonicalUrl('return')
        }
    ]
})
</script>
