<template>
    <div class="flex">
        <category-filters
            :category-slug="categorySlug"
            :filters="filters"
            @apply-filters="applyFilters"
        />

        <!-- Правая панель: Товары -->
        <main class="w-3/4 p-4">
            <h2 class="text-xl font-bold mb-4">Товары</h2>
            <Suspense
                :key="`${categorySlug}-suspense-products-${refetchKey}-${page}`"
            >
                <template #default>
                    <category-products
                        :page="page"
                        @update:page="page = $event"
                        :refetch-key="refetchKey"
                        :get-filters="getInput"
                        :category-slug="categorySlug"
                        :per-page="2"
                    />
                </template>
                <template #fallback> Loading...</template>
            </Suspense>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useFilters } from '~/composables/useFilters.js'
import CategoryFilters from '~/components/CategoryFilters.vue'
import CategoryProducts from '~/components/CategoryProducts.vue'

const route = useRoute()
const categorySlug = route.params.slug.toString()

// Состояние фильтров
const { filters, getInput } = useFilters()
const refetchKey = ref(1)
const page = ref(1)

// Применение фильтров
function applyFilters() {
    refetchKey.value += 1
}
</script>

<style scoped>
/* Добавьте стили по необходимости */
</style>
