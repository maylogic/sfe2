<template>
    <div class="sidebar-cart-item font-fira-sans">
        <!-- Информация о продукте -->
        <div class="product-info">
            <product-link :slug="item.product.slug">
                {{ item.product.name }}
            </product-link>
            <span class="flex items-center gap-2 text-xs font-sans cursor-pointer"
                  @click="isRemovingModalOpen = true">
                <u-icon name="i-lucide-trash"/>
                Удалить
            </span>
            <fragment-price :data="item.price"/>
            <quantity-input
                :quantity="quantity"
                :disabled="fetching"
                @update:quantity="quantity = $event"
            />
        </div>

        <div class="info">
            <div class="buttons flex items-center gap-2">
                <a href="#" class="flex items-center gap-1" @click.prevent="showInfo = !showInfo">
                    <u-icon name="i-lucide-x" v-if="showInfo"/>
                    <u-icon name="i-lucide-list-collapse" v-if="!showInfo"/>
                    <span class="-mb-0.5">{{ !showInfo ? 'Детали' : 'Скрыть' }}</span>
                </a>
                <nuxt-link :to="{ name: 'cart-edit-id', params: { id: item.id } }" class="flex items-center gap-1">
                    <u-icon name="i-lucide-pencil"/>
                    <span class="-mb-0.5">Редактировать</span>
                </nuxt-link>
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
                    <cart-text-line :data="textLine"
                                    v-for="textLine in item.text_lines"
                                    :key="textLine.id"/>
                </div>
            </div>
        </div>

        <UModal v-model="isRemovingModalOpen">
            <UCard>
                <template #header>
                    Пожалуйста, подтвердите или отмените удаление
                </template>

                <template #footer>
                    <div class="flex items-center gap-2">
                        <u-button
                            icon="i-lucide-trash"
                            label="Удалить"
                            @click="remove"
                            :disabled="fetching"
                            color="red"
                        />
                        <u-button
                            label="Отмена"
                            @click="isRemovingModalOpen = false"
                            :disabled="fetching"
                            color="gray"
                        />
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>

<script setup lang="ts">
import {
    type FragmentType,
    useFragment
} from '~/gql'
import {
    RemoveCartItemDocument,
    SidebarCartItemFragmentDoc,
    UpdateCartItemQuantityDocument
} from '~/gql/graphql'
import ProductLink from '~/components/ProductLink.vue'
import { useMutation } from "@urql/vue";
import { useCartStore } from "~/stores/cart";

const props = defineProps<{
    data: FragmentType<typeof SidebarCartItemFragmentDoc>
}>()

const showInfo = ref(false),
    isRemovingModalOpen = ref(false)

const item = computed(() => useFragment(SidebarCartItemFragmentDoc, props.data))
const quantity = ref(item.value.quantity)
const {executeMutation: removeCartItem, fetching: removing} = useMutation(RemoveCartItemDocument)
const {
    executeMutation: updateCartItemQuantity,
    fetching: updatingQuantity
} = useMutation(UpdateCartItemQuantityDocument)
const fetching = computed(() => removing.value || updatingQuantity.value)
const cart = useCartStore()
const remove = async () => {
    const {data} = await removeCartItem({cartItemId: item.value.id})
    cart.setData(data?.removeCartItem)
}
watchDebounced(
    quantity,
    async () => {
        const {data} = await updateCartItemQuantity({cartItemId: item.value.id, quantity: quantity.value})
        cart.setData(data?.updateCartItemQuantity)
    },
    {debounce: 500, maxWait: 1000},
)

</script>

<style lang="scss">
.sidebar-cart-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .product-info {
        @apply grid grid-cols-[1fr_min-content];
        gap: 0.25rem;
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
</style>
