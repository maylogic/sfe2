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
definePageMeta({
    layout: 'checkout'
})
</script>