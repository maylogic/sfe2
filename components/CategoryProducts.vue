<template>
    <!-- Сетка карточек товаров -->
    <div class="grid grid-cols-3 gap-4">
        <product-mini-card
            v-if="products.length"
            v-for="product in products"
            :product-data="product"
        />
        <div v-else>Нет продуктов</div>
    </div>

    <UPagination
        v-if="products.length"
        v-model="currentPage"
        :page-count="pageInfo.lastPage"
        :total="pageInfo.total"
    />
</template>
<script setup lang="ts">
import { useQuery } from '@urql/vue'
import { GetFilteredCategoryProductsDocument } from '~/gql/graphql'
import { computed } from 'vue'
import type { DataProductFiltersInput } from '~/data/DataProductFiltersInput'

const props = defineProps<{
    categorySlug: string
    getFilters: () => DataProductFiltersInput
    refetchKey: number
    page: number
    perPage: number
}>()
const emit = defineEmits(['update:page'])

const variables = computed(() => ({
    categorySlug: props.categorySlug,
    filters: props.getFilters(),
    first: props.perPage,
    page: props.page,
}))

const currentPage = computed({
    get() {
        return props.page
    },
    set(value) {
        emit('update:page', value)
    },
})

const { data, executeQuery } = await useQuery({
    query: GetFilteredCategoryProductsDocument,
    variables,
    pause: true,
})

const products = computed(
    () => data.value?.getFilteredCategoryProducts?.data || []
)
const pageInfo = computed(
    () => data.value?.getFilteredCategoryProducts.paginatorInfo || {}
)

async function loadProducts() {
    await executeQuery()
}

await loadProducts()

watch(
    () => props.refetchKey,
    async () => {
        console.log('need refetch')
        await loadProducts()
    },
    { immediate: false }
)
watch(
    () => props.page,
    async () => {
        console.log('page update')
        await loadProducts()
    },
    { immediate: false }
)
</script>
