<template>
    <div class="sidebar-cart">
        <!-- Заголовок -->
        <h2 class="cart-title">
            Корзина
            <u-icon name="i-lucide-x" @click="cartStore.open = false" />
        </h2>

        <!-- Элементы корзины -->
        <div v-if="cart.items.length > 0" class="cart-items">
            <div v-for="item in cart.items" :key="item.id" class="cart-item">
                <sidebar-cart-item :data="item" />
            </div>
        </div>
        <p v-else class="empty-cart">Ваша корзина пуста.</p>

        <!-- Промокоды -->
        <div class="cart-coupons">
            <h3>Купоны</h3>
            <ul v-if="cart.coupons.length > 0">
                <li v-for="coupon in cart.coupons" :key="coupon.code">
                    {{ coupon.code }} ({{ coupon.discount_percentage }}% скидка)
                </li>
            </ul>
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
            <label>
                <input type="checkbox" v-model="applyBalance" />
                Использовать баллы
            </label>
        </div>

        <!-- Итоговые суммы -->
        <div class="cart-totals">
            <totals :data="cart.totals" />
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

const applyBalance = ref(!!cart.value?.apply_balance)
</script>

<style scoped>
.sidebar-cart {
    display: grid;
    grid-template-rows: max-content 1fr repeat(3, min-content) max-content;
    gap: 1.5rem;
    padding: 1rem;
    max-height: 100dvh;
}

.cart-title {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
}

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
