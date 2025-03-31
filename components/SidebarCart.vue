<template>
    <div class="sidebar-cart">
        <!-- Элементы корзины -->
        <div v-if="cart.items.length > 0" class="cart-items">
            <div v-for="item in cart.items" :key="item.id" class="cart-item">
                <sidebar-cart-item :data="item" />
            </div>
        </div>
        <p v-else class="empty-cart">Пусто.</p>

        <!-- Промокоды -->
        <div class="cart-coupons">
            <h3>Купоны</h3>
            <div v-if="cart.coupons.length > 0">
                <cart-coupon
                    :data="coupon"
                    v-for="coupon in cart.coupons"
                    :key="coupon.id"
                />
            </div>
            <coupon-input />
        </div>

        <!-- Метод доставки -->
        <div v-if="cart.shipping_method" class="shipping-method">
            <h3>Способ доставки</h3>
            <p>{{ cart.shipping_method.name }}</p>
            <p>
                <price :data="cart.shipping_method.price" />
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
            <cart-apply-balance :data="cart?.apply_balance" />
        </div>

        <!-- Итоговые суммы -->
        <div class="cart-totals">
            <totals :data="cart.totals" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SidebarCartItem from '~/components/SidebarCartItem.vue'
import { useCartStore } from '~/stores/cart'
import CartCoupon from '~/components/CartCoupon.vue'

const cartStore = useCartStore()
const cart = computed(() => cartStore.cart)
</script>

<style scoped>
.cart-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: scroll;
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

.cart-totals {
    border-top: 1px solid #e0e0e0;
    padding-top: 1rem;
}

.apply-balance {
    margin-top: 1rem;
}
</style>
