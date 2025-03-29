<template>
    <div class="sidebar-cart">
        <!-- Заголовок -->
        <h2 class="cart-title">Your Cart</h2>

        <!-- Элементы корзины -->
        <div v-if="cart.items.length > 0" class="cart-items">
            <div v-for="item in cart.items" :key="item.id" class="cart-item">
                <sidebar-cart-item :data="item" />
            </div>
        </div>
        <p v-else class="empty-cart">Your cart is empty.</p>

        <!-- Промокоды -->
        <div v-if="cart.coupons.length > 0" class="cart-coupons">
            <h3>Coupons Applied</h3>
            <ul>
                <li v-for="coupon in cart.coupons" :key="coupon.code">
                    {{ coupon.code }} ({{ coupon.discount_percentage }}% off)
                </li>
            </ul>
        </div>

        <!-- Метод доставки -->
        <div v-if="cart.shipping_method" class="shipping-method">
            <h3>Shipping Method</h3>
            <p>{{ cart.shipping_method.name }}</p>
            <p>
                <price :data="cart.shipping_method.price" />
            </p>
            <p v-if="cart.shipping_method.estimated_delivery">
                Estimated Delivery:
                {{ cart.shipping_method.estimated_delivery }}
            </p>
            <p v-if="cart.shipping_method.description">
                {{ cart.shipping_method.description }}
            </p>
        </div>

        <!-- Итоговые суммы -->
        <div class="cart-totals">
            <h3>Totals</h3>
            <p>
                Subtotal:
                <price :data="{ regular: cart.totals.subtotal }" />
            </p>
            <p>
                Grand Total:
                <price :data="cart.totals.grand_total" />
            </p>
            <p v-if="cart.totals.points_used">
                Points Used: {{ cart.totals.points_used }}
            </p>
        </div>

        <!-- Баланс -->
        <div v-if="cart.can_apply_balance" class="apply-balance">
            <label>
                <input type="checkbox" v-model="applyBalance" />
                Apply Balance
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SidebarCartItem from '~/components/SidebarCartItem.vue'
import { useCartStore } from '~/stores/cart'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { cart } = storeToRefs(cartStore)
console.log(cart)

const applyBalance = ref(cart.apply_balance)
</script>

<style scoped>
.sidebar-cart {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
}

.cart-title {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
}

.cart-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
