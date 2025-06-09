<template>
    <u-form v-if="!valid" class="flex flex-col gap-3 mt-3" :schema="schema" :state="state" @submit.prevent="onSubmit">
        <u-form-group name="email">
            <form-input-username v-model="state.email"/>
        </u-form-group>
        <u-form-group name="signup" v-if="cart.email && !cart.can_login">
            <u-checkbox v-model="state.register" label="Зарегистрироваться и получить 200 баллов"/>
        </u-form-group>
        <u-form-group name="signup" v-if="!emailChanged && cart.can_login">
            <u-checkbox v-model="state.login" label="Войти и получить бонус за заказ"/>
        </u-form-group>
        <u-form-group label="Пароль" name="password"
                      v-if="state.register || willLogin">
            <form-input-password
                v-model="state.password"
                :show="showPassword"
                @toggle="showPassword = !showPassword"
            />
        </u-form-group>
        <button type="submit" class="continue-button"
                v-if="!willBeGuest">
            <span>Продолжить</span>
        </button>
        <button type="button" @click.prevent="continueAsGuest" class="continue-button"
                v-if="willBeGuest">
            <span>Продолжить как гость</span>
        </button>
    </u-form>
    <div v-else class="current-value">
        {{ cart.email }}
    </div>
</template>
<script setup lang="ts">
import {
    type InferType,
    object,
    string,
    type StringSchema
} from "yup";
import {
    emailValidation,
    passwordValidationFn
} from "~/yup";
import { useMutation } from "@urql/vue";
import {
    LoginCustomerDocument,
    RegisterCustomerDocument,
    SetCartEmailDocument
} from "~/gql/graphql";
import type { FormSubmitEvent } from "#ui/types";

defineProps<{ valid: boolean | null }>()

const emit = defineEmits(['update:valid', 'loading:update'])
const authStore = useAuthStore()

const cartStore = useCartStore()
const {cart} = storeToRefs(cartStore)
const showPassword = ref(false)

const {executeMutation: setCartEmail} = useMutation(SetCartEmailDocument)
const {executeMutation: login} = useMutation(LoginCustomerDocument)
const {executeMutation: register} = useMutation(RegisterCustomerDocument)

const state = reactive({
    email: cartStore.cart.email ?? undefined,
    register: false,
    login: false,
    password: undefined,
})

watch(() => state.email, () => {
    state.register = false
})

const emailChanged = computed(() => state.email != cart.value.email),
    willLogin = computed(() => !emailChanged.value && cart.value.can_login && state.login),
    willRegister = computed(() => !emailChanged.value && !cart.value.can_login && state.register),
    willBeGuest = computed(() => cart.value.email && !emailChanged.value && !willLogin.value && !state.register)

const schema = computed(() => object({
    email: emailValidation,
    password: string().when("email", (email, schema): StringSchema => {
        if (willLogin.value || state.register) {
            return passwordValidationFn(schema)
        }
        return schema
    }),
}))
type Schema = InferType<typeof schema.value>

function continueAsGuest() {
    emit('update:valid', true)
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
    emit('loading:update', true)
    if (cart.value.email !== event.data.email) {
        await setEmail(event.data.email)
    } else if (willLogin.value) {
        const {data} = await login({
            email: event.data.email,
            password: event.data.password ?? ''
        })
        authStore.setData(data?.loginCustomer)
    } else if (willRegister.value) {
        const {data} = await register({
            email: event.data.email,
            name: event.data.email,
            password: event.data.password ?? '',
            passwordConfirmation: event.data.password ?? ''
        })
        authStore.setData(data?.registerCustomer)
    }
    emit('loading:update', false)
}

async function setEmail(email: string) {
    const {data} = await setCartEmail({
        email: email
    })
    await cartStore.setData(data?.setCartEmail)
}
</script>