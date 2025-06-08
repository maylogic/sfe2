export function onClientMounted(callback: () => void) {
    onMounted(() => {
        if (import.meta.client) {
            callback()
        }
    })
}