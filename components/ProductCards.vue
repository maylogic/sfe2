<template>
    <div class="product-grid-container">
        <!-- Сетка карточек -->
        <div class="product-grid">
            <div
                v-for="product in data?.products.data"
                :key="product.key"
                class="product-card"
            >
                <ProductMiniCard :data="product" />
            </div>
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

const { data, executeQuery } = await useQuery({
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
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
}

.product-card {
    border: 1px solid #e0e0e0;
    border-radius: 0.5rem;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
}

.product-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
