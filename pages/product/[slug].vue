<template>
    <div class="flex">
        {{ productSlug }}
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useFilters } from '~/composables/useFilters.js'
import CategoryFilters from '~/components/CategoryFilters.vue'
import CategoryProducts from '~/components/CategoryProducts.vue'

const route = useRoute()
const productSlug = route.params.slug.toString()

// Состояние фильтров
const { filters } = useFilters()
const refetchKey = ref(1)
const page = ref(1)

// Применение фильтров
function applyFilters() {
    refetchKey.value += 1
}
</script>

<style scoped>
/* Добавьте стили по необходимости */
</style>
