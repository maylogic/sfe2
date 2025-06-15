<template>
    <div class="homepage-review">
        <rating :rating="review.rating"/>
        <h3 class="font-fira-sans">{{ review.title }}</h3>
        <span>{{ formatDate(date) }}</span>
        <p>{{ review.text }}</p>
        <span>{{ review.name }} оставил(а) отзыв об</span>
        <product-link :slug="review.product.slug">{{ review.product.name }}</product-link>
    </div>
</template>
<script setup lang="ts">
import {
    type FragmentType,
    useFragment
} from "~/gql";
import { ReviewFragmentDoc } from "~/gql/graphql";
import { formatDate } from "~/utils/date";

const props = defineProps<{
    data: FragmentType<typeof ReviewFragmentDoc>
}>()
const review = computed(() => useFragment(ReviewFragmentDoc, props.data))
const date = computed(() => new Date(review.value.created_at))

</script>
<style lang="scss">
.homepage-review {
    @apply flex flex-col items-center text-center h-full;
    @apply bg-white py-8 px-6;
    h3 {
        @apply font-black uppercase my-1 tracking-wide;
    }
    span {
        @apply text-sm text-storm-dust-300;
    }
    p {
        @apply py-2;
    }
    a {
        @apply text-brilliant-rose-500 font-bold;
    }
}
</style>