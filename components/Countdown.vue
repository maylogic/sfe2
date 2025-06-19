<template>
    <div class="countdown-container" :class="`countdown-size-${placeholderSize}`">
        <div v-if="isMounted" class="countdown">
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
        <div v-if="!isMounted" class="placeholder"></div>
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

const timeLeft = ref(calculateTimeLeft()),
    placeholderSize = ref(Object.values(timeLeft.value).filter(value => value > 0).length)
console.log(timeLeft.value, placeholderSize, Object.values(newTimeLeft).filter(value => value > 0))
watch(timeLeft, (newTimeLeft) => {
    console.log(newTimeLeft)
    placeholderSize.value = Object.values(newTimeLeft).filter(value => value > 0).length
    console.log(Object.values(newTimeLeft).filter(value => value > 0).length, Object.values(newTimeLeft).filter(value => value > 0))
})

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
        @apply min-w-[190px] bg-brilliant-rose-500 rounded-md font-bold;
    }
    &.countdown-size-1 {
        & > div {
            @apply min-w-[70px];
        }
    }
    &.countdown-size-2 {
        & > div {
            @apply min-w-[130px];
        }
    }
    .countdown {
        @apply bg-brilliant-rose-500 py-1 text-center flex items-center gap-1 justify-center;
    }
    .placeholder {
        @apply min-h-8 rounded-md;
        animation: pulse 1.5s infinite ease-in-out;
    }
}
</style>