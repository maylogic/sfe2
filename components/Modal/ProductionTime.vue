<template>
    <modal-closable v-model="modalStore.productionTime">
        <template #header>
            Условия производства
        </template>
        <div class="flex flex-col gap-2">
            <p>Мастерская работает в будние дни согласно производственному календарю.</p>
            <p>При заказе в выходные или праздничные дни отсчет начинается с ближайшего будущего рабочего дня.</p>
        </div>
    </modal-closable>
</template>
<script setup lang="ts">
import { useModalStore } from "~/stores/modal";

const modalStore = useModalStore()
</script>