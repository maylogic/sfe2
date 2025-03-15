<template>
    <ul>
        <li v-for="category in categoryObjects" :key="category.id">
            <NuxtLink
                :to="{ name: 'category-slug', params: { slug: category.slug } }"
            >
                {{ category.name }}
            </NuxtLink>
            <CategoryList
                v-if="category.subcategories?.length"
                :categories="category.subcategories"
            />
        </li>
    </ul>
</template>

<script setup lang="ts">
import { type FragmentType, useFragment } from '~/gql'
import { CategoryFieldsFragmentDoc } from '~/gql/graphql'

type CategoryData = FragmentType<typeof CategoryFieldsFragmentDoc> & {
    subcategories: CategoryData[]
}

const props = defineProps<{
    categories: Array<CategoryData>
}>()

const categoryObjects = props.categories.map((category) => ({
    ...useFragment(CategoryFieldsFragmentDoc, category),
    subcategories: category.subcategories,
}))
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
