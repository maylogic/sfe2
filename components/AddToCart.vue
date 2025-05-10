<template>
    <div class="flex max-w-fit gap-2 items-center justify-between mt-4">
        <quantity-input
            v-if="withQuantity"
            :disabled="disabled || fetching"
            :quantity="quantity"
            @update:quantity="quantity = $event"
        />

        <UButton
            :label="fetching ? 'Добавляем в корзину...' : 'Добавить в корзину'"
            :disabled="disabled || fetching"
            size="sm"
            @click="addToCart ?? addToCartInternal"
            class="uppercase font-bebas-neue pt-2 text-2xl"
        />
    </div>
</template>
<script setup lang="ts">
import QuantityInput from "~/components/QuantityInput.vue";
import { AddCartItemDocument } from "~/gql/graphql";
import { useMutation } from "@urql/vue";
import { useCartStore } from "~/stores/cart";

const props = withDefaults(defineProps<{
    productId: string
    disabled: boolean
    withQuantity?: boolean
    addToCart?: () => void
}>(), {disabled: false, withQuantity: true})
// Локальное состояние для количества
const quantity = ref(1)
const cart = useCartStore()

const {executeMutation, fetching} = useMutation(AddCartItemDocument)
const addToCartInternal = () => {
    executeMutation({
        productId: props.productId,
        quantity: quantity.value,
    }).then((result) => {
        if (result.data?.addCartItem) {
            cart.setData(result.data?.addCartItem)
            cart.open = true
            quantity.value = 1
        }
    })
}
</script>