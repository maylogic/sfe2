<template>
    <div class="personalize-item min-w-max w-max" :class="{'selected': selected}">
        <div class="rounded-2xl overflow-hidden min-w-max w-max">
            <slot/>
        </div>
    </div>
</template>
<script lang="ts" setup>
defineProps<{ selected: boolean }>()
</script>
<style lang="scss">
.personalize-item {
    @apply cursor-pointer relative;

    &:before {
        @apply border-viking-500 border-[.125rem] rounded-[1.2rem];
        content: "";
        position: absolute;
        left: -.3125rem;
        right: -.3125rem;
        bottom: -.3125rem;
        top: -.3125rem;
        opacity: 0;
        transition: opacity .15s;
    }

    &.selected {
        &:before {
            opacity: 1;
        }
    }
}
</style>