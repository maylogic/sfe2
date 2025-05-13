<template>
    <form @submit.prevent="apply" class="coupon-code-form" :class="{'has-error': !!errors.length}">
        <div class="flex items-center gap-5">
            <u-input placeholder="Промокод или ваучер" v-model="code" size="xl"/>
            <u-button variant="outline"
                      :disabled="fetching"
                      class="font-fira-sans text-xl tracking-wide font-normal max-h-[42px] uppercase" size="xl"
                      type="submit">
                Добавить
            </u-button>
        </div>
        <span v-if="errors.length" class="text-red-500 text-sm font-fira-sans">
            {{ errors[0] }}
        </span>
    </form>
</template>
<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useMutation } from '@urql/vue'
import { ApplyCouponDocument } from '~/gql/graphql'
import { useExceptionHandler } from '~/composables/useExceptionHandler'

const cartStore = useCartStore()
const {executeMutation, fetching} = useMutation(ApplyCouponDocument)
const code = ref('')

const {errors, errorHandler} = useExceptionHandler()
watch(code, () => {
    errors.value = []
})

const apply = async () => {
    if (code.value.length != 9) {
        errors.value = ['Код должен состоять из 9 символов']
        return
    }
    cartStore.loading = true
    const {data, error} = await executeMutation({
        code: code.value,
    })
    cartStore.setData(data?.applyCoupon)
    if (error) {
        errorHandler(error)
    }
}
</script>
<style>
.coupon-code-form {
    @apply pb-6;

    &.has-error {
        @apply pb-0;
    }
}
</style>