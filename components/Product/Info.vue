<template>
    <div class="product-info">
        <h1 class="font-bold font-iskra">{{ product.name }}</h1>
        <div v-html="product.description"/>
        <labeled-price label="От">
            <fragment-price class="text-2xl" :key="product.key" :data="product.price"/>
        </labeled-price>
    </div>
</template>
<script setup lang="ts">
import {
    PriceFragmentDoc,
    type Product
} from "~/gql/graphql";
import type { FragmentType } from "~/gql";
import LabeledPrice from "~/components/LabeledPrice.vue";

defineProps<{
    product: Pick<Product, 'name' | 'key' | 'description'> & { price: FragmentType<typeof PriceFragmentDoc> }
}>()
</script>