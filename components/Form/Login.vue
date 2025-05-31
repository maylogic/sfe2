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
        <u-form-group label="Пароль" name="password">
            <form-input-password
                v-model="state.password"
                :show="show"
                @toggle="show = !show"
            />
        </u-form-group>
        <div class="flex items-center gap-2">
            <u-button type="submit" :disabled="fetching">
                Войти
            </u-button>

            <u-button variant="outline" to="/register">
                Регистрация
            </u-button>
        </div>
        <loading-page v-if="fetching"/>
        <u-alert
            v-if="invalidCredentials"
            title="Неправильные логин или пароль"
            color="red"
        />
    </u-form>
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
import type { FormSubmitEvent } from '#ui/types'
import { useMutation } from '@urql/vue'
import { LoginCustomerDocument } from '~/gql/graphql'
import { useAuthStore } from '~/stores/auth'

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
        auth.setData(data.loginCustomer)
        await router.push('/profile')
        return
    }
    if (error) {
        invalidCredentials.value = true
    }
}
</script>
