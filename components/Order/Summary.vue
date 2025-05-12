<template>
    <div class="order-summary font-iskra">
        <span class="mt-[-0.2rem] flex items-center gap-2">
            <u-icon class="text-[20px]" name="i-lucide-shopping-cart"/>
            <span>Итог: </span>
        </span>
        <fragment-price :data="totals.grand_total"/>
        <div class="ml-auto">
            <slot/>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FragmentType } from '~/gql/index.js'
import { useFragment } from '~/gql/index.js'
import { TotalsFragmentDoc } from '~/gql/graphql.js'

const props = defineProps<{
    data: FragmentType<typeof TotalsFragmentDoc>
}>()

const totals = computed(() => useFragment(TotalsFragmentDoc, props.data))
</script>

<style lang="scss">
.order-summary {
    @apply flex items-center gap-1;
}
</style>
