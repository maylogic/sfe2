<template>
    <div
        v-if="price.regular > 0 || !hideFree"
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

const props = withDefaults(defineProps<{
    data: FragmentType<typeof PriceFragmentDoc>
    hideFree?: boolean
}>(), {
    hideFree: false
})

const price = useFragment(PriceFragmentDoc, props.data)
</script>

<style scoped lang="scss">
.price-container {
    gap: 0.5rem;

    &.discounted .regular-price {
        @apply text-storm-dust-500 opacity-30;
        text-decoration: line-through;
        margin-bottom: -1px;
        font-weight: 700;
    }
}

.regular-price {
    font-weight: 900;
    color: #000;
}

.discounted-price {
    font-weight: 900;
}
</style>
