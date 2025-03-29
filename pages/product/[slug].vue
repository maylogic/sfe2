<template>
    <div class="flex">
        {{ productSlug }}
    </div>
</template>

<script setup>
import { useQuery } from '@urql/vue'
import { ProductBySlugDocument } from '~/gql/graphql.js'

const route = useRoute()
const productSlug = route.params.slug.toString()
const { data, error, fetching } = await useQuery({
    query: ProductBySlugDocument,
    variables: { slug: productSlug },
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
    throw createError({ statusCode: 404, statusMessage: 'Страница не найдена' })
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
</script>

<style scoped>
/* Добавьте стили по необходимости */
</style>
