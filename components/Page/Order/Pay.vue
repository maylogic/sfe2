<template>
    <div class="order-pay-page">
        <div class="relative">
            <div id="payment-container" ref="paymentContainer"/>
            <loading-overlay v-if="loadingPaymentIntegration">
                <loading-page label="Загрузка платежной интеграции"/>
            </loading-overlay>
            <div class="error-message" v-if="errorLoadingPaymentIntegration">
                При загрузке платежной интеграции произошла ошибка.<br/>
                Пожалуйста, обратитесь в службу поддержки клиентов и получите скидку на этот заказ.<br/>
                Сообщите код заказа #{{ orderId }}
            </div>
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
        statusMessage: `Произошла ошибка. Пожалуйста, обратитесь в службу поддержки клиентов и сообщите код заказа #${props.orderId}`
    })
}

if (!data.value?.getOrderById) {
    throw createError({
        statusCode: 404,
        statusMessage: `Заказ не найден. Пожалуйста, обратитесь в службу поддержки клиентов и сообщите код заказа #${props.orderId}`
    })
}

const order = computed(() => useFragment(OrderDataFragmentDoc, data.value?.getOrderById))
const showItemsOnMobile = ref(false)
const loadingPaymentIntegration = ref(true),
    errorLoadingPaymentIntegration = ref(false)
const paymentContainer = ref<HTMLDivElement>()

onMounted(() => {
    const initConfig = {
        terminalKey: 'myTerminalKey',
        product: 'eacq',
        features: {
            payment: {
                container: paymentContainer.value,
                paymentStartCallback: async () => {
                    // @ts-ignore
                    return 'res.PaymentURL';
                    // сделать graphql запрос за ссылкой для интеграции
                },
            },
        }
    }
    const script = document.createElement('script')
    script.src = 'https://acq-paymentform-integrationjs.t-static.ru/integration.js '
    script.async = true
    script.onload = async () => {
        try {
            // @ts-ignore
            const integration = await PaymentIntegration.init(initConfig);
        } catch {
            errorLoadingPaymentIntegration.value = true
        } finally {
            loadingPaymentIntegration.value = false
        }
    }

    if (import.meta.client) {
        document.body.appendChild(script)
    }
})

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