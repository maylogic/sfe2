<template>
    <personalize-block :index="index" :valid="valid" label="Выберите дизайн" :translate-step="80">
        <personalize-design-item @update:design="updateDesign"
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

defineProps<{
    index: number
    currentDesign: DesignItemFragment | null
    valid: boolean | null
    data: Array<Pick<Design, 'id'> & FragmentType<typeof DesignItemFragmentDoc>>
}>()

const updateDesign = (val: DesignItemFragment) => {
    emit("update:design", val)
}

const emit = defineEmits(['update:design'])
</script>