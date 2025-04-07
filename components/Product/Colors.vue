<template>
    <personalize-block label="1. Выберите дизайн">
        <design-item @update:design="updateDesign"
                     :design-id="designId"
                     :key="design.id"
                     :data="design"
                     v-for="design in data"/>
    </personalize-block>
</template>
<script setup lang="ts">
import type { FragmentType } from "~/gql";
import type {
    Design,
    DesignItemFragmentDoc
} from "~/gql/graphql";
import PersonalizeBlock from "~/components/Product/PersonalizeBlock.vue";

defineProps<{
    designId: string | null
    data: Array<Pick<Design, 'id'> & FragmentType<typeof DesignItemFragmentDoc>>
}>()

const updateDesign = (val: string) => {
    emit("update:design", val)
}

const emit = defineEmits(['update:design'])
</script>