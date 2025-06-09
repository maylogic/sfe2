<template>
    <form-register />
</template>
<script setup lang="ts">
import { getSiteTitle } from "~/utils/seo";

definePageMeta({
    middleware: ['auth'],
    requiresGuest: true,
})
useHead({
    title: getSiteTitle('Регистрация')
})
</script>
