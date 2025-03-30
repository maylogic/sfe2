<template>
    <UCard :key="product.id">
        <product-link :slug="product.slug">
            <GalleryItem
                v-if="product.primary_image"
                :data="product.primary_image"
            />
        </product-link>
        <product-link :slug="product.slug">
            <h3 class="font-semibold">{{ product.name }}</h3>
        </product-link>
        <price :data="product.price" />
        <div class="flex items-center justify-between mt-4">
            <quantity-input
                :quantity="quantity"
                @update:quantity="quantity = $event"
            />

            <UButton
                label="Add to Cart"
                color="primary"
                size="sm"
                @click="addToCart"
            />
        </div>
    </UCard>
</template>
<script setup lang="ts">
import { type FragmentType, useFragment } from '~/gql'
import {
    AddCartItemDocument,
    ProductMiniFragmentDoc,
    SidebarCartFragmentDoc,
} from '~/gql/graphql'
import Price from '~/components/Price.vue'
import { useMutation } from '@urql/vue'
import { useCartStore } from '~/stores/cart'
import ProductLink from '~/components/ProductLink.vue'
import QuantityInput from '~/components/QuantityInput.vue'

const props = defineProps<{
    data: FragmentType<typeof ProductMiniFragmentDoc>
}>()
const cart = useCartStore()

const product = useFragment(ProductMiniFragmentDoc, props.data)

const { executeMutation } = useMutation(AddCartItemDocument)

// Локальное состояние для количества
const quantity = ref(1)

const addToCart = async () => {
    const { data } = await executeMutation({
        productId: product.id,
        quantity: quantity.value,
    })
    if (data?.addCartItem) {
        const cartData = useFragment(SidebarCartFragmentDoc, data?.addCartItem)
        cart.setData(cartData)
        console.log(cart.cart, cartData, data)
    }
}
</script>
