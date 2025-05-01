<template>
    <personalize-block :index="index" :valid="valid" label="Выберите размер">
        <div class="px-3">
            <u-radio-group :ui="{fieldset: 'flex flex-col gap-2'}"
                           @update:modelValue="updateSize"
                           :model-value="currentSize ?? 'none'"
                           :options="items">
                <template #label="{ option }">
                    <div class="size-label">
                        {{ option.label }} (диаметр {{option.size}} см)
                        <fragment-price :hide-free="true" :data="option.price"/>
                    </div>
                </template>
            </u-radio-group>
        </div>
    </personalize-block>
</template>
<script setup lang="ts">
import {
    PriceFragmentDoc,
    type ProductSize
} from "~/gql/graphql";
import type { FragmentType } from "~/gql";

const props = defineProps<{
    index: number
    valid: boolean | null
    currentSize: ProductSizeId | null
    data: Array<Pick<ProductSize, "id" | "label" | "width"> & { price: FragmentType<typeof PriceFragmentDoc> }>
}>()

const items = computed(() => props.data.map(item => ({
    value: item.id,
    label: item.label,
    price: item.price,
    size: (item.width / 10).toFixed(1)
})))

const updateSize = (sizeId: ProductSizeId) => {
    emit("update:size", sizeId)
}

const emit = defineEmits(['update:size'])
</script>
<style lang="scss">
.size-label {
    .price-container {
        display: inline-flex;
    }
}
</style>