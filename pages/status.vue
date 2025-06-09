<template>
    <form-login />
</template>
<script setup lang="ts">
import { getSiteTitle } from "~/utils/seo";

definePageMeta({
    layout: 'care'
})
useHead({
    title: getSiteTitle('Статус заказа')
})
</script>
