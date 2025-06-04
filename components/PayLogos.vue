<template>
    <div class="pay-logos w-[250px]">
        <loadable-image class="tbank" src="/pay/tbank.svg" alt="Т-Банк">
            <div class="image-placeholder w-[40.75px]"></div>
        </loadable-image>
        <loadable-image class="dolyami" src="/pay/dolyami.svg" alt="Долями">
            <div class="image-placeholder w-[84px]"></div>
        </loadable-image>
        <loadable-image class="sbp" src="/pay/sbp.svg" alt="Система быстрых платежей">
            <div class="image-placeholder w-[31.86px]"></div>
        </loadable-image>
        <loadable-image class="sberpay" src="/pay/sberpay.svg" alt="SberPay">
            <div class="image-placeholder w-[31.94px]"></div>
        </loadable-image>
        <loadable-image class="visa" src="/pay/visa.svg" alt="Visa">
            <div class="image-placeholder w-[36.75px]"></div>
        </loadable-image>
        <loadable-image class="mastercard" src="/pay/mastercard.svg" alt="MasterCard">
            <div class="image-placeholder w-[19.34px]"></div>
        </loadable-image>
        <loadable-image class="mir" src="/pay/mir.svg" alt="Мир">
            <div class="image-placeholder w-[39.25px]"></div>
        </loadable-image>
    </div>
</template>
<style lang="scss">
.pay-logos {
    @apply flex flex-wrap gap-4 items-center justify-center;
    .loadable-image {
        @apply h-4 w-auto;
        img {
            @apply h-4 opacity-60 hover:opacity-100 grayscale;
        }
        &.visa, &.mastercard, &.mir {
            @apply h-3;
            img {
                @apply h-3;
            }
        }
        .image-placeholder {
            @apply rounded-sm h-full;
        }
    }
}
</style>
<script setup lang="ts">
</script>