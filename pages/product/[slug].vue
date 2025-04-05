<template>
    <div class="product-page">
        <product-page-gallery :gallery="data.getProductBySlug.gallery"/>
        <product-info :product="data.getProductBySlug"/>
    </div>
</template>

<script setup>
import {useQuery} from '@urql/vue'
import {ProductBySlugDocument} from '~/gql/graphql.js'

const route = useRoute()
const productSlug = route.params.slug.toString()
const {data, error, fetching, executeQuery} = await useQuery({
    query: ProductBySlugDocument,
    variables: {slug: productSlug},
})
// Проверяем ошибки или отсутствие данных
if (error.value) {
    console.error('GraphQL Error:', error.value)
    throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
    })
}

if (!data.value.getProductBySlug) {
    // Если продукт не найден, выбрасываем 404 ошибку
    throw createError({statusCode: 404, statusMessage: 'Страница не найдена'})
}

useHead({
    title: data.value.getProductBySlug.meta_title,
    meta: [
        {
            name: 'description',
            content: data.value.getProductBySlug.meta_description,
        },
    ],
})

onMounted(() => {
    if (import.meta.client) {
        executeQuery({
            requestPolicy: 'network-only',
            variables: {slug: productSlug},
        })
    }
})
</script>

<style scoped lang="scss">
.product-page {
    @apply grid grid-cols-1 sm:grid-cols-2 gap-5;
}
</style>
