<template>
    <div
        class="price-container flex items-center font-fira-sans"
        :class="price.is_discounted ? 'discounted' : ''"
    >
        <span class="regular-price">
            {{ formatPrice(price.regular) }}
        </span>

        <span v-if="price.is_discounted" class="discounted-price text-brilliant-rose-500">
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
        @apply text-storm-dust-500 opacity-30;
        text-decoration: line-through;
        margin-bottom: -1px;
    }
}

.regular-price {
    font-weight: bold;
    font-size: 18px;
    color: #000;
}

.discounted-price {
    font-weight: 900;
    font-size: 18px;
}
</style>
