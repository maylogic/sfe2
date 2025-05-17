<template>
    <div class="flex flex-col gap-1" v-if="address">
        <div class="flex flex-col gap-1">
            <span>{{ address.first_name }} {{ address.last_name }}</span>
            <div>{{ address.phone_number }}</div>
            <div class="flex items-start gap-1 flex-wrap">
                <div>{{ address.country }},</div>
                <div>{{ address.state }},</div>
                <div>{{ address.city }}</div>
            </div>
            <div>{{ address.address1 }}</div>
            <div v-if="address.address2">{{ address.address2 }}</div>
            <div>{{ address.postal_code }}</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { CustomerAddressFragment } from "~/gql/graphql";

defineProps<{
    address: CustomerAddressFragment | null | undefined
}>()
</script>