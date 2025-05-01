<template>
    <block-price v-if="price.regular > 0 || !hideFree" :regular="price.regular" :is_discounted="price.is_discounted"
                 :discounted="price.discounted"/>
</template>

<script setup lang="ts">
import type { FragmentType } from '~/gql/index.js'
import { useFragment } from '~/gql/index.js'
import { PriceFragmentDoc } from '~/gql/graphql.js'
import BlockPrice from "~/components/BlockPrice.vue";

const props = withDefaults(defineProps<{
    data: FragmentType<typeof PriceFragmentDoc>
    hideFree?: boolean
}>(), {
    hideFree: false
})

const price = useFragment(PriceFragmentDoc, props.data)
</script>
