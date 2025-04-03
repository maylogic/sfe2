<template>
    <div class="flex items-center justify-between mt-4">
        <quantity-input
            :quantity="quantity"
            @update:quantity="quantity = $event"
        />

        <UButton
            label="Add to Cart"
            size="sm"
            @click="addToCart"
        />
    </div>
</template>
<script setup lang="ts">
import QuantityInput from "~/components/QuantityInput.vue";
import { useFragment } from "~/gql";
import {
    AddCartItemDocument,
    SidebarCartFragmentDoc
} from "~/gql/graphql";
import { useMutation } from "@urql/vue";
import { useCartStore } from "~/stores/cart";

const props = defineProps<{
    productId: string
}>()
// Локальное состояние для количества
const quantity = ref(1)
const cart = useCartStore()

const {executeMutation} = useMutation(AddCartItemDocument)
const addToCart = () => {
    executeMutation({
        productId: props.productId,
        quantity: quantity.value,
    }).then((result) => {
        if (result.data?.addCartItem) {
            const cartData = useFragment(
                SidebarCartFragmentDoc,
                result.data?.addCartItem
            )
            cart.setData(cartData)
        }
    })
}
</script>