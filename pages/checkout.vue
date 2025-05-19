<template>
    <suspense>
        <page-checkout/>
        <template #fallback>
            <loading-overlay>
                <loading-page/>
            </loading-overlay>
        </template>
    </suspense>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'checkout'
})
</script>