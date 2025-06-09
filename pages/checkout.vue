<template>
    <client-only>
        <suspense>
            <page-checkout/>
            <template #fallback>
                <loading-overlay>
                    <loading-page/>
                </loading-overlay>
            </template>
        </suspense>
    </client-only>
</template>
<script setup lang="ts">
import {
    getCanonicalUrl,
    getSiteTitle
} from "~/utils/seo";

definePageMeta({
    layout: 'checkout'
})
useHead({
    title: getSiteTitle('Оформление заказа'),
    link: [
        {
            rel: 'canonical',
            href: getCanonicalUrl('checkout')
        }
    ]
})
</script>