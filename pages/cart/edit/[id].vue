<template>
    <product-page
        v-if="!!data?.cartItem"
        :add-to-cart="addToCart"
        :adding-to-cart="addingToCart"
        :fetching="fetching"
        :input-data="inputData"
        :product-fragment="data?.cartItem.product"/>
</template>

<script setup lang="ts">
import {
    useMutation,
    useQuery
} from '@urql/vue'
import {
    AddCartItemDocument,
    CartItemDocument,
    DesignItemFragmentDoc,
    type PersonalizeInput
} from '~/gql/graphql.js'
import {
    type PersonalizeInputData,
    type PersonalizeLineDefId
} from "~/utils/product";
import { useCartStore } from "~/stores/cart";
import { useFragment } from "~/gql";

const route = useRoute()
const id = route.params.id.toString()

const {data, error, fetching, executeQuery} = await useQuery({
    query: CartItemDocument,
    variables: {id},
})

if (error.value) {
    console.error('GraphQL Error:', error.value)
    throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
    })
}

if (!data.value?.cartItem) {
    throw createError({statusCode: 404, statusMessage: 'Страница не найдена'})
}
const item = data.value.cartItem
const textLines: Array<[string, string]> = item.text_lines?.map(line => [line.product_line_definition.id, line.value]) || []
const inputData = reactive<PersonalizeInputData>({
    design: useFragment(DesignItemFragmentDoc, item.design) || null,
    color: item.color || null,
    font: item.font || null,
    textLines: new Map<PersonalizeLineDefId, string | null>(textLines),
    size: data.value.cartItem.product_size?.id || null,
    options: new Map
})
const {executeMutation: addToCartExec, fetching: addingToCart} = useMutation(AddCartItemDocument)
const cart = useCartStore()
const addToCart = (productId: string, personalize: PersonalizeInput) => {
    addToCartExec({
        productId,
        quantity: 1,
        personalize
    }).then((result) => {
        if (result.data?.addCartItem) {
            cart.setData(result.data?.addCartItem)
            cart.open = true
        }
    })
}
</script>
