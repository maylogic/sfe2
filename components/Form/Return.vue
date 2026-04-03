<template>
    <form-order-lookup @update:order="order=$event"/>
    <div class="order-found" v-if="order?.id" :key="order.id">
        <div class="title">Заказ найден</div>

        <order-item v-for="item in order.items" :key="order.id+item.id" :data="item"/>
    </div>
</template>

<script setup lang="ts">
import type { OrderDataFragment } from "~/gql/graphql";

const order = ref<OrderDataFragment | undefined | null>()
</script>
<style lang="scss">
.order-found {
    @apply max-w-[320px] mx-auto mt-2 bg-white dark:bg-black p-2 flex flex-col gap-2;
    .title {
        @apply bg-picton-blue-500 text-white w-full p-2;
    }
}
</style>
