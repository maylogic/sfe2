<template>
    <suspense>
        <page-order-pay :order-id="orderId"/>
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

const route = useRoute()
const orderId = route.params.id.toString()

</script>