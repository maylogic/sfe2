<template>
    <div class="order-item font-fira-sans">
        <!-- Информация о продукте -->
        <div class="product-info">
            <product-link :slug="item.product.slug">
                {{ item.product.name }}
            </product-link>
            <fragment-price :data="item.price"/>
        </div>

        <div class="info">
            <div class="buttons flex items-center gap-2">
                <a href="#" class="flex items-center gap-1" @click.prevent="showInfo = !showInfo">
                    <u-icon name="i-lucide-x" v-if="showInfo"/>
                    <u-icon name="i-lucide-list-collapse" v-if="!showInfo"/>
                    <span>{{ !showInfo ? 'Детали' : 'Скрыть' }}</span>
                </a>
            </div>
            <div class="all-info" v-if="showInfo">
                <!-- Дополнительные опции -->
                <div v-if="!!item.option_items?.length" class="option-items">
                    <div v-for="option in item.option_items" :key="option.id">
                        <span class="def">{{ option.label }}</span>
                        <fragment-price :hide-free="true" :data="option.price"/>
                    </div>
                </div>

                <!-- Размер продукта -->
                <div v-if="item.product_size" class="size">
                    <span class="def">Размер:</span>
                    <span class="val">{{ item.product_size.label }}</span>
                    <fragment-price :hide-free="true" :data="item.product_size.price"/>
                </div>

                <div v-if="item.design" class="design">
                    <span class="def">Дизайн:</span>
                    <span class="val">{{ item.design.label }}</span>
                </div>
                <div v-if="item.color" class="color">
                    <span class="def">Цвет:</span>
                    <span class="val">{{ item.color.label }}</span>
                </div>
                <div v-if="item.font" class="font">
                    <span class="def">Шрифт:</span>
                    <span class="val">{{ item.font.label }}</span>
                </div>
                <div v-if="!!item.text_lines?.length" class="text-lines">
                    <order-text-line :data="textLine"
                                    v-for="textLine in item.text_lines"
                                    :key="textLine.id"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    type FragmentType,
    useFragment
} from '~/gql'
import { OrderItemFragmentDoc } from '~/gql/graphql'
import ProductLink from '~/components/ProductLink.vue'

const props = defineProps<{
    data: FragmentType<typeof OrderItemFragmentDoc>
}>()

const showInfo = ref(false)

const item = computed(() => useFragment(OrderItemFragmentDoc, props.data))
</script>

<style lang="scss">
.order-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

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

    .product-info {
        @apply flex gap-1;
        :nth-child(2) {
            @apply ml-auto;
        }
    }

    .info {
        @apply text-sm;

        .def {
            @apply font-sans font-normal;
        }

        .val {
            @apply inline-block ml-1 font-bold;
        }

        .price-container {
            @apply inline-flex ml-1;
        }
    }
}
</style>
