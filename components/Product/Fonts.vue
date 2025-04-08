<template>
    <personalize-block :valid="valid" :index="index" label="Выберите шрифт">
        <personalize-scrollable-items :translate-step="122">
            <personalize-font-item @update:font="updateFont"
                                   :current-font="currentFont"
                                   :key="font.id"
                                   :font="font"
                                   v-for="font in data"/>
        </personalize-scrollable-items>
    </personalize-block>
</template>
<script setup lang="ts">
import type { Font } from "~/gql/graphql";

defineProps<{
    valid: boolean | null
    index: number
    currentFont: Font | null
    data: Font[]
}>()

const updateFont = (val: Font | null) => {
    emit("update:font", val)
}

const emit = defineEmits(['update:font'])
</script>