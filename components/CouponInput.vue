<template>
    <u-form-group>
        <u-input v-model="code" />
        <u-button @click="apply">Применить</u-button>
    </u-form-group>
</template>
<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useMutation } from '@urql/vue'
import { ApplyCouponDocument, SidebarCartFragmentDoc } from '~/gql/graphql'
import { useFragment } from '~/gql'

const cartStore = useCartStore()
const { executeMutation } = useMutation(ApplyCouponDocument)
const code = ref('')

const apply = async () => {
    const { data } = await executeMutation({
        code: code.value,
    })
    if (data?.applyCoupon) {
        const cartData = useFragment(SidebarCartFragmentDoc, data?.applyCoupon)
        cartStore.setData(cartData)
        console.log(cartStore.cart, cartData, data)
    }
}
</script>
