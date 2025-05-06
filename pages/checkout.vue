<template>
    <client-only>
        <suspense>
            <page-checkout/>
            <template #fallback>
                <div class="flex flex-col gap-2 p-5 mx-auto w-[200px] h-full">
                    <span class="font-fira-sans">Загрузка...</span>
                    <u-progress/>
                </div>
            </template>
        </suspense>
    </client-only>
</template>
<script setup lang="ts">
import { definePageMeta } from "#imports";

definePageMeta({
    layout: 'checkout'
})
</script>