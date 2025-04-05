<template>
    <UForm
        @submit.prevent="onSubmit"
        :schema="schema"
        :state="state"
        class="space-y-4 max-w-[320px] mx-auto"
    >
        <UFormGroup label="Email" name="email">
            <form-input-username v-model="state.email"/>
        </UFormGroup>
        <UFormGroup label="Пароль" name="password">
            <form-input-password
                v-model="state.password"
                :show="show"
                @toggle="show = !show"
            />
        </UFormGroup>
        <div class="flex items-center gap-2">
            <UButton type="submit" :disabled="fetching">
                Войти
            </UButton>

            <u-button variant="outline" to="/register">
                Регистрация
            </u-button>
        </div>
        <UProgress v-if="fetching" size="xl"/>
        <u-alert
            v-if="invalidCredentials"
            title="Неправильные логин или пароль"
            color="red"
        />
    </UForm>
</template>

<script setup lang="ts">
import {
    type InferType,
    object
} from 'yup'
import {
    emailValidation,
    passwordValidation
} from '~/yup'
import FormInputUsername from '~/components/Form/Input/FormInputUsername.vue'
import type { FormSubmitEvent } from '#ui/types'
import { useMutation } from '@urql/vue'
import {
    CustomerDataFragmentDoc,
    LoginCustomerDocument
} from '~/gql/graphql'
import { useAuthStore } from '~/stores/auth'
import { useFragment } from "~/gql";

const show = ref(false),
    invalidCredentials = ref(false)

const schema = object({
    email: emailValidation,
    password: passwordValidation,
})

type Schema = InferType<typeof schema>

const state = reactive({
    email: undefined,
    password: undefined,
})

const {fetching, executeMutation} = useMutation(LoginCustomerDocument)
watch(state, (newValue) => {
    invalidCredentials.value = false
})

const auth = useAuthStore(),
    router = useRouter()

async function onSubmit(event: FormSubmitEvent<Schema>) {
    if (fetching.value) {
        return
    }
    const {data, error} = await executeMutation(event.data)
    if (data?.loginCustomer) {
        auth.setAuthData(useFragment(CustomerDataFragmentDoc, data.loginCustomer))
        await router.push('/profile')
        return
    }
    if (error) {
        invalidCredentials.value = true
    }
}
</script>
