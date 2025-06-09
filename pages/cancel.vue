<template>
    <form-login />
</template>
<script setup lang="ts">
import { getSiteTitle } from "~/utils/seo";

definePageMeta({
    middleware: ['auth'],
    requiresGuest: true
})
useHead({
    title: getSiteTitle('Отмена заказа')
})
</script>
