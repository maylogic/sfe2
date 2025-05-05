<template>
    <product-page
        v-if="!!data?.cartItem"
        :add-to-cart="addToCart"
        :adding-to-cart="addingToCart"
        :fetching="fetching"
        :input-data="inputData"
        :init-data="initData"
        :product-fragment="data?.cartItem.product"/>
</template>
<script setup lang="ts">

import {
    useMutation,
    useQuery
} from "@urql/vue";
import {
    AddCartItemDocument,
    CartItemDocument,
    DesignItemFragmentDoc,
    type PersonalizeInput
} from "~/gql/graphql";
import type {
    PersonalizeInputData,
    PersonalizeLineDefId
} from "~/utils/product";
import { useFragment } from "~/gql";
import { useCartStore } from "~/stores/cart";

const props = defineProps<{
    id: string
}>()

const {data, error, fetching} = await useQuery({
    query: CartItemDocument,
    variables: {id: props.id},
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
const textLines: Array<[PersonalizeLineDefId, string]> = item.text_lines?.map(line => [line.product_line_definition.id, line.value]) || []
const options: Array<[ProductOptionId, ProductOptionItemId]> = item.option_items?.map(optionItem => [optionItem.product_option.id, optionItem.id]) || []
const initData: PersonalizeInputData = {
    design: useFragment(DesignItemFragmentDoc, item.design) || null,
    color: item.color || null,
    font: item.font || null,
    textLines: new Map<PersonalizeLineDefId, string | null>(textLines),
    size: data.value.cartItem.product_size?.id || null,
    options: new Map(options)
}
const inputData = reactive<PersonalizeInputData>({
    design: null,
    color: null,
    font: null,
    textLines: new Map<PersonalizeLineDefId, string | null>(),
    size: null,
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