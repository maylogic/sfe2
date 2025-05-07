<template>
    <ClientOnly>
        <Suspense>
            <page-cart-item-edit :id="id"/>
            <template #fallback>
                <loading-page/>
            </template>
        </Suspense>
    </ClientOnly>
</template>

<script setup lang="ts">

const route = useRoute()
const id = route.params.id.toString()

</script>
