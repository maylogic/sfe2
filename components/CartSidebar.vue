<template>корзина</template>
<script setup lang="ts">
import { useQuery } from '@urql/vue'
import { CurrentAuthenticatedUserDocument } from '~/gql/graphql'
import { computed } from 'vue'

const { data } = await useQuery({
    query: CurrentAuthenticatedUserDocument,
    variables: {},
})
const customer = computed(() => data.value?.me)
console.log(customer.value)
</script>
