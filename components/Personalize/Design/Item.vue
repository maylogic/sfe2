<template>
    <personalize-item :class="{'selected': isCurrentDesign()}" @click="updateDesign">
        <img :src="getStorageUrl(design.preview)" :alt="design.label" style="width: 80px"/>
    </personalize-item>
</template>
<script setup lang="ts">
import {
    type FragmentType,
    useFragment
} from "~/gql";
import {
    type DesignItemFragment,
    DesignItemFragmentDoc
} from "~/gql/graphql";
import { getStorageUrl } from "~/constants/storage";

const props = defineProps<{
    currentDesign: DesignItemFragment | null
    data: FragmentType<typeof DesignItemFragmentDoc>
}>()

const design = useFragment(DesignItemFragmentDoc, props.data)
const isCurrentDesign = () => {
    return props.currentDesign?.id === design.id
}

const updateDesign = () => {
    emit("update:design", isCurrentDesign() ? null : design)
}

const emit = defineEmits(['update:design'])
</script>