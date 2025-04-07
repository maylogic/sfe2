<template>
    <personalize-block :valid="valid" :index="index" label="Выберите шрифт">
        <personalize-font-item @update:font="updateFont"
                               :current-font-id="fontId"
                               :key="font.id"
                               :font="font"
                               v-for="font in data"/>
    </personalize-block>
</template>
<script setup lang="ts">
import type { Font } from "~/gql/graphql";

defineProps<{
    valid: boolean | null
    index: number
    fontId: string | null
    data: Array<Pick<Font, 'id' | 'label' | 'preview'>>
}>()

const updateFont = (val: string) => {
    emit("update:font", val)
}

const emit = defineEmits(['update:font'])
</script>