// plugins/gtm.client.ts
export default defineNuxtPlugin((nuxtApp) => {
    window.dataLayer = window.dataLayer || []

    function sendEvent(event: string, payload: Record<string, any> = {}) {
        window.dataLayer.push({
            event,
            ...payload
        })
    }

    nuxtApp.provide('gtm', {
        sendEvent,
        sendEcommerceEvent: (eventType: string, payload: Record<string, any>) => sendEvent(`ecommerce_${eventType}`, payload)
    })
})

declare module '#app' {
    interface NuxtApp {
        $gtm: {
            sendEvent: (event: string, payload?: Record<string, any>) => void;
            sendEcommerceEvent: (eventType: string, payload?: Record<string, any>) => void;
        };
    }
}