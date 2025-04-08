<template>
    <div class="editor">
        <svg viewBox="0 0 300 200">
            <personalize-base transform="translate(20, 40)" v-if="reverseSideBase" :data="reverseSideBase"/>
            <personalize-base transform="translate(160, 40)" :key="personalizeData.design.id" v-if="personalizeData.design" :data="personalizeData.design.bases[0]"/>
        </svg>
    </div>
</template>
<script lang="ts" setup>

import type { FragmentType } from "~/gql";
import { BaseFragmentFragmentDoc } from "~/gql/graphql";

defineProps<{
    reverseSideBase: null | undefined | FragmentType<typeof BaseFragmentFragmentDoc>,
    personalizeData: PersonalizeInputData,
}>()

</script>
<style lang="scss">
.editor {
    svg {
        @apply w-full;
    }
}
</style>