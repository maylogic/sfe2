<template>
    <div>
        {{ line.definition.label }}: {{ line.value }}
    </div>
</template>

<script setup lang="ts">
import type { FragmentType } from '~/gql/index.js'
import { useFragment } from '~/gql/index.js'
import { CartTextLineFragmentDoc } from '~/gql/graphql.js'

const props = defineProps<{
    data: FragmentType<typeof CartTextLineFragmentDoc>
}>()

const line = useFragment(CartTextLineFragmentDoc, props.data)
</script>

<style scoped lang="scss">

</style>
