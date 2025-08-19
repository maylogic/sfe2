<template>
    <div class="product-editor">
        <svg viewBox="0 0 300 200">
            <personalize-base :data="personalizeData" :line-definitions="lineDefinitions"
                              :key="personalizeData.design.id"
                              :text-lines-render-values="textLinesRenderValues"
                              v-if="personalizeData.design" :base-data="personalizeData.design.bases[0]"/>
        </svg>
    </div>
</template>
<script lang="ts" setup>

import { type ProductLineDefinition } from "~/gql/graphql";
import type { InputTextLinesMap } from "~/utils/product";

defineProps<{
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