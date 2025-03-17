<template>
    <!-- Сетка карточек товаров -->
    <div class="grid grid-cols-3 gap-4">
        <div
            v-for="product in products"
            :key="product.id"
            class="border p-4 rounded"
        >
            <img
                :src="product.primaryImage?.url"
                alt="Product Image"
                class="w-full h-48 object-cover mb-2"
            />
            <h3 class="font-semibold">{{ product.name }}</h3>
            <p>
                {{ product.price.value.amount }}
                {{ product.price.value.currency.symbol }}
            </p>
            <p>Рейтинг: {{ product.averageRating || 'Нет отзывов' }}</p>
            <button class="bg-green-500 text-white px-4 py-2 rounded mt-2">
                Добавить в корзину
            </button>
        </div>
    </div>

    <!-- Пагинация -->
    <div class="mt-4 flex justify-center">
        <button
            v-if="page > 1"
            @click="prevPage"
            class="bg-gray-300 px-4 py-2 rounded mr-2"
        >
            Назад
        </button>
        <button
            v-if="hasMore"
            @click="nextPage"
            class="bg-gray-300 px-4 py-2 rounded"
        >
            Вперед
        </button>
    </div>
</template>
<script setup lang="ts">
import { useQuery } from '@urql/vue'
import { GetFilteredCategoryProductsDocument } from '~/gql/graphql'
import { computed, ref } from 'vue'

const props = defineProps<{
    categorySlug: string
    filters: FilterValues
    refetchKey: number
}>()

// Пагинация
const page = ref(1)
const perPage = 12 // Количество товаров на странице

const hasMore = ref(2)
const { data, executeQuery } = useQuery({
    query: GetFilteredCategoryProductsDocument,
    variables: {
        categorySlug: props.categorySlug,
        filters: props.filters,
        first: 10,
    },
    requestPolicy: 'network-only',
    pause: true,
})

const products = computed(
    () =>
        data.value?.getFilteredCategoryProducts?.edges?.map(
            (edge) => edge?.node
        ) || []
)

async function loadProducts() {
    await executeQuery()
}

await executeQuery()

watch(
    () => props.refetchKey,
    async () => {
        await loadProducts()
    }
)

// Переход к следующей странице
function nextPage() {
    if (hasMore.value) {
        page.value++
        applyFilters()
    }
}

// Переход к предыдущей странице
function prevPage() {
    if (page.value > 1) {
        page.value--
        applyFilters()
    }
}
</script>
