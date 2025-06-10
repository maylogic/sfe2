<template>
    <product-link
        :class="{ 'in-viewport': isInViewport }"
        ref="gridItem"
        class="product-card" :slug="product.slug">
        <div class="product-card-content flex flex-col gap-3">
            <GalleryItem
                v-if="product.primary_image"
                :data="product.primary_image"
            />
            <h3 class="font-iskra">{{ product.name }}</h3>
            <labeled-price label="От">
                <fragment-price :data="product.price"/>
            </labeled-price>
            <div class="rose-pseudo-button font-fira-sans create-and-buy">Создать и купить</div>
        </div>
    </product-link>
</template>
<script setup lang="ts">
import {
    type FragmentType,
    useFragment
} from '~/gql'
import { ProductMiniFragmentDoc, } from '~/gql/graphql'
import FragmentPrice from '~/components/FragmentPrice.vue'
import ProductLink from '~/components/ProductLink.vue'

const props = defineProps<{
    data: FragmentType<typeof ProductMiniFragmentDoc>
}>()

const product = useFragment(ProductMiniFragmentDoc, props.data)

const isInViewport = ref(false);
const gridItem = useTemplateRef<InstanceType<typeof ProductLink>>('gridItem');

let observer: IntersectionObserver

onMounted(() => {
    if (window && window.screen.width < 1024) {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    isInViewport.value = entry.isIntersecting;
                });
            },
            {
                threshold: 1,
            }
        );

        if (gridItem.value) {
            observer.observe(gridItem.value.$el);
        }
    }
});

onUnmounted(() => {
    if (observer && gridItem.value) {
        observer.unobserve(gridItem.value.$el);
    }
});
</script>
<style lang="scss">
.product-card {
    @apply border-storm-dust-500 rounded-md p-3;

    .product-card-content {
        @apply relative;
        &:after {
            content: "";
            box-shadow: 0 .25rem .625rem 0 #0006;
            position: absolute;
            background: #fff;
            z-index: -1;
            top: -.75rem;
            bottom: -4.75rem;
            left: -.75rem;
            right: -.75rem;
            border-radius: .25rem;
            opacity: 0;
            visibility: hidden;
            transition: opacity .12s;
            will-change: opacity;
            display: block;
        }
        .create-and-buy {
            @apply invisible;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            margin-top: 1rem;
        }
    }

    &:hover, &.in-viewport {
        z-index: 1;

        .product-card-content:after {
            @apply visible opacity-100;
        }

        .create-and-buy {
            @apply visible;
        }
    }

    .price-label, .price-container {
        font-size: 18px;
    }
}
</style>