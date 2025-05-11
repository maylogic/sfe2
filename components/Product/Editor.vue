<template>
    <div class="product-editor">
        <svg viewBox="0 0 300 200">
            <personalize-base :data="personalizeData" :line-definitions="lineDefinitions" transform="translate(20, 40)"
                              v-if="reverseSideBase"
                              :text-lines-render-values="textLinesRenderValues"
                              :base-data="reverseSideBase"/>
            <personalize-base :data="personalizeData" :line-definitions="lineDefinitions" transform="translate(160, 40)"
                              :key="personalizeData.design.id"
                              :text-lines-render-values="textLinesRenderValues"
                              v-if="personalizeData.design" :base-data="personalizeData.design.bases[0]"/>
        </svg>
    </div>
</template>
<script lang="ts" setup>

import type { FragmentType } from "~/gql";
import {
    BaseFragmentFragmentDoc,
    type ProductLineDefinition
} from "~/gql/graphql";
import type { InputTextLinesMap } from "~/utils/product";

defineProps<{
    reverseSideBase: null | undefined | FragmentType<typeof BaseFragmentFragmentDoc>,
    personalizeData: PersonalizeInputData,
    lineDefinitions: ProductLineDefinition[],
    textLinesRenderValues: InputTextLinesMap
}>()

</script>
<style lang="scss">
.product-editor {
    svg {
        @apply w-full;
    }
}
</style>