<template>
    <ul>
        <li v-for="category in categories" :key="category.id">
            <span>{{ category.name }}</span>
            <CategoryList
                v-if="category.subcategories?.length"
                :categories="category.subcategories"
            />
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { Category } from '~/gql/graphql'

defineProps<{
    categories: Category[]
}>()
</script>

<style scoped>
ul {
    list-style-type: none;
    padding-left: 20px;
}

li {
    margin: 5px 0;
}
</style>
