<template>
    <Suspense>
        <product-cards/>
        <template #fallback>
            <loading-page/>
        </template>
    </Suspense>
</template>
<script setup lang="ts">
</script>