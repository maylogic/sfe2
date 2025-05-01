<template>
    <div
        v-if="regular > 0 || !hideFree"
        class="price-container flex items-center font-fira-sans"
        :class="is_discounted ? 'discounted' : ''"
    >
        <span v-if="is_discounted" class="discounted-price text-brilliant-rose-500">
            {{ formatPrice(discounted) }}
        </span>
        <span class="regular-price">
            {{ formatPrice(regular) }}
        </span>
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    regular: number,
    is_discounted: boolean,
    discounted: number,
    hideFree?: boolean
}>(), {
    hideFree: false
})
</script>
<style lang="scss">
.price-container {
    @apply inline-flex;
    gap: 0.5rem;

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