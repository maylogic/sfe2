<template>
    <div class="design-item" :class="{'selected': designId === design.id}" @click="updateDesign">
        <img :src="getStorageUrl(design.preview)" :alt="design.label" />
    </div>
</template>
<script setup lang="ts">
import {
    type FragmentType,
    useFragment
} from "~/gql";
import { DesignItemFragmentDoc } from "~/gql/graphql";
import { getStorageUrl } from "~/constants/storage";

const props = defineProps<{
    designId: string | null
    data: FragmentType<typeof DesignItemFragmentDoc>
}>()

const design = useFragment(DesignItemFragmentDoc, props.data)

const updateDesign = () => {
    emit("update:design", design.id)
}

const emit = defineEmits(['update:design'])
</script>
<style lang="scss">
.design-item {
    @apply cursor-pointer relative;
    img {
        width: 80px;
    }

    &:before {
        @apply border-viking-500 border-[.125rem] rounded-2xl;
        content: "";
        position: absolute;
        left: -.3125rem;
        right: -.3125rem;
        bottom: -.3125rem;
        top: -.3125rem;
        opacity: 0;
        transition: opacity .15s;
    }

    &.selected {
        &:before {
            opacity: 1;
        }
    }
}
</style>