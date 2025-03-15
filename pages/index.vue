<template>
    <Suspense>
        <template #default>
            <categories />
        </template>
        <template #fallback> Loading...</template>
    </Suspense>
</template>
<script setup lang="ts"></script>
