<template>
    <div class="production-info">
        <u-container>
            <div class="swiper font-fira-sans" ref="bannerRef">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        Сделано в России
                    </div>
                    <div class="swiper-slide cursor-pointer" @click="modalStore.productionTime=true">
                        Изготовим за 1-3 дня*
                    </div>
                    <div class="swiper-slide">
                        Бесплатная доставка от 5000 ₽
                    </div>
                </div>
            </div>
        </u-container>
    </div>
</template>
<script setup lang="ts">
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import { useModalStore } from "~/stores/modal.js";

const bannerRef = useTemplateRef('bannerRef')
const modalStore = useModalStore()
const swiper = ref()
onMounted(() => {
    if (bannerRef.value && !swiper.value) {
        swiper.value = new Swiper(bannerRef.value, {
            modules: [Autoplay],
            spaceBetween: 0,
            slidesPerView: 1,
            autoplay: {
                delay: 1500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                stopOnLastSlide: false
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                }
            }
        });
    }
})
</script>
<style lang="scss">
.production-info {
    @apply border-t-[1px] border-storm-dust-100;
    .swiper-slide {
        @apply text-center py-2 tracking-wide text-storm-dust-800 relative text-sm;
        &:not(:last-child):after {
            @apply bg-storm-dust-100 absolute right-0 top-1/2 -translate-y-1/2 hidden md:block;
            content: '';
            height: 20px;
            width: 1px;
        }
    }
}
</style>