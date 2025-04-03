<template>
    <form @submit.prevent="apply">
        <div class="flex items-center gap-5">
            <u-input v-model="code" size="xl" />
            <u-button variant="outline" size="xl" type="submit">Применить</u-button>
        </div>
        <span v-if="errors.length" class="text-red-500">
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
const { executeMutation } = useMutation(ApplyCouponDocument)
const code = ref('')

const { errors, errorHandler } = useExceptionHandler()
watch(code, () => {
    errors.value = []
})

const apply = async () => {
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
