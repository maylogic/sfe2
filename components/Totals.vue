<template>
    <div class="totals-container font-iskra">
        <!-- Список итоговых сумм -->
        <div class="totals-list">
            <div class="totals-item">
                <span class="label font-normal">Подытог:</span>
                <span class="value font-fira-sans">{{ formatPrice(totals.subtotal) }}</span>
            </div>

            <div v-if="totals.points_used" class="flex flex-col w-full">
                <div class="totals-item">
                    <span class="label">Использовано баллов:</span>
                    <span class="text-xl">{{ totals.points_used }}</span>
                </div>
                <span class="points-description">(1 балл = 1 ₽, применяются до других скидок)</span>
            </div>

            <div class="totals-item">
                <span class="label font-black">{{ grandTotalLabel }}</span>
                <fragment-price :data="totals.grand_total"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FragmentType } from '~/gql'
import { useFragment } from '~/gql'
import { TotalsFragmentDoc } from '~/gql/graphql.js'
import { formatPrice } from '~/utils/price'

const props = withDefaults(defineProps<{
    data: FragmentType<typeof TotalsFragmentDoc>,
    grandTotalLabel?: string
}>(), {
    grandTotalLabel: 'Итог:'
})

const totals = computed(() => useFragment(TotalsFragmentDoc, props.data))
</script>

<style lang="scss">
.totals-container {
    border-top: 1px solid rgba(0, 0, 26, 0.1);
    @apply py-2 px-0;

    .totals-title {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 1rem;
        text-align: center;
    }

    .totals-list {
        @apply flex flex-col gap-1;
    }

    .totals-item {
        @apply flex items-center justify-between;

        .label {
            @apply text-base;
        }
    }

    .points-description {
        font-size: 12px;
    }
}

</style>
