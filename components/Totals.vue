<template>
    <div class="totals-container">
        <!-- Список итоговых сумм -->
        <div class="totals-list">
            <div class="totals-item">
                <span class="label">Подытог:</span>
                <span class="value">{{ formatPrice(totals.subtotal) }}</span>
            </div>

            <div v-if="totals.points_used" class="flex flex-col w-full">
                <div class="totals-item">
                    <span class="label">Использовано баллов:</span>
                    <span class="value">{{ totals.points_used }}</span>
                </div>
                <span class="points-description"
                    >(1 балл = 1 ₽, баллы применяются до применения других
                    скидок)</span
                >
            </div>

            <div class="totals-item grand-total">
                <span class="label">Итог:</span>
                <price class="value" :data="totals.grand_total" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FragmentType } from '~/gql/index.js'
import { useFragment } from '~/gql/index.js'
import { TotalsFragmentDoc } from '~/gql/graphql.js'
import { formatPrice } from '~/utils/price'

const props = defineProps<{
    data: FragmentType<typeof TotalsFragmentDoc>
}>()

const totals = computed(() => useFragment(TotalsFragmentDoc, props.data))
</script>

<style lang="scss">
.totals-container {
    border: 1px solid #e0e0e0;
    border-radius: 0.5rem;
    padding: 1rem;
    background-color: #f9f9f9;
}

.totals-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
}

.totals-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.totals-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.points-description {
    font-size: 12px;
}

.label {
    font-size: 1rem;
    color: #333;
}

.value {
    font-size: 1rem;
    font-weight: bold;
    color: #333;
    text-align: right;
}
.grand-total {
    .value {
        .regular-price {
            font-weight: bold;
            font-size: 22px;
        }
        &.discounted {
            .regular-price {
                font-weight: 400;
            }
        }
        .discounted-price {
            font-size: 22px;
        }
    }
}
</style>
