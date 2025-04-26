<template>
    <personalize-block :valid="valid" :index="index" :label="option.label">
        <div class="flex flex-col gap-2 pr-5 pl-3 pb-3">
            <u-radio-group>
                <u-radio v-for="item in option.items" :label="item.label"/>
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

defineProps<{
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

const update = (optionId: ProductOptionId, val: ProductOptionItemId) => {
    emit('update:option', optionId, val)
}

const emit = defineEmits(['update:option'])
</script>