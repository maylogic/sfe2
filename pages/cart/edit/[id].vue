<template>
    <ClientOnly>
        <Suspense>
            <page-cart-item-edit :id="id"/>
            <template #fallback>
                <div class="flex flex-col gap-2 p-5 mx-auto w-[200px] h-full">
                    <span class="font-fira-sans">Загрузка...</span>
                    <u-progress/>
                </div>
            </template>
        </Suspense>
    </ClientOnly>
</template>

<script setup lang="ts">

const route = useRoute()
const id = route.params.id.toString()

</script>
