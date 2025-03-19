<template>
    <UCard :key="product.id">
        <nuxt-link
            :to="{ name: 'product-slug', params: { slug: product.slug } }"
        >
            <img
                :src="product.primaryImage?.url"
                alt="Product Image"
                class="w-full h-48 object-cover mb-2"
            />
        </nuxt-link>
        <nuxt-link
            :to="{ name: 'product-slug', params: { slug: product.slug } }"
        >
            <h3 class="font-semibold">{{ product.name }}</h3>
        </nuxt-link>
        <p>
            {{ product.price.value.amount }}
            {{ product.price.value.currency.symbol }}
        </p>
        <p>Рейтинг: {{ product.averageRating || 'Нет отзывов' }}</p>
        <div class="flex items-center justify-between mt-4">
            <UButtonGroup size="sm">
                <UButton
                    icon="i-heroicons-minus"
                    color="gray"
                    :disabled="quantity <= 1"
                    @click="decrementQuantity"
                />
                <input
                    v-model="quantity"
                    class="w-12 text-center border rounded-md p-1"
                />
                <UButton
                    icon="i-heroicons-plus"
                    color="gray"
                    @click="incrementQuantity"
                />
            </UButtonGroup>

            <UButton
                label="Add to Cart"
                color="primary"
                size="sm"
                @click="addToCart"
            />
        </div>
    </UCard>
</template>
<script setup lang="ts">
import { type FragmentType, useFragment } from '~/gql'
import { ProductMiniFragmentDoc } from '~/gql/graphql'

const props = defineProps<{
    productData: FragmentType<typeof ProductMiniFragmentDoc>
}>()

const product = useFragment(ProductMiniFragmentDoc, props.productData)

// Локальное состояние для количества
const quantity = ref(1)

// Методы для изменения количества
const incrementQuantity = () => {
    quantity.value++
}

const decrementQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--
    }
}

// Метод для добавления товара в корзину
const addToCart = () => {
    const cartItem = {
        ...props.product,
        quantity: quantity.value,
    }

    // Здесь можно вызвать мутацию Vuex или Pinia для добавления в корзину
    console.log('Added to cart:', cartItem)
}
</script>
