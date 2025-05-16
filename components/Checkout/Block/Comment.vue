<template>
    <div class="flex flex-col gap-2 py-2 border-storm-dust-100 border-t-[1px] border-b-[1px]">
        <u-checkbox
            :modelValue="addComment"
            @click="emit('update:addComment',!addComment)"
            label="Добавить комментарий к Вашему заказу?"
        />
        <div v-if="addComment">
            <u-textarea @change="emit('update:comment', $event)" :modelValue="comment" maxlength="200"></u-textarea>
        </div>
    </div>
</template>
<script setup lang="ts">
defineProps<{ comment: string, addComment: boolean }>()
const emit = defineEmits(['update:comment', 'update:addComment'])
</script>