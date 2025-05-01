<template>
    <personalize-block :valid="valid" :index="index" :label="option.label">
        <div class="px-3">
            <u-radio-group :ui="{fieldset: 'flex flex-col gap-2'}"
                           @update:modelValue="update"
                           :model-value="values.get(option.id)"
                           :options="items">
                <template #label="{ option }">
                    <div class="size-label">
                        {{ option.label }}
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
    type ProductOption,
    type ProductOptionItem
} from "~/gql/graphql";
import type { FragmentType } from "~/gql";

const props = defineProps<{
    valid: boolean | null
    index: number
    option: Pick<ProductOption, "id" | "label"> & {
        items: Array<Pick<ProductOptionItem, "id" | "label"> & {
            price: FragmentType<typeof PriceFragmentDoc>
        }>
    }
    errors: Map<ProductOptionId, string>
    values: InputOptionsMap
}>()

const items = computed(() => props.option.items.map(item => ({
    value: item.id,
    label: item.label,
    price: item.price
})))

const update = (val: ProductOptionItemId) => {
    emit('update:option', props.option.id, val)
}

const emit = defineEmits(['update:option'])
</script>