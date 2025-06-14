<template>
    <div class="countdown-container">
        <div v-if="isMounted" class="countdown">
            <span v-if="timeLeft.days > 0">{{ timeLeft.days }} д. </span>
            <span>{{ timeLeft.hours }} ч. </span>
            <span>{{ timeLeft.minutes }} м. </span>
            <span>{{ timeLeft.seconds }} с.</span>
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

const props = defineProps<{
    endDate: string | Date
}>()

const endDate = props.endDate instanceof Date ? props.endDate : convertUtcToLocal(props.endDate)

const isMounted = ref(false)
const intervalId = ref()

const timeLeft = ref({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
})

function calculateTimeLeft() {
    const total = endDate - new Date()
    if (total <= 0) {
        clearInterval(intervalId.value)
        return {days: 0, hours: 0, minutes: 0, seconds: 0}
    }

    const seconds = Math.floor((total / 1000) % 60)
    const minutes = Math.floor((total / 1000 / 60) % 60)
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
    const days = Math.floor(total / (1000 * 60 * 60 * 24))

    return {days, hours, minutes, seconds}
}

function startTimer() {
    timeLeft.value = calculateTimeLeft()

    intervalId.value = setInterval(() => {
        timeLeft.value = calculateTimeLeft()
        if (
            timeLeft.value.days === 0 &&
            timeLeft.value.hours === 0 &&
            timeLeft.value.minutes === 0 &&
            timeLeft.value.seconds === 0
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
        @apply min-w-[150px] bg-brilliant-rose-500 rounded-md font-bold;
    }
    .countdown {
        @apply bg-brilliant-rose-500 py-1 text-center;
    }
    .placeholder {
        @apply min-h-10 rounded-md;
        animation: pulse 1.5s infinite ease-in-out;
    }
}
</style>