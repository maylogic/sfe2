<template>
    <div class="personalize-items-scrollable" :class="{'scrollable': scrollable}">
        <u-icon
            class="prev-items"
            name="i-lucide-chevron-left"
            @click="prev"
        />
        <div class="scrollable-content">
            <div class="personalize-items" ref="items" :style="`transform: translateX(${-1*translateX}px)`">
                <slot/>
            </div>
        </div>
        <u-icon
            class="next-items"
            name="i-lucide-chevron-right"
            @click="next"
        />
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    translateStep: number
}>()
const translateX = ref(0)
const itemsRef = useTemplateRef('items')
const next = () => {
    const newVal = translateX.value + props.translateStep
    const maxTranslate = (itemsRef.value?.scrollWidth ?? 0) - (itemsRef.value?.clientWidth ?? 0)
    translateX.value = translateX.value === maxTranslate ? 0 : Math.min(maxTranslate, newVal)
}
const prev = () => {
    const maxTranslate = (itemsRef.value?.scrollWidth ?? 0) - (itemsRef.value?.clientWidth ?? 0)
    translateX.value = translateX.value === 0 ? maxTranslate : Math.max(0, translateX.value - props.translateStep)
}
const scrollable = ref(false)
onMounted(() => {
    scrollable.value = (itemsRef.value?.scrollWidth ?? 0) - (itemsRef.value?.clientWidth ?? 0) > 0
})
onUpdated(() => {
    scrollable.value = (itemsRef.value?.scrollWidth ?? 0) - (itemsRef.value?.clientWidth ?? 0) > 0
})
</script>
<style lang="scss">
.personalize-items-scrollable {
    @apply grid grid-cols-[max-content__1fr__max-content] items-center;
    .next-items, .prev-items {
        @apply cursor-pointer font-light w-1 h-1 pointer-events-none invisible;
    }

    &.scrollable {
        .next-items, .prev-items {
            @apply md:pointer-events-auto md:visible md:w-8 md:h-8;
        }
    }

    .personalize-items {
        @apply grid grid-flow-col auto-cols-max gap-2 p-2 transition-transform duration-200;
        grid-template-rows: repeat(2, min-content);
    }

    .scrollable-content {
        @apply overflow-y-hidden overflow-x-auto md:overflow-hidden;
    }
}
</style>