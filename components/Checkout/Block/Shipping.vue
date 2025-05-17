<template>
    <u-form v-if="!valid" class="flex flex-col gap-3 mt-3" :schema="schema" :state="state" @submit="onSubmit">
        <u-form-group name="shippingMethodId" class="flex items-center gap-2 flex-wrap">
            <u-input class="hidden" name="shippingMethodId" v-model="state.shippingMethodId"/>
            <div class="shipping-methods">
                <div class="shipping-option" @click="state.shippingMethodId=option.id"
                     :class="{'selected': option.id === state.shippingMethodId}"
                     v-if="options.length"
                     v-for="option in options">
                    <div class="option-mark"/>
                    <span class="font-fira-sans text-xs">{{ option.label }} - {{
                            formatPrice(option.info.price)
                        }}</span>
                </div>
                <div v-else>
                    Что-то пошло не так. Нет подходящих способов доставки.<br/>
                    Обратитесь к администратору и получите промокод на скидку.<br/>
                    Приложите скриншот.
                </div>
            </div>
        </u-form-group>
        <button type="submit" class="continue-button">
            <span>Продолжить</span>
        </button>
    </u-form>
    <div v-else class="current-value">
        {{ cart.shipping_method?.label ?? 'Не выбран' }}
    </div>
</template>
<script setup lang="ts">
import { type InferType } from "yup";
import { shippingMethodSchema, } from "~/yup";
import {
    useMutation,
    useQuery
} from "@urql/vue";
import {
    SetShippingMethodDocument,
    ShippingMethodsDocument
} from "~/gql/graphql";
import type { FormSubmitEvent } from "#ui/types";

defineProps<{ valid: boolean | null }>()

const emit = defineEmits(['update:valid', 'loading:update'])

const cartStore = useCartStore()
const {cart} = storeToRefs(cartStore)

const {data, error} = await useQuery({
    query: ShippingMethodsDocument,
    variables: {}
})

watch(cart, (newCart, oldCart) => {
    if (newCart.shipping_method?.id != state.shippingMethodId) {
        state.shippingMethodId = newCart.shipping_method?.id
    }
})

const state = reactive<{ shippingMethodId: string | undefined }>({
    shippingMethodId: cart.value.shipping_method?.id
})

watch(state, (newState) => {
    if (!newState.shippingMethodId) {
        emit('update:valid', false)
    }
})

const {executeMutation, fetching} = useMutation(SetShippingMethodDocument)
const options = computed(
    () => data.value?.shippingMethods ?? []
)

const schema = shippingMethodSchema
type Schema = InferType<typeof schema>

async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        emit('loading:update', true)
        const {data, error} = await executeMutation(event.data)
        cartStore.setData(data?.setShippingMethod)
        emit('update:valid', true)
    } catch (err) {
        console.log(err)
    } finally {
        emit('loading:update', false)
    }
}
</script>
<style lang="scss">
.shipping-methods {
    @apply flex flex-wrap gap-2;
    .shipping-option {
        @apply flex items-center gap-2 border-[1px] border-l-[4px] border-storm-dust-200 px-2 h-12 cursor-pointer;
        .option-mark {
            @apply rounded-full w-6 h-6 relative border-[1px] border-storm-dust-200;
        }

        &.selected {
            @apply border-picton-blue-500;
            .option-mark {
                &:after {
                    @apply w-4 h-4 rounded-full bg-picton-blue-500 block;
                    @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2;
                    content: '';
                }
            }
        }
    }
}
</style>