<template>
    <div class="price-container">
        <!-- Отображение обычной цены -->
        <span v-if="price.regular" class="regular-price">
            {{ formatPrice(price.regular) }}
        </span>

        <!-- Отображение скидочной цены, если есть скидка -->
        <span v-if="price.is_discounted" class="discounted-price">
            {{ formatPrice(price.discounted) }}
        </span>

        <!-- Индикатор скидки -->
        <u-badge v-if="price.is_discounted" color="red" class="discount-badge">
            SALE
        </u-badge>
    </div>
</template>

<script setup lang="ts">
// Импортируем необходимые утилиты
import type { FragmentType } from '~/gql/index.js'
import { useFragment } from '~/gql/index.js'
import { PriceFragmentDoc } from '~/gql/graphql.js'

const props = defineProps<{
    data: FragmentType<typeof PriceFragmentDoc>
}>()

const price = useFragment(PriceFragmentDoc, props.data)

// Форматирование цены (добавление валюты или других символов)
const formatPrice = (value: number) => {
    return value ? `₽${value.toFixed(2)}` : 'N/A'
}
</script>

<style scoped>
.price-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.regular-price {
    font-size: 1rem;
    color: #333;
    opacity: 0.7;
}

.discounted-price {
    font-size: 1.2rem;
    color: #e74c3c;
    font-weight: bold;
    text-decoration: line-through;
}

.discount-badge {
    font-size: 0.8rem;
    padding: 0.2rem 0.5rem;
}
</style>
