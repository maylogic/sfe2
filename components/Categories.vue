<template>
    <div>
        <h1>Категории</h1>
        <ul>
            <category-list :categories="data?.getCategories || []"/>
        </ul>
    </div>
</template>

<script setup>

import CategoryList from "~/components/CategoryList.vue";
import {useQuery} from "@urql/vue";
import {GetCategoriesDocument} from "~/gql/graphql.js";

const {data} = useQuery({
    query: GetCategoriesDocument
})
</script>

<style scoped>
h1 {
    font-size: 24px;
    margin-bottom: 20px;
}
</style>