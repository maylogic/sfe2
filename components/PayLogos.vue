<template>
    <div class="pay-logos max-w-[320px]">
        <loadable-image src="/pay/tbank.svg" alt="Т-Банк"/>
        <loadable-image src="/pay/dolyami.svg" alt="Долями"/>
        <loadable-image src="/pay/sbp.svg" alt="Система быстрых платежей"/>
        <loadable-image src="/pay/sberpay.svg" alt="SberPay"/>
        <loadable-image src="/pay/visa.svg" alt="Visa"/>
        <loadable-image src="/pay/mastercard.svg" alt="MasterCard"/>
        <loadable-image src="/pay/mir.svg" alt="Мир"/>
    </div>
</template>
<style lang="scss">
.pay-logos {
    @apply flex flex-wrap gap-2 items-center justify-center;
    .loadable-image {
        @apply h-6 w-auto;
        img {
            @apply h-6;
        }
    }
}
</style>
<script setup lang="ts">
</script>