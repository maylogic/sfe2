<template>
    <div class="product-info">
        <h1 class="font-bold font-iskra">{{ product.name }}</h1>
        <div v-html="product.description"/>
        <price class="text-2xl" :key="product.key" :data="product.price"/>
    </div>
</template>
<script setup lang="ts">
import {
    PriceFragmentDoc,
    type Product
} from "~/gql/graphql";
import type { FragmentType } from "~/gql";

defineProps<{ product: Pick<Product, 'name' | 'key' | 'description'> & { price: FragmentType<typeof PriceFragmentDoc> } }>()
</script>

<style lang="scss">
.product-info {
    h1 {
        font-size: 32px;
    }
}
</style>