<template>
    <closable-slideover v-model="cartStore.open" title="Корзина">
        <sidebar-cart :key="cartStore.cart.key" />
    </closable-slideover>
</template>
<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
await cartStore.hydrate()
</script>
