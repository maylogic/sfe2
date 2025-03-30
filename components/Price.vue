<template>
    <div
        class="price-container"
        :class="price.is_discounted ? 'discounted' : ''"
    >
        <span v-if="price.regular" class="regular-price">
            {{ formatPrice(price.regular) }}
        </span>

        <span v-if="price.is_discounted" class="discounted-price">
            {{ formatPrice(price.discounted) }}
        </span>
    </div>
</template>

<script setup lang="ts">
// Импортируем необходимые утилиты
import type { FragmentType } from '~/gql/index.js'
import { useFragment } from '~/gql/index.js'
import { PriceFragmentDoc } from '~/gql/graphql.js'
import { formatPrice } from '~/utils/price'

const props = defineProps<{
    data: FragmentType<typeof PriceFragmentDoc>
}>()

const price = useFragment(PriceFragmentDoc, props.data)
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

.price-container.discounted .regular-price {
    text-decoration: line-through;
}

.discounted-price {
    font-size: 1.2rem;
    color: #e74c3c;
    font-weight: bold;
}

.discount-badge {
    font-size: 0.8rem;
    padding: 0.2rem 0.5rem;
}
</style>
