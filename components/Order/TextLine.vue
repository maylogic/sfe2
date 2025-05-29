<template>
    <div class="text-line-value" v-if="!showOnlyRequired || line.product_line_definition.required">
        <span class="def">{{ line.product_line_definition.label }}:</span>
        <span class="val">{{ line.value }}</span>
    </div>
</template>

<script setup lang="ts">
import type { FragmentType } from '~/gql/index.js'
import { useFragment } from '~/gql/index.js'
import { OrderTextLineFragmentDoc } from '~/gql/graphql.js'

const props = withDefaults(defineProps<{
    data: FragmentType<typeof OrderTextLineFragmentDoc>,
    showOnlyRequired?: boolean
}>(), {
    showOnlyRequired: false
})

const line = useFragment(OrderTextLineFragmentDoc, props.data)
</script>

<style lang="scss">

</style>
