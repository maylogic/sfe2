<template>
    <div class="top-banner font-fira-sans" v-if="data?.getTopBanner">
        {{ data.getTopBanner.sales_rule.label }}
        <client-only>
            <countdown :end-date="data.getTopBanner.sales_rule.ends_at"/>
        </client-only>
    </div>
</template>
<script setup lang="ts">
import { useQuery } from "@urql/vue";
import { TopBannerDocument } from "~/gql/graphql";

const {data} = await useQuery({
    query: TopBannerDocument,
    variables: {}
})
</script>
<style lang="scss">
.top-banner {
    @apply bg-black text-white;
    @apply flex items-center justify-center;
    @apply flex-col md:flex-row md:gap-2 gap-1;
    @apply pt-1 pb-2 md:py-1;
}
</style>