<template>
    <personalize-block :valid="valid" label="1. Выберите дизайн">
        <design-item @update:design="updateDesign"
                     :current-design="currentDesign"
                     :key="design.id"
                     :data="design"
                     v-for="design in data"/>
    </personalize-block>
</template>
<script setup lang="ts">
import type { FragmentType } from "~/gql";
import type {
    Design,
    DesignItemFragment,
    DesignItemFragmentDoc
} from "~/gql/graphql";
import PersonalizeBlock from "~/components/Product/PersonalizeBlock.vue";

defineProps<{
    currentDesign: DesignItemFragment | null
    valid: boolean | null
    data: Array<Pick<Design, 'id'> & FragmentType<typeof DesignItemFragmentDoc>>
}>()

const updateDesign = (val: DesignItemFragment) => {
    emit("update:design", val)
}

const emit = defineEmits(['update:design'])
</script>