<template>
    <div class="checkout">
        <div class="blocks">
            <checkout-block label="1. E-Mail"
                            :loading="blockLoading.email"
                            :editable="editable.email"
                            :valid="valid.email"
                            valid-action-label="Авторизован"
                            @update:valid="valid.email=$event">
                <checkout-block-email @update:valid="valid.email=$event"
                                      @loading:update="blockLoading.email=$event"
                                      :valid="valid.email"/>
            </checkout-block>
            <checkout-block :bordered="false" :valid="null">
                <checkout-block-coupon :cart="cart"/>
                <div v-if="cart.can_apply_balance" class="mb-2">
                    <cart-apply-balance :data="cart?.apply_balance"/>
                </div>
            </checkout-block>
            <div class="checkout-button" :class="{'disabled': !cart.can_place_order}"
                 @click="placeOrder">
                <div>
                    <u-icon class="text-xl" name="i-bxs-lock"/>
                    Оформить заказ
                </div>
            </div>
        </div>
        <div class="order-summary-container">
            <order-summary :key="cart.key" :data="cart.totals">
                <u-button variant="outline"
                          @click.prevent="showItemsOnMobile=!showItemsOnMobile"
                          :trailing-icon="`i-lucide-chevron-${showItemsOnMobile ? 'up' : 'down'}`">
                    {{ showItemsOnMobile ? 'Скрыть' : 'Детали' }}
                </u-button>
            </order-summary>
            <div class="cart-items-container" :class="{'mob-show':showItemsOnMobile}">
                <div class="title font-fira-sans">
                    <u-icon class="text-[20px] mt-[-5px]" name="i-lucide-shopping-cart"/>
                    {{
                        cart.items && cart.items.length > 0
                            ? `${cart.items.length} ${num_word(cart.items.length, ['товар', 'товара', 'товаров'])}`
                            : 'Нет товаров'
                    }}
                </div>
                <div class="px-2">
                    <div class="cart-items">
                        <cart-sidebar-cart-item v-for="item in cart.items" :key="cart.key+item.id" :data="item"/>
                    </div>
                    <cart-totals :key="cart.key" :data="cart.totals"/>
                </div>
            </div>
        </div>
        <loading-overlay v-if="loading">
            <loading-page/>
        </loading-overlay>
        <loading-overlay v-if="fetching">
            <loading-page label="Оформление заказа..."/>
        </loading-overlay>
        <loading-overlay v-if="!cart.items?.length">
            <loading-page label="Нет товаров, возвращаем на главную страницу..."/>
        </loading-overlay>
    </div>
</template>
<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
import { num_word } from "~/utils/misc";
import { useMutation } from "@urql/vue";
import { PlaceOrderDocument } from "~/gql/graphql";

const authStore = useAuthStore()
await authStore.hydrate()
const {user} = storeToRefs(authStore)

watch(user, (newUser, prevUser) => {
    if (newUser) {
        valid.email = true
        editable.email = false
    } else {
        valid.email = null
        editable.email = true
    }
})

const valid = reactive<{
    email: null | boolean
}>({
    email: user.value ? true : null
})
const editable = reactive<{
    email: boolean
}>({
    email: !user.value
})
const blockLoading = reactive<{
    email: boolean
}>({
    email: false
})
const showItemsOnMobile = ref(false)
const cartStore = useCartStore()
await cartStore.hydrate()
const {cart, loading} = storeToRefs(cartStore)
const {executeMutation, fetching} = useMutation(PlaceOrderDocument)

async function placeOrder() {
    const {data} = await executeMutation({})
    console.log(data)
}

watch(cart, async (value) => {
    if (value.items && value.items.length === 0) {
        await navigateTo('/')
    }
}, {
    immediate: true
})
</script>
<style lang="scss">
.checkout {
    @apply flex flex-col-reverse gap-3 pt-4;
    @apply h-full;
    @apply md:grid md:grid-cols-[1fr__min-content] md:gap-5;
    @apply px-2 max-w-[960px] mx-auto;
    @apply relative;

    .order-summary-container {
        .cart-items-container {
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

    .cart-items {
        @apply pb-2 flex flex-col gap-4;
    }

    .order-summary {
        @apply md:hidden px-2 bg-white py-2;
    }
}
</style>