<template>
    <USlideover v-model="cartStore.open">
        <sidebar-cart />
    </USlideover>
</template>
<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
</script>
