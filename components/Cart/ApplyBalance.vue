<template>
    <u-checkbox
        :disabled="fetching"
        v-model="applyBalance"
        @click="toggle"
        label="Использовать баллы"
    />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useMutation } from '@urql/vue'
import {
    SidebarCartFragmentDoc,
    ToggleApplyBalanceDocument,
} from '~/gql/graphql'
import { useFragment } from '~/gql'
import { useCartStore } from '~/stores/cart'

const props = defineProps<{
    data: boolean
}>()

const cartStore = useCartStore()

const { fetching, executeMutation } = useMutation(ToggleApplyBalanceDocument)
const applyBalance = ref(props.data)

const toggle = async () => {
    const { data } = await executeMutation({})
    if (data?.toggleApplyBalance) {
        const cartData = useFragment(
            SidebarCartFragmentDoc,
            data?.toggleApplyBalance
        )
        cartStore.setData(cartData)
    }
}
</script>
