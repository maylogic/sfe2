<template>
    <div class="product-grid-container">
        <!-- Сетка карточек -->
        <div class="product-grid">
            <ProductMiniCard
                v-for="product in data?.products.data"
                :key="product.key"
                :data="product"/>
            <ProductMiniCard
                v-for="product in data?.products.data"
                :key="product.key"
                :data="product"/>
            <ProductMiniCard
                v-for="product in data?.products.data"
                :key="product.key"
                :data="product"/>
            <ProductMiniCard
                v-for="product in data?.products.data"
                :key="product.key"
                :data="product"/>
            <ProductMiniCard
                v-for="product in data?.products.data"
                :key="product.key"
                :data="product"/>
            <ProductMiniCard
                v-for="product in data?.products.data"
                :key="product.key"
                :data="product"/>
            <ProductMiniCard
                v-for="product in data?.products.data"
                :key="product.key"
                :data="product"/>
            <ProductMiniCard
                v-for="product in data?.products.data"
                :key="product.key"
                :data="product"/>
            <ProductMiniCard
                v-for="product in data?.products.data"
                :key="product.key"
                :data="product"/>
            <ProductMiniCard
                v-for="product in data?.products.data"
                :key="product.key"
                :data="product"/>
            <ProductMiniCard
                v-for="product in data?.products.data"
                :key="product.key"
                :data="product"/>
            <ProductMiniCard
                v-for="product in data?.products.data"
                :key="product.key"
                :data="product"/>
        </div>

        <pagination
            v-if="data?.products.paginatorInfo"
            :data="data?.products.paginatorInfo"
            @update:page="handlePageChange"
        />
    </div>
</template>
<script setup lang="ts">
// Импортируем необходимые утилиты

import { useQuery } from '@urql/vue'
import { ProductCardsDocument } from '~/gql/graphql'

// Обработчик изменения страницы
const handlePageChange = (newPage: number) => {
    currentPage.value = newPage
}
const currentPage = ref(1)

const {data, executeQuery} = await useQuery({
    query: ProductCardsDocument,
    variables: {
        first: 10,
        page: 1,
    },
})

onMounted(() => {
    if (import.meta.client) {
        executeQuery({
            requestPolicy: 'network-only',
            variables: {
                first: 10,
                page: 1,
            },
        })
    }
})
</script>

<style scoped>
.product-grid-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.product-grid {
    @apply grid gap-6 grid-cols-1 sm:grid-cols-3 md:grid-cols-4;
}

.card-link {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
}

.product-name {
    font-size: 1rem;
    font-weight: bold;
    color: #333;
}
</style>
