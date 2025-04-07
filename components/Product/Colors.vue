<template>
    <personalize-block :valid="valid" :index="index" label="Выберите цвет">
        <personalize-scrollable-items :translate-step="112">
            <personalize-color-item @update:color="updateColor"
                                    :current-color-id="colorId"
                                    :key="color.id"
                                    :color="color"
                                    v-for="color in data"/>
        </personalize-scrollable-items>
    </personalize-block>
</template>
<script setup lang="ts">
import type { Color } from "~/gql/graphql";

defineProps<{
    valid: boolean | null
    index: number
    colorId: string | null
    data: Array<Pick<Color, 'id' | 'label' | 'hex'>>
}>()

const updateColor = (val: string) => {
    emit("update:color", val)
}

const emit = defineEmits(['update:color'])
</script>