<template>
    <personalize-item :selected="currentDesign?.id === design.id" @click="updateDesign">
        <div class="design-item">
            <img :src="getStorageUrl(design.preview)" :alt="design.label" style="width: 80px"/>
            <div class="label font-fira-sans">{{ design.label }}</div>
        </div>
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

const updateDesign = () => {
    emit("update:design", props.currentDesign?.id === design.id ? null : design)
}

const emit = defineEmits(['update:design'])
</script>
<style lang="scss">
.design-item {
    @apply relative;
    .label {
        @apply hidden absolute w-full h-full top-0 left-0 bg-white/80 text-storm-dust-950 text-sm;
    }

    &:hover {
        .label {
            @apply flex items-center justify-center text-center;
        }
    }
}
</style>