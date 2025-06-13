<template>
    <div
        class="price-container font-fira-sans"
        :class="is_discounted ? 'discounted' : ''"
    >
        <span v-if="is_discounted" itemprop="price" class="discounted-price text-brilliant-rose-500">
            {{ formatPrice(discounted, 2) }}
        </span>
        <span class="regular-price" itemprop="price">
            {{ formatPrice(regular) }}
        </span>
        <span class="currency">₽</span>
        <span class="hidden" itemprop="priceCurrency">RUB</span>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    regular: number,
    is_discounted: boolean,
    discounted: number
}>()
</script>
<style lang="scss">
.price-container {
    @apply inline-flex items-center;
    gap: 0.15rem;

    &.discounted .regular-price {
        @apply text-storm-dust-500 opacity-30;
        text-decoration: line-through;
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