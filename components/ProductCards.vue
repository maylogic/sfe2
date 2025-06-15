<template>
    <div class="product-grid-container">
        <div class="product-grid">
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
import { useQuery } from '@urql/vue'
import { ProductCardsDocument } from '~/gql/graphql'

const handlePageChange = (newPage: number) => {
    currentPage.value = newPage
}
const currentPage = ref(1)

const {data} = await useQuery({
    query: ProductCardsDocument,
    variables: {
        first: 10,
        page: 1,
    },
})
</script>

<style scoped>
.product-grid-container {
    @apply flex flex-col gap-8 pb-20;
}

.product-grid {
    @apply grid gap-6 grid-cols-1 sm:grid-cols-3 md:grid-cols-4;
}
</style>
