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
            <Suspense :key="`${categorySlug}-suspense-products-${refetchKey}`">
                <template #default>
                    <category-products
                        :key="`${categorySlug}-products-${refetchKey}`"
                        :refetch-key="refetchKey"
                        :filters="filters"
                        :category-slug="categorySlug"
                    />
                </template>
                <template #fallback> Loading... </template>
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
const { filters } = useFilters()
const refetchKey = ref(1)

// Применение фильтров
function applyFilters() {
    refetchKey.value += 1
}
</script>

<style scoped>
/* Добавьте стили по необходимости */
</style>
