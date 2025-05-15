<template>
    <Suspense>
        <page-product-slug :slug="slug"/>
        <template #fallback>
            <loading-page/>
        </template>
    </Suspense>
</template>
<script lang="ts" setup>
const route = useRoute()
const slug = route.params.slug.toString()
</script>