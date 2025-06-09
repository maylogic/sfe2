<template>
    <form-return />
</template>
<script setup lang="ts">
import { getSiteTitle } from "~/utils/seo";

definePageMeta({
    layout: 'care'
})
useHead({
    title: getSiteTitle('Возврат заказа')
})
</script>
