<template>
    <div class="totals-container font-fira-sans">
        <!-- Список итоговых сумм -->
        <div class="totals-list">
            <div class="totals-item">
                <span class="label font-bold">Подытог:</span>
                <span class="value">{{ formatPrice(totals.subtotal) }}</span>
            </div>

            <div v-if="totals.points_used" class="flex flex-col w-full">
                <div class="totals-item">
                    <span class="label">Использовано баллов:</span>
                    <span class="value">{{ totals.points_used }}</span>
                </div>
                <span class="points-description">(1 балл = 1 ₽, применяются до других скидок)</span>
            </div>

            <div class="totals-item grand-total">
                <span class="label font-black">Итог:</span>
                <price class="value" :data="totals.grand_total"/>
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
    border: 1px solid rgba(0, 0, 26, 0.1);
    padding: 1rem;
    background-color: #f5f5f5;
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
