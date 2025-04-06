<template>
    <div class="product-page" v-if="!!data?.getProductBySlug">
        <product-page-gallery :gallery="data.getProductBySlug.gallery"/>
        <div class="flex flex-col">
            <product-info :product="data.getProductBySlug"/>
            <div class="create-fields">
                <h2 class="font-fira-sans">Создание и предпросмотр</h2>
                <product-designs @update:design="addProductData.designId = $event"
                                 :design-id="addProductData.designId"
                                 :data="data.getProductBySlug.designs"/>
                <add-to-cart :disabled="false" :product-id="data.getProductBySlug.id"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useQuery } from '@urql/vue'
import { ProductBySlugDocument } from '~/gql/graphql.js'

const route = useRoute()
const productSlug = route.params.slug.toString()

const addProductData = reactive({
    designId: null
})

const {data, error, fetching, executeQuery} = await useQuery({
    query: ProductBySlugDocument,
    variables: {slug: productSlug},
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

<style lang="scss">
.product-page {
    @apply grid grid-cols-1 sm:grid-cols-2 gap-5;
    .create-fields {
        @apply bg-storm-dust-50 p-5;
        h2 {
            @apply text-4xl mb-5;
        }
        .personalize-block {
            @apply p-3 pt-0 bg-white border-l-storm-dust-100 border-l-[6px];
            h3 {
                @apply py-3;
            }
        }
    }
}
</style>
