<template>
    <u-form
        @submit.prevent="onSubmit"
        :schema="schema"
        :state="state"
        class="narrow-form"
    >
        <u-form-group label="Имя" name="name">
            <u-input autocomplete="name" v-model="state.name"/>
        </u-form-group>
        <u-form-group
            label="Email"
            name="email"
            :error="errors.email ? errors.email[0] : undefined"
        >
            <form-input-username v-model="state.email"/>
        </u-form-group>
        <u-form-group label="Пароль" name="password">
            <form-input-password
                autocomplete="new-password"
                v-model="state.password"
                :show="showPassword"
                @toggle="showPassword = !showPassword"
            />
        </u-form-group>
        <u-form-group label="Повторите пароль" name="passwordConfirmation">
            <form-input-password
                autocomplete="new-password"
                v-model="state.passwordConfirmation"
                :show="showPassword"
                @toggle="showPassword = !showPassword"
            />
        </u-form-group>

        <div class="flex items-center gap-2">
            <u-button type="submit" :disabled="fetching">
                Зарегистрироваться
            </u-button>
            <u-button variant="outline" to="/login">
                Вход
            </u-button>
        </div>
        <loading-page v-if="fetching"/>
    </u-form>
</template>

<script setup lang="ts">
import {
    type InferType,
    object
} from 'yup'
import {
    emailValidation,
    getConfirmPasswordValidation,
    passwordValidation,
    usernameValidation,
} from '~/yup'
import { useMutation } from '@urql/vue'
import { RegisterCustomerDocument } from '~/gql/graphql'
import type { FormSubmitEvent } from '#ui/types'
import {
    type FieldErrors,
    useCombinedErrorHandler,
} from '~/composables/useCombinedErrorHandler'

const showPassword = ref(false)
const schema = object({
    name: usernameValidation,
    email: emailValidation,
    password: passwordValidation,
    passwordConfirmation: getConfirmPasswordValidation(),
})

const {fetching, executeMutation} = useMutation(RegisterCustomerDocument)

type Schema = InferType<typeof schema>

const state = reactive({
    name: undefined,
    email: undefined,
    password: undefined,
    passwordConfirmation: undefined,
})

const {errors, errorHandler} =
    useCombinedErrorHandler<FieldErrors<typeof state>>()

watch(state, (newValue) => {
    errors.value = {}
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    if (fetching.value) {
        return
    }
    errors.value = {}
    const {data, error} = await executeMutation(event.data)
    errorHandler(error)
    if (data?.registerCustomer) {
        navigateTo('/profile')
    }
}
</script>
