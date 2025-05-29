<template>
    <div class="order-pay-page">
        <div class="payment-container">
            платежный виджет
        </div>
        <div class="order-summary-container" v-if="order">
            <order-summary :key="order.id" :data="order.totals" label="К оплате:">
                <u-button variant="outline"
                          @click.prevent="showItemsOnMobile=!showItemsOnMobile"
                          :trailing-icon="`i-lucide-chevron-${showItemsOnMobile ? 'up' : 'down'}`">
                    {{ showItemsOnMobile ? 'Скрыть' : 'Детали' }}
                </u-button>
            </order-summary>
            <div class="order-items-container" :class="{'mob-show':showItemsOnMobile}">
                <div class="title font-fira-sans">
                    <u-icon class="text-[20px] mt-[-5px]" name="i-lucide-shopping-cart"/>
                    {{
                        order.items && order.items.length > 0
                            ? `${order.items.length} ${num_word(order.items.length, ['товар', 'товара', 'товаров'])}`
                            : 'Нет товаров'
                    }}
                </div>
                <div class="px-2">
                    <div class="order-items">
                        <order-item v-for="item in order.items" :key="order.id+item.id" :data="item"/>
                    </div>
                    <totals :key="order.id" :data="order.totals" grand-total-label="К оплате: "/>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

import { num_word } from "~/utils/misc";
import { useQuery } from "@urql/vue";
import {
    OrderByIdDocument,
    OrderDataFragmentDoc
} from "~/gql/graphql";
import { useFragment } from "~/gql";

const props = defineProps<{
    orderId: string
}>()
const {data, error, fetching} = await useQuery({
    query: OrderByIdDocument,
    variables: {id: props.orderId},
})

if (error.value) {
    console.error('GraphQL Error:', error.value)
    throw createError({
        statusCode: 500,
        statusMessage: `Произошла ошибка. Если Вы уверены, что оформили заказ, то пожалуйста, обратитесь к администратору и сообщите ему код заказа ${props.orderId}`
    })
}

if (!data.value?.getOrderById) {
    throw createError({
        statusCode: 404,
        statusMessage: `Заказ не найден. Если Вы уверены, что оформили заказ, то пожалуйста, обратитесь к администратору и сообщите ему код заказа ${props.orderId}`
    })
}

const order = computed(() => useFragment(OrderDataFragmentDoc, data.value?.getOrderById))
const showItemsOnMobile = ref(false)
</script>
<style lang="scss">
.order-pay-page {
    @apply flex flex-col-reverse gap-3 py-4;
    @apply h-full;
    @apply md:grid md:grid-cols-[1fr__min-content] md:gap-5;
    @apply px-2 max-w-[960px] mx-auto;
    @apply relative;

    .order-summary-container {
        .order-items-container {
            @apply hidden md:block;
            @apply bg-white;
            &.mob-show {
                @apply block;
            }

            @apply w-full md:w-[320px];
            .title {
                @apply py-2 px-2 bg-picton-blue-500 text-white;
                @apply flex items-center gap-2 mb-2;
            }
        }
    }

    .blocks {
        @apply flex flex-col gap-3;
    }

    .order-items {
        @apply pb-2 flex flex-col gap-4;
    }

    .order-summary {
        @apply md:hidden px-2 bg-white py-2;
    }

    .checkbox-thin {
        label {
            @apply font-normal;
        }
    }
}
</style>