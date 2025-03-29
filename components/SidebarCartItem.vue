<template>
    <div class="sidebar-cart-item">
        <!-- Информация о продукте -->
        <div class="product-info">
            <product-link :slug="item.product.slug">
                {{ item.product.name }}
            </product-link>
            <p>SKU: {{ item.product.sku }}</p>
            <p>Quantity: {{ item.quantity }}</p>
            <p>
                <price :data="item.product.price" />
            </p>
        </div>

        <!-- Дополнительные опции -->
        <div v-if="item.option_items.length > 0" class="option-items">
            <h4>Options</h4>
            <ul>
                <li v-for="option in item.option_items" :key="option.id">
                    {{ option.label }}:
                    <price :data="option.price" />
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
            <p>
                <price :data="item.product_size.price" />
            </p>
        </div>

        <!-- Текстовые строки -->
        <div v-if="item.text_lines.length > 0" class="text-lines">
            <h4>Custom Text</h4>
            <ul>
                <li v-for="line in item.text_lines" :key="line.id">
                    {{ line.definition.label }}: {{ line.value }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type FragmentType, useFragment } from '~/gql'
import { SidebarCartItemFragmentDoc } from '~/gql/graphql'
import ProductLink from '~/components/ProductLink.vue'

const props = defineProps<{
    data: FragmentType<typeof SidebarCartItemFragmentDoc>
}>()

const item = useFragment(SidebarCartItemFragmentDoc, props.data)
</script>

<style scoped>
.sidebar-cart-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.product-info {
    display: flex;
    flex-direction: column;
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
