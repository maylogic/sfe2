<template>
    <div class="rating">
        <svg v-for="index in rating" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 20">
            <path fill="#FACD24" fill-rule="evenodd"
                  d="m11 17.173-5.373 2.683c-.643.321-1.439.086-1.777-.524a1.2 1.2 0 0 1-.132-.793l1.026-5.684L.397 8.829a1.207 1.207 0 0 1-.024-1.767c.202-.197.467-.325.753-.364l6.008-.83L9.82.697c.322-.619 1.11-.873 1.762-.568.26.122.47.321.598.568l2.686 5.171 6.007.83c.72.099 1.218.733 1.113 1.416a1.22 1.22 0 0 1-.383.715l-4.347 4.026 1.026 5.684c.123.68-.358 1.326-1.074 1.443a1.4 1.4 0 0 1-.835-.126z"></path>
        </svg>
    </div>
</template>
<script setup lang="ts">
defineProps<{
    rating: number
}>()
</script>
<style lang="scss">
.rating {
    @apply flex items-center gap-1;
    svg {
        @apply w-4 h-4;
    }
}
</style>