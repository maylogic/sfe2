<template>
    <aside class="w-1/4 p-4 border-r">
        <h2 class="text-lg font-bold mb-4">Фильтры</h2>

        <!-- Фильтр по цене -->
        <div class="mb-4">
            <h3 class="font-semibold">Цена</h3>
            <input
                v-model="filters.priceRange.min"
                type="number"
                placeholder="Min"
                class="w-full p-2 border rounded"
            />
            <input
                v-model="filters.priceRange.max"
                type="number"
                placeholder="Max"
                class="w-full p-2 border rounded mt-2"
            />
        </div>

        <!-- Фильтр по рейтингу -->
        <div class="mb-4">
            <h3 class="font-semibold">Рейтинг</h3>
            <input
                v-model="filters.ratingRange.min"
                type="number"
                placeholder="Min"
                class="w-full p-2 border rounded"
            />
            <input
                v-model="filters.ratingRange.max"
                type="number"
                placeholder="Max"
                class="w-full p-2 border rounded mt-2"
            />
        </div>

        <!-- Фильтры по атрибутам -->
        <div
            v-for="attribute in availableFilters.attributes"
            :key="attribute.code"
            class="mb-4"
        >
            <attribute-value-checkboxes
                :code="attribute.code"
                :attributes="filters.attributes"
                :available-values="attribute.values"
            />
        </div>

        <!-- Кнопка применения фильтров -->
        <u-button @click="emit('apply-filters')"> Применить </u-button>
    </aside>
</template>
<script setup lang="ts">
import {
    CategoryProductFiltersFragmentDoc,
    GetCategoryProductFiltersDocument,
} from '~/gql/graphql'
import { useQuery } from '@urql/vue'
import { computed } from 'vue'
import { useFragment } from '~/gql'
import AttributeValueCheckboxes from '~/components/Form/AttributeValueCheckboxes.vue'

const props = defineProps<{
    categorySlug: string
    filters: FilterValues
}>()

const { data: availableFiltersData } = await useQuery({
    query: GetCategoryProductFiltersDocument,
    variables: { categorySlug: props.categorySlug },
})
const availableFilters = computed(
    () =>
        useFragment(
            CategoryProductFiltersFragmentDoc,
            availableFiltersData.value?.getCategoryProductFilters
        ) || { attributes: [] }
)
const emit = defineEmits(['apply-filters'])
</script>
