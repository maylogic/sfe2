<template>
    <div class="personalize-item">
        <div class="rounded-2xl overflow-hidden">
            <slot/>
        </div>
    </div>
</template>
<style lang="scss">
.personalize-item {
    @apply cursor-pointer relative;

    &:before {
        @apply border-viking-500 border-[.125rem] rounded-2xl;
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