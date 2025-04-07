<template>
    <div class="personalize-block" :class="{'valid': valid === true, 'invalid': valid === false}">
        <h3 class="font-iskra">{{ index }}. {{ label }}</h3>
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
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    index: number
    label: string
    valid: boolean | null
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
.personalize-block {
    @apply md:w-[320px] lg:w-[425px] xl:w-[640px] select-none;
    @apply p-[6px] pr-0 bg-white border-l-storm-dust-100 border-l-[6px];
    .personalize-items-scrollable {
        @apply grid grid-cols-[max-content__1fr__max-content] items-center;
        .next-items, .prev-items {
            @apply cursor-pointer font-light w-8 h-8 pointer-events-none invisible;
        }

        &.scrollable {
            .next-items, .prev-items {
                @apply pointer-events-auto visible;
            }
        }
    }

    .personalize-items {
        @apply grid grid-flow-col auto-cols-max gap-2 p-2 transition-transform duration-200;
        grid-template-rows: repeat(2, min-content);
    }

    .scrollable-content {
        @apply overflow-hidden;
    }

    h3 {
        @apply pb-2 pt-0 indent-3 text-lg;
    }

    &.valid {
        @apply border-l-viking-300;
    }

    &.invalid {
        @apply border-red-500 border-t-2 border-b-2 border-r-2 p-[4px] pr-0 pl-[6px];
    }
}
</style>