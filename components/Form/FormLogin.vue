<template>
    <UForm @submit="onSubmit" :schema="schema" :state="state" class="space-y-4">
        <UFormGroup
            label="Email"
            name="email"
        >
            <UInput autocomplete="username" v-model="state.email" placeholder="you@example.com" icon="i-heroicons-envelope" />
        </UFormGroup>
        <UFormGroup
            label="Пароль"
            name="password"
        >
            <UInput autocomplete="current-password" v-model="state.password" type="password" icon="i-heroicons-lock-closed" />
        </UFormGroup>
        <UButton type="submit">
            Войти
        </UButton>
    </UForm>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'

const schema = object({
    email: string().email('Invalid email').required('Required'),
    password: string()
        .min(8, 'Must be at least 8 characters')
        .required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive({
    email: undefined,
    password: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    // Do something with event.data
    console.log(event.data)
}
</script>