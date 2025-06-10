<template>
    <div class="production-info swiper" ref="bannerRef">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                Сделано в России
            </div>
            <div class="swiper-slide">
                Изготовим за 1-3 дня
            </div>
            <div class="swiper-slide">
                Бесплатная доставка от 5000 ₽
            </div>
        </div>
    </div>
</template>
<script setup>
import Swiper from "swiper";
import {Autoplay} from "swiper/modules";

const bannerRef = useTemplateRef('bannerRef')
onMounted(() => {
    if (bannerRef.value) {
        console.log('init swiper')
        const swiper = new Swiper(bannerRef.value, {
            modules: [Autoplay],
            autoplay: {
                delay: 1500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                stopOnLastSlide: false
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                }
            }
        });
    }
})
</script>
<style lang="scss">
.production-info {
    @apply mb-5;
    .swiper-slide {
        @apply text-center border-[1px] py-2;
    }
}
</style>