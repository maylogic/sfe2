<template>
    <form-register />
</template>
<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],
    requiresGuest: true,
})
</script>
