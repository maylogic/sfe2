<template>
    <product-page
        add-to-cart-label="Добавить в корзину"
        v-if="!!data?.getProductBySlug"
        :add-to-cart="addToCart"
        :adding-to-cart="addingToCart"
        :fetching="fetching"
        :input-data="inputData"
        :product-fragment="data?.getProductBySlug"/>
</template>
<script setup lang="ts">
import {
    useMutation,
    useQuery
} from '@urql/vue'
import {
    AddCartItemDocument,
    type PersonalizeInput,
    ProductBySlugDocument
} from '~/gql/graphql.js'
import {
    type PersonalizeInputData,
    type PersonalizeLineDefId
} from "~/utils/product";
import { useCartStore } from "~/stores/cart";

const props = defineProps<{ slug: string }>()

const {data, error, fetching} = await useQuery({
    query: ProductBySlugDocument,
    variables: {slug: props.slug},
})

if (error.value) {
    console.error('GraphQL Error:', error.value)
    throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
    })
}

if (!data.value?.getProductBySlug) {
    // Если продукт не найден, выбрасываем 404 ошибку
    throw createError({statusCode: 404, statusMessage: 'Страница не найдена'})
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
    return addToCartExec({
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