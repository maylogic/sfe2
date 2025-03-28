<template>
    <UForm
        @submit="onSubmit"
        :schema="schema"
        :state="state"
        class="space-y-4 max-w-[320px] mx-auto"
    >
        <UFormGroup label="Имя" name="name">
            <UInput autocomplete="name" v-model="state.name" />
        </UFormGroup>
        <UFormGroup
            label="Email"
            name="email"
            :error="errors.email ? errors.email[0] : undefined"
        >
            <form-input-username v-model="state.email" />
        </UFormGroup>
        <UFormGroup label="Пароль" name="password">
            <form-input-password
                autocomplete="new-password"
                v-model="state.password"
                :show="showPassword"
                @toggle="showPassword = !showPassword"
            />
        </UFormGroup>
        <UFormGroup label="Повторите пароль" name="passwordConfirmation">
            <form-input-password
                autocomplete="new-password"
                v-model="state.passwordConfirmation"
                :show="showPassword"
                @toggle="showPassword = !showPassword"
            />
        </UFormGroup>
        <UButton type="submit" :disabled="fetching">
            Зарегистрироваться
        </UButton>
        <UProgress v-if="fetching" size="xl" />
    </UForm>
</template>

<script setup lang="ts">
import { type InferType, object } from 'yup'
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

const { fetching, executeMutation } = useMutation(RegisterCustomerDocument)

type Schema = InferType<typeof schema>

const state = reactive({
    name: undefined,
    email: undefined,
    password: undefined,
    passwordConfirmation: undefined,
})

const { errors, errorHandler } =
    useCombinedErrorHandler<FieldErrors<typeof state>>()

watch(state, (newValue) => {
    errors.value = {}
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    if (fetching.value) {
        return
    }
    errors.value = {}
    const { data, error } = await executeMutation(event.data)
    errorHandler(error)
    if (!error) {
        console.log('User registered:', data?.registerCustomer)
    }
}
</script>
