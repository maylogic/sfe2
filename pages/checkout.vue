<template>
    <client-only>
        <suspense>
            <page-checkout/>
            <template #fallback>
                <loading-page/>
            </template>
        </suspense>
    </client-only>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'checkout'
})
</script>