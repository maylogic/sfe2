<template>
    <div v-if="cartStore.error" class="p-5">
        <span autofocus class="font-fira-sans text-red-500">
            Произошла ошибка. Пожалуйста, сообщите об этом администратору и получите извинительный промокод.
        </span>
    </div>
    <div class="empty-cart p-5" v-else-if="!cartStore.isEmpty">
        <span class="font-fira-sans text-[18px]">Ваша корзина пуста</span>
        <div autofocus @click="cartStore.open = false"
             class="rose-pseudo-button font-bebas-neue flex justify-center items-center mt-5">
            <div class="flex items-center gap-2">
                <u-icon class="text-[24px] mt-[-5px]" name="i-lucide-shopping-cart"/>
                Продолжить шоппинг
            </div>
        </div>
    </div>
    <div class="sidebar-cart p-5" :key="cart.key" v-else>
        <loading-overlay v-if="loading">
            <loading-page/>
        </loading-overlay>
        <div class="cart-items">
            <cart-sidebar-cart-item v-for="item in cart.items" :key="cart.key+item.id" :data="item"/>
        </div>

        <div class="mt-auto flex flex-col gap-2 pt-5">
            <div class="flex flex-col gap-2">
                <h3 class="font-iskra">Промокод или подарочный ваучер</h3>
                <div v-if="!!cart.coupons?.length">
                    <cart-coupon
                        :data="coupon"
                        v-for="coupon in cart.coupons"
                        :key="coupon.id"
                    />
                </div>
                <cart-coupon-input v-if="cart.can_apply_coupon"/>
            </div>

            <!-- Метод доставки -->
            <div v-if="cart.shipping_method" class="shipping-method">
                <h3>Способ доставки</h3>
                <p>{{ cart.shipping_method.name }}</p>
                <p>
                    <fragment-price :data="cart.shipping_method.price"/>
                </p>
                <p v-if="cart.shipping_method.estimated_delivery">
                    Примерная продолжительность:
                    {{ cart.shipping_method.estimated_delivery }}
                </p>
                <p v-if="cart.shipping_method.description">
                    {{ cart.shipping_method.description }}
                </p>
            </div>

            <!-- Баланс -->
            <div v-if="cart.can_apply_balance" class="apply-balance">
                <cart-apply-balance :data="cart?.apply_balance"/>
            </div>

            <cart-totals :data="cart.totals"/>
            <nuxt-link autofocus @click="cartStore.open=false" to="/checkout" class="checkout-button">
                <div>
                    <u-icon class="text-[32px] mt-[-5px]" name="i-lucide-lock"/>
                    Оформить заказ
                </div>
            </nuxt-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
await cartStore.hydrate()
const {cart, loading} = storeToRefs(cartStore)
</script>

<style scoped lang="scss">

.sidebar-cart {
    @apply grid relative;
    grid-template-rows: 1fr min-content;
    max-height: 100vh;
    max-height: 100dvh;
    overflow: hidden;
}

.checkout-button {
    @apply bg-robins-egg-blue-500 flex items-center justify-center pt-1 outline-none;

    div {
        @apply flex items-center gap-2 text-white;
        letter-spacing: 1px;
        font-family: "Bebas Neue", sans-serif;
        font-size: 32px;
    }
}

.cart-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
}

.empty-cart {
    text-align: center;
    color: #666;
}

.cart-coupons ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.shipping-method p {
    margin: 0.25rem 0;
}

.apply-balance {
    @apply mb-2;
}
</style>
