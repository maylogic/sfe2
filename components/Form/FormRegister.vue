<template>
    <UForm @submit="onSubmit" :schema="schema" :state="state" class="space-y-4 max-w-[320px] mx-auto">
        <div class="flex justify-between gap-10">
            <UFormGroup
                label="Имя"
                name="firstName"
            >
                <UInput autocomplete="first_name"
                        v-model="state.firstName"/>
            </UFormGroup>
            <UFormGroup
                label="Фамилия"
                name="lastName"
            >
                <UInput autocomplete="last_name"
                        v-model="state.lastName"/>
            </UFormGroup>
        </div>
        <UFormGroup
            label="Email"
            name="email"
            :error="errors.email ? errors.email[0] : undefined"
        >
            <form-input-username v-model="state.email"/>
        </UFormGroup>
        <UFormGroup
            label="Пароль"
            name="password"
        >
            <form-input-password autocomplete="new-password" v-model="state.password" :show="showPassword"
                                 @toggle="showPassword = !showPassword"/>
        </UFormGroup>
        <UFormGroup
            label="Повторите пароль"
            name="passwordConfirmation"
        >
            <form-input-password autocomplete="new-password" v-model="state.passwordConfirmation" :show="showPassword"
                                 @toggle="showPassword = !showPassword"/>
        </UFormGroup>
        <UButton type="submit" :disabled="fetching">
            Войти
        </UButton>
        <UProgress v-if="fetching" size="xl"/>
    </UForm>
</template>

<script setup lang="ts">
import {type InferType, object} from 'yup'
import {
    emailValidation,
    firstNameValidation,
    getConfirmPasswordValidation,
    lastNameValidation,
    passwordValidation
} from "~/yup";
import {useMutation} from "@urql/vue";
import {RegisterCustomerDocument} from "~/gql/graphql";
import type {FormSubmitEvent} from "#ui/types";
import {type FieldErrors, useCombinedErrorHandler} from "~/composables/useCombinedErrorHandler";

const showPassword = ref(false)
const schema = object({
    firstName: firstNameValidation,
    lastName: lastNameValidation,
    email: emailValidation,
    password: passwordValidation,
    passwordConfirmation: getConfirmPasswordValidation()
})

const {fetching, executeMutation} = useMutation(RegisterCustomerDocument)

type Schema = InferType<typeof schema>

const state = reactive({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
    passwordConfirmation: undefined,
});

const {errors, errorHandler} = useCombinedErrorHandler<FieldErrors<typeof state>>()
watch(state, (newValue) => {
    errors.value = {}
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    if (fetching.value) {
        return;
    }
    errors.value = {}
    const {data, error} = await executeMutation(event.data)
    errorHandler(error);
    if (!error) {
        console.log('User registered:', data?.registerCustomer);
    }
}
</script>