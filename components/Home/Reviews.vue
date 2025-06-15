<template>
    <div class="homepage-reviews" v-if="data?.getHomepageReviews">
        <u-container>
            <h2 class="font-fira-sans">Отчего все виляют хвостиками?</h2>
            <div class="reviews swiper" ref="reviewsRef">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="review in data?.getHomepageReviews">
                        <home-review :data="review"/>
                    </div>
                </div>
            </div>
        </u-container>
    </div>
</template>
<script setup lang="ts">
import Swiper from "swiper";
import {
    Autoplay,
    Navigation
} from "swiper/modules";
import { useQuery } from "@urql/vue";
import { HomepageReviewsDocument } from "~/gql/graphql";

const reviewsRef = useTemplateRef('reviewsRef')
const swiper = ref()
const {data, fetching} = await useQuery({query: HomepageReviewsDocument, variables: {}})
onMounted(() => {
    if (reviewsRef.value && !swiper.value && Boolean(data.value?.getHomepageReviews?.length)) {
        swiper.value = new Swiper(reviewsRef.value, {
            modules: [Autoplay, Navigation],
            spaceBetween: 24,
            slidesPerView: 1,
            autoHeight: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                stopOnLastSlide: false
            },
            navigation: true,
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
.homepage-reviews {
    background-color: #99dff9;
    @apply py-8;

    h2 {
        @apply text-3xl font-black pb-8 text-center tracking-wide;
    }

    .swiper-slide {
        @apply h-full;
    }
}
</style>