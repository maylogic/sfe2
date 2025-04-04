<template>
    <div class="sidebar-cart-item font-fira-sans">
        <!-- Информация о продукте -->
        <div class="product-info">
            <product-link :slug="item.product.slug">
                {{ item.product.name }}
            </product-link>
            <u-button
                icon="i-lucide-trash"
                @click="remove"
                :disabled="fetching"
                color="red"
                size="xs"
                class="px-1.5 ml-auto"
            />
            <price :data="item.product.price"/>
        </div>

        <quantity-input
            :quantity="quantity"
            @update:quantity="quantity = $event"
        />

        <!-- Дополнительные опции -->
        <div v-if="!!item.option_items?.length" class="option-items">
            <h4>Options</h4>
            <ul>
                <li v-for="option in item.option_items" :key="option.id">
                    {{ option.label }}:
                    <price :data="option.price"/>
                </li>
            </ul>
        </div>

        <!-- Размер продукта -->
        <div v-if="item.product_size" class="product-size">
            <h4>Size</h4>
            <p>{{ item.product_size.label }}</p>
            <p>
                Dimensions: {{ item.product_size.width }}x{{
                    item.product_size.height
                }}x{{ item.product_size.thickness }}
            </p>
            <price :data="item.product_size.price"/>
        </div>

        <div v-if="!!item.text_lines?.length" class="text-lines">
            <cart-text-line :data="item" v-for="item in item.text_lines" :key="item.id"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    type FragmentType,
    useFragment
} from '~/gql'
import {
    RemoveCartItemDocument,
    SidebarCartFragmentDoc,
    SidebarCartItemFragmentDoc
} from '~/gql/graphql'
import ProductLink from '~/components/ProductLink.vue'
import { useMutation } from "@urql/vue";
import { useCartStore } from "~/stores/cart";

const props = defineProps<{
    data: FragmentType<typeof SidebarCartItemFragmentDoc>
}>()

const item = computed(() => useFragment(SidebarCartItemFragmentDoc, props.data))
const quantity = ref(item.value.quantity)
const {executeMutation, fetching} = useMutation(RemoveCartItemDocument)
const cart = useCartStore()
const remove = async () => {
    const {data} = await executeMutation({cartItemId: item.value.id})
    if (data?.removeCartItem) {
        cart.setData(useFragment(SidebarCartFragmentDoc, data?.removeCartItem))
    }
}
</script>

<style scoped>
.sidebar-cart-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.product-info {
    @apply grid-cols-2;
    display: grid;
    gap: 0.25rem;
}

.product-name {
    font-weight: bold;
    color: #333;
    text-decoration: none;
}

.option-items ul,
.text-lines ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.product-size {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}
</style>
