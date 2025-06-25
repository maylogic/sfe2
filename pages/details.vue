<template>
    <div class="prose mx-auto">
        <h1>Банковские реквизиты</h1>
        <company-details/>
    </div>
</template>
<script setup lang="ts">
import {
    getCanonicalUrl,
    getSiteTitle
} from "~/utils/seo";

useHead({
    title: getSiteTitle('Банковские реквизиты'),
    link: [
        {
            rel: 'canonical',
            href: getCanonicalUrl('details')
        }
    ]
})
</script>
