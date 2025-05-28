<template>
    <u-form v-if="!valid" class="flex flex-col gap-3 mt-3" :schema="schema" :state="state" @submit.prevent="onSubmit">
        <u-form-group name="paymentMethodId" class="flex items-center gap-2 flex-wrap">
            <u-input class="hidden" name="paymentMethodId" v-model="state.paymentMethodId"/>
            <div class="payment-methods">
                <div class="payment-option" @click="state.paymentMethodId=option.id"
                     :class="{'selected': option.id === state.paymentMethodId}"
                     v-if="options.length"
                     v-for="option in options">
                    <div class="option-mark"/>
                    <span class="font-fira-sans text-xs">{{ option.label }}</span>
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
        {{ cart.payment_method?.label ?? 'Не выбран' }}
    </div>
</template>
<script setup lang="ts">
import { type InferType } from "yup";
import { paymentMethodSchema, } from "~/yup";
import {
    useMutation,
    useQuery
} from "@urql/vue";
import {
    SetPaymentMethodDocument,
    PaymentMethodsDocument
} from "~/gql/graphql";
import type { FormSubmitEvent } from "#ui/types";

defineProps<{ valid: boolean | null }>()

const emit = defineEmits(['update:valid', 'loading:update'])

const cartStore = useCartStore()
const {cart} = storeToRefs(cartStore)

const {data, error} = await useQuery({
    query: PaymentMethodsDocument,
    variables: {}
})

watch(cart, (newCart, oldCart) => {
    if (newCart.payment_method?.id != state.paymentMethodId) {
        state.paymentMethodId = newCart.payment_method?.id
    }
})

const state = reactive<{ paymentMethodId: string | undefined }>({
    paymentMethodId: cart.value.payment_method?.id
})

watch(state, (newState) => {
    if (!newState.paymentMethodId) {
        emit('update:valid', false)
    }
})

const {executeMutation, fetching} = useMutation(SetPaymentMethodDocument)
const options = computed(
    () => data.value?.paymentMethods ?? []
)

const schema = paymentMethodSchema
type Schema = InferType<typeof schema>

async function onSubmit(event: FormSubmitEvent<Schema>) {
    try {
        emit('loading:update', true)
        const {data, error} = await executeMutation(event.data)
        cartStore.setData(data?.setPaymentMethod)
        emit('update:valid', true)
    } catch (err) {
        console.log(err)
    } finally {
        emit('loading:update', false)
    }
}
</script>
<style lang="scss">
.payment-methods {
    @apply flex flex-wrap gap-2;
    .payment-option {
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