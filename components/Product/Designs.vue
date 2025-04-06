<template>
    <div class="product-design personalize-block">
        <h3 class="font-fira-sans">1. Выберите дизайн</h3>
        <div class="designs">
            <design-item @update:design="updateDesign"
                         :design-id="designId"
                         :key="design.id"
                         :data="design"
                         v-for="design in data"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { FragmentType } from "~/gql";
import type {
    Design,
    DesignItemFragmentDoc
} from "~/gql/graphql";

defineProps<{
    designId: string | null
    data: Array<Pick<Design, 'id'> & FragmentType<typeof DesignItemFragmentDoc>>
}>()

const updateDesign = (val: string) => {
    emit("update:design", val)
}

const emit = defineEmits(['update:design'])
</script>
<style lang="scss">
.product-design {
    .designs {
        @apply flex items-center gap-2;
    }
}
</style>