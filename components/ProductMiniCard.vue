<template>
    <UCard :key="product.key">
        <product-link :slug="product.slug">
            <GalleryItem
                v-if="product.primary_image"
                :data="product.primary_image"
            />
        </product-link>
        <product-link :slug="product.slug">
            <h3 class="font-semibold">{{ product.name }}</h3>
        </product-link>
        <price :data="product.price"/>
        <u-button class="uppercase" block :to="`/product/${product.slug}`">Создать</u-button>
    </UCard>
</template>
<script setup lang="ts">
import {
    type FragmentType,
    useFragment
} from '~/gql'
import { ProductMiniFragmentDoc, } from '~/gql/graphql'
import Price from '~/components/Price.vue'
import ProductLink from '~/components/ProductLink.vue'

const props = defineProps<{
    data: FragmentType<typeof ProductMiniFragmentDoc>
}>()

const product = useFragment(ProductMiniFragmentDoc, props.data)
</script>
