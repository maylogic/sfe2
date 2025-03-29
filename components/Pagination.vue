<template>
    <div v-if="showPagination" class="pagination">
        <u-pagination
            v-model="currentPage"
            :total="pagination.total"
            :page-size="pagination.perPage"
            @change="handlePageChange"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { type FragmentType, useFragment } from '~/gql'
import { PaginationFragmentDoc } from '~/gql/graphql'

// Принимаем данные пагинации через props
const props = defineProps<{
    data: FragmentType<typeof PaginationFragmentDoc>
}>()

const pagination = useFragment(PaginationFragmentDoc, props.data)

const emit = defineEmits(['update:page'])

// Текущая страница (локальное состояние)
const currentPage = ref(pagination.currentPage)

// Флаг для отображения пагинации
const showPagination = computed(() => pagination.lastPage > 1)

// Обработчик изменения страницы
const handlePageChange = (newPage: number) => {
    currentPage.value = newPage
    emit('update:page', newPage) // Передаем новую страницу родителю
}
</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
}
</style>
