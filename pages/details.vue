<template>
    <div class="care-page">
        <h1>Банковские реквизиты</h1>
        <company-details/>
    </div>
</template>
<script setup lang="ts">
import { getSiteTitle } from "~/utils/seo";

definePageMeta({
    layout: 'care'
})
useHead({
    title: getSiteTitle('Банковские реквизиты')
})
</script>
