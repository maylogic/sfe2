<template>
    <Suspense>
        <page-cart-item-edit :id="id"/>
        <template #fallback>
            <loading-page/>
        </template>
    </Suspense>
</template>

<script setup lang="ts">

import {
    getCanonicalUrl,
    getSiteTitle
} from "~/utils/seo";

const route = useRoute()
const id = route.params.id.toString()

useHead({
    title: getSiteTitle('Редактирование'),
    link: [
        {
            rel: 'canonical',
            href: getCanonicalUrl(`cart/edit/${id}`)
        }
    ]
})
</script>
