<template>
    <div
        class="price-container flex items-center"
        :class="price.is_discounted ? 'discounted' : ''"
    >
        <span class="regular-price">
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

<style scoped lang="scss">
.price-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    &.discounted .regular-price {
        text-decoration: line-through;
        color: #333;
        margin-bottom: -1px;
    }
}

.regular-price {
    font-size: 1rem;
    color: #000;
    opacity: 0.7;
}

.discounted-price {
    font-size: 1.2rem;
    color: var(--main-price-text-color);
    font-weight: bold;
}
</style>
