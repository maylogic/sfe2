<template>
    <div class="flex">
        <!-- Левая панель: Фильтры -->
        <aside class="w-1/4 p-4 border-r">
            <h2 class="text-lg font-bold mb-4">Фильтры</h2>

            <!-- Фильтр по цене -->
            <div class="mb-4">
                <h3 class="font-semibold">Цена</h3>
                <input
                    v-model="filters.price.min"
                    type="number"
                    placeholder="Min"
                    class="w-full p-2 border rounded"
                />
                <input
                    v-model="filters.price.max"
                    type="number"
                    placeholder="Max"
                    class="w-full p-2 border rounded mt-2"
                />
            </div>

            <!-- Фильтр по рейтингу -->
            <div class="mb-4">
                <h3 class="font-semibold">Рейтинг</h3>
                <input
                    v-model="filters.rating.min"
                    type="number"
                    placeholder="Min"
                    class="w-full p-2 border rounded"
                />
                <input
                    v-model="filters.rating.max"
                    type="number"
                    placeholder="Max"
                    class="w-full p-2 border rounded mt-2"
                />
            </div>

            <!-- Фильтры по атрибутам -->
            <div
                v-for="attribute in availableFilters.attributes"
                :key="attribute.attribute_code"
                class="mb-4"
            >
                <h3 class="font-semibold">{{ attribute.label }}</h3>
                <div
                    v-for="value in attribute.values"
                    :key="value"
                    class="flex items-center"
                >
                    <input
                        v-model="filters.attributes[attribute.attribute_code]"
                        type="checkbox"
                        :value="value"
                        class="mr-2"
                    />
                    <label>{{ value }}</label>
                </div>
            </div>

            <!-- Кнопка применения фильтров -->
            <button
                @click="applyFilters"
                class="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Применить
            </button>
        </aside>

        <!-- Правая панель: Товары -->
        <main class="w-3/4 p-4">
            <h2 class="text-xl font-bold mb-4">Товары</h2>

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
                    <button
                        class="bg-green-500 text-white px-4 py-2 rounded mt-2"
                    >
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
        </main>
    </div>
</template>

<script setup>
import { useQuery } from '@urql/vue'
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
    GetCategoryProductFiltersDocument,
    GetFilteredCategoryProductsDocument,
} from '~/gql/graphql.js'

const route = useRoute()
const categorySlug = route.params.slug

// Состояние фильтров
const filters = reactive({
    price: { min: null, max: null },
    rating: { min: null, max: null },
    attributes: {},
})

// Пагинация
const page = ref(1)
const perPage = 12 // Количество товаров на странице

// Получение доступных фильтров
const { data: availableFiltersData } = useQuery({
    query: GetCategoryProductFiltersDocument,
    variables: { categorySlug },
})

// Доступные фильтры
const availableFilters = computed(
    () => availableFiltersData.value?.productFilters || {}
)

// Получение товаров
const { data: productsData, executeQuery } = useQuery({
    query: GetFilteredCategoryProductsDocument,
    variables: {
        categorySlug,
        filters: {},
        page: page.value,
        perPage,
    },
})

// Товары и информация о пагинации
const products = computed(() => productsData.value?.searchProducts || [])
const pageInfo = computed(() => productsData.value?.pageInfo || {})

// Есть ли еще страницы
const hasMore = computed(() => page.value < pageInfo.value.totalPages)

// Применение фильтров
function applyFilters() {
    page.value = 1 // Сброс страницы при применении фильтров
    executeQuery({
        categorySlug,
        filters,
        page: page.value,
        perPage,
    })
}

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

<style scoped>
/* Добавьте стили по необходимости */
</style>
