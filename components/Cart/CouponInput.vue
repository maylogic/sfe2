<template>
    <form @submit.prevent="apply" class="coupon-code-form" :class="{'has-error': !!errors.length}">
        <div class="flex items-center gap-5">
            <u-input v-model="code" size="xl" />
            <u-button variant="outline"
                      :disabled="fetching"
                      class="font-bebas-neue pt-3 leading-[24px] text-[24px] max-h-[44px] uppercase" size="xl" type="submit">
                Применить
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
import { ApplyCouponDocument, SidebarCartFragmentDoc } from '~/gql/graphql'
import { useFragment } from '~/gql'
import { useExceptionHandler } from '~/composables/useExceptionHandler'

const cartStore = useCartStore()
const { executeMutation, fetching } = useMutation(ApplyCouponDocument)
const code = ref('')

const { errors, errorHandler } = useExceptionHandler()
watch(code, () => {
    errors.value = []
})

const apply = async () => {
    if (code.value.length != 9) {
        errors.value = ['Код должен состоять из 9 символов']
        return
    }
    const { data, error } = await executeMutation({
        code: code.value,
    })
    if (data?.applyCoupon) {
        const cartData = useFragment(SidebarCartFragmentDoc, data?.applyCoupon)
        cartStore.setData(cartData)
    }
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