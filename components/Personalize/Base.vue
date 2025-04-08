<template>
    <g v-html="base.content"/>
</template>
<script lang="ts" setup>
import {
    type FragmentType,
    useFragment
} from "~/gql";
import { BaseFragmentFragmentDoc } from "~/gql/graphql";

const props = defineProps<{
    data: FragmentType<typeof BaseFragmentFragmentDoc>
}>()
const base = useFragment(BaseFragmentFragmentDoc, props.data)
</script>