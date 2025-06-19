<template>
    <div class="countdown-container">
        <div class="countdown">
            <span v-if="timeLeft.days > 0">
                {{ timeLeft.days }} {{ num_word(timeLeft.days, ['день', 'дня', 'дней']) }}
            </span>
            <span v-if="timeLeft.hours > 0">
                {{ timeLeft.hours }} {{ num_word(timeLeft.hours, ['час', 'часа', 'часов']) }}
            </span>
            <span v-if="timeLeft.minutes > 0">
                {{ timeLeft.minutes }} {{ num_word(timeLeft.minutes, ['минута', 'минуты', 'минут']) }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    onMounted,
    onUnmounted,
    ref
} from 'vue'
import { num_word } from "~/utils/misc";

const props = defineProps<{
    endDate: string | Date
}>()

const endDate = props.endDate instanceof Date ? props.endDate : convertUtcToLocal(props.endDate)

const isMounted = ref(false)
const intervalId = ref()

const timeLeft = ref(calculateTimeLeft())

function calculateTimeLeft() {
    const total = endDate.getTime() - Date.now()
    if (total <= 0) {
        clearInterval(intervalId.value)
        return {days: 0, hours: 0, minutes: 0}
    }

    const minutes = Math.floor((total / 1000 / 60) % 60)
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
    const days = Math.floor(total / (1000 * 60 * 60 * 24))

    return {days, hours, minutes}
}

function startTimer() {
    timeLeft.value = calculateTimeLeft()

    intervalId.value = setInterval(() => {
        timeLeft.value = calculateTimeLeft()
        if (
            timeLeft.value.days === 0 &&
            timeLeft.value.hours === 0 &&
            timeLeft.value.minutes === 0
        ) {
            clearInterval(intervalId.value)
        }
    }, 1000)
}

onMounted(() => {
    startTimer()
    isMounted.value = true
})

onUnmounted(() => {
    if (intervalId.value) {
        clearInterval(intervalId.value)
    }
})
</script>

<style scoped>
.countdown-container {
    & > div {
        @apply bg-brilliant-rose-500 rounded-md font-bold;
    }
    .countdown {
        @apply bg-brilliant-rose-500 py-1 text-center flex items-center gap-1 justify-center;
        @apply w-max px-2;
    }
}
</style>