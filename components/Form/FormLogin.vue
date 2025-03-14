<template>
    <UForm @submit="onSubmit" :schema="schema" :state="state" class="space-y-4 max-w-[320px] mx-auto">
        <UFormGroup
            label="Email"
            name="email"
        >
            <form-input-username v-model="state.email"/>
        </UFormGroup>
        <UFormGroup
            label="Пароль"
            name="password"
        >
            <form-input-password v-model="state.password" :show="show" @toggle="show = !show"/>
        </UFormGroup>
        <UButton type="submit" :disabled="fetching">
            Войти
        </UButton>
        <UProgress v-if="fetching" size="xl"/>
    </UForm>
</template>

<script setup lang="ts">
import {type InferType, object} from 'yup'
import {emailValidation, passwordValidation} from "~/yup";
import FormInputUsername from "~/components/Form/Input/FormInputUsername.vue";
import type {FormSubmitEvent} from "#ui/types";
import {useMutation} from "@urql/vue";
import {LoginCustomerDocument} from "~/gql/graphql";
import {type FieldErrors, useCombinedErrorHandler} from "~/composables/useCombinedErrorHandler";
import Cookies from "js-cookie";

const show = ref(false)

const schema = object({
    email: emailValidation,
    password: passwordValidation
})

type Schema = InferType<typeof schema>

const state = reactive({
    email: undefined,
    password: undefined
})

const {fetching, executeMutation} = useMutation(LoginCustomerDocument)
const {errors, errorHandler} = useCombinedErrorHandler<FieldErrors<typeof state>>()
watch(state, (newValue) => {
    errors.value = {}
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log(event.data)
    if (fetching.value) {
        return;
    }
    errors.value = {}
    const {data, error} = await executeMutation(event.data)
    errorHandler(error);
    if (data?.loginCustomer) {
        Cookies.set('token', data.loginCustomer)
    }
    if (!error) {
        console.log('User logged in:', data);
    }
}
</script>