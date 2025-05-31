<template>
    <u-form
        @submit.prevent="onSubmit"
        :schema="schema"
        :state="state"
        class="narrow-form"
    >
        <u-form-group label="Email" name="email">
            <form-input-username v-model="state.email"/>
        </u-form-group>
        <u-form-group label="Номер заказа" name="orderId">
            <u-input
                :model-value="state.orderId"
                @update:modelValue="state.orderId=parseInt($event)||0"
            />
        </u-form-group>
        <div class="flex items-center gap-2" v-if="!order || order?.id != state.orderId?.toString()">
            <u-button type="submit" :disabled="fetching">
                Найти заказ
            </u-button>
        </div>
        <loading-page v-if="fetching"/>
        <u-alert
            v-if="invalidCredentials"
            title="Неправильный email или номер заказа"
            color="red"
        />
    </u-form>
</template>

<script setup lang="ts">
import {
    type InferType,
    number,
    object
} from 'yup'
import { emailValidation } from '~/yup'
import type { FormSubmitEvent } from '#ui/types'
import { useQuery } from '@urql/vue'
import {
    OrderDataFragmentDoc,
    OrderLookupDocument
} from '~/gql/graphql'
import { useFragment } from "~/gql";

const invalidCredentials = ref(false)

const schema = object({
    email: emailValidation,
    orderId: number().required('Номер заказа обязателен'),
})

type Schema = InferType<typeof schema>

const state = reactive<{ email: string | undefined, orderId: number | undefined }>({
    email: undefined,
    orderId: undefined,
})

const {executeQuery, fetching, data} = useQuery({
    query: OrderLookupDocument,
    pause: true,
    variables: state
})

const order = computed(() => useFragment(OrderDataFragmentDoc, data.value?.orderLookup))
watch(state, () => {
    invalidCredentials.value = false
})
const emit = defineEmits(['update:order'])
watch(order, (newOrder) => {
    emit('update:order', newOrder)
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    if (fetching.value) {
        return
    }
    const {error} = await executeQuery()
    if (error.value) {
        invalidCredentials.value = true
    }
}
</script>