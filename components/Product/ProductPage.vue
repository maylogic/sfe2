<template>
    <div class="product-page">
        <product-page-gallery @toggle-editor="editor = $event"
                              :text-lines-render-values="textLinesRenderValues"
                              :editor="editor"
                              :line-definitions="product.line_definitions ?? []"
                              :personalize-data="inputData"
                              :product="product"
                              :gallery="product.gallery"/>
        <div class="flex flex-col">
            <product-info :product="product"/>
            <div class="create-fields">
                <h2 class="font-iskra">Создание и предпросмотр</h2>
                <product-designs @update:design="updateDesign"
                                 v-if="product.designs.length"
                                 :index="getBlockIndex(1)"
                                 :current-design="inputData.design"
                                 :data="product.designs" :valid="personalizeValidity.design"/>
                <product-colors @update:color="updateColor"
                                :key="inputData.design?.id"
                                v-if="availableColors.length"
                                :index="getBlockIndex(2)"
                                :current-color="inputData.color"
                                :data="availableColors" :valid="personalizeValidity.color"/>
                <product-fonts @update:font="updateFont"
                               v-if="availableFonts.length"
                               :key="inputData.design?.id"
                               :index="getBlockIndex(3)"
                               :current-font="inputData.font"
                               :data="availableFonts" :valid="personalizeValidity.font"/>
                <product-text-lines v-if="inputData.design && product.line_definitions"
                                    :errors="textLineErrors"
                                    :hidden="hiddenTextLines"
                                    :values="inputData.textLines"
                                    :data="product.line_definitions" :index="getBlockIndex(4)"
                                    @hide="hideTextLine"
                                    @show="showTextLine"
                                    @update:text-line="updateTextLine"
                                    :valid="personalizeValidity.textLines"/>
                <product-sizes :index="getBlockIndex(5)"
                               :valid="personalizeValidity.size"
                               :current-size="inputData.size"
                               :key="product.key"
                               @update:size="updateSize"
                               v-if="inputData.design !== null && !!product.sizes?.length"
                               :data="product.sizes"/>
                <product-options v-for="(option,index) in product.options"
                                 :key="product.key"
                                 :errors="optionsErrors"
                                 :index="getBlockIndex(6 + index)"
                                 v-if="inputData.design !== null"
                                 :valid="personalizeValidity.options"
                                 :values="inputData.options"
                                 @update:option="updateOption"
                                 :option="option"/>

                <labeled-price label="Итого:">
                    <block-price class="text-2xl" :key="product.key" :regular="price.regular"
                                 :is_discounted="price.is_discounted" :discounted="price.discounted"/>
                </labeled-price>

                <u-form-group
                    :error="validated && !valid ? 'Пожалуйста, исправьте некоторые ошибки выше. Они помечены красным.' : false">
                    <UButton
                        :label="addingToCart ? 'Добавляем в корзину' : addToCartLabel"
                        :disabled="fetching||addingToCart"
                        size="sm"
                        @click="addToCartInternal"
                        class="uppercase font-fira-sans dark:text-white w-full flex items-center justify-center tracking-wide font-bold text-xl h-14"
                    />
                </u-form-group>
                <font-preload-block :font="font" v-for="font in usedFonts.values()"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    type Color,
    type DesignItemFragment,
    DesignItemFragmentDoc,
    GalleryItemFragmentDoc,
    type PersonalizeInput,
    PriceFragmentDoc,
    type ProductPageFragment
} from '~/gql/graphql.js'
import {
    getBlocksVisibility,
    getFullProductPrice,
    getNullValidation,
    getPersonalizeInputFromData,
    type InputTextLinesMap,
    type PersonalizeInputData,
    type PersonalizeLineDefId,
    type PersonalizeValidity,
    validateColor,
    validateDesign,
    validateFont,
    validateOptions,
    validatePerOption,
    validatePerTextLine,
    validateSize,
    validateTextLines
} from "~/utils/product";
import { getKeys } from "~/utils/type"
import { useFragment } from "~/gql";
import {
    generateFontFace,
    getRemoteFontPreloadLink
} from "~/utils/fonts";
import FontPreloadBlock from "~/components/Product/FontPreloadBlock.vue";
import type { FrontendFont } from "~/data/types";
import { onClientMounted } from "~/composables/onClientMounted";
import {
    getAddToCartItemToTrack,
    getViewItemToTrack
} from "~/utils/tracking";
import { getDiscountedOrRegularPrice } from "~/utils/price";
import { getStorageUrl } from "~/constants/storage";
import type { ResolvableMeta } from "@unhead/vue/types";
import { getProductLink } from "~/utils/seo";

const props = defineProps<{
    product: ProductPageFragment,
    inputData: PersonalizeInputData,
    initData?: PersonalizeInputData,
    addToCart: (productId: string, personalize: PersonalizeInput) => Promise<void>,
    fetching: boolean,
    addingToCart: boolean,
    addToCartLabel: string
}>()
const {$gtm} = useNuxtApp()
const product = computed(() => props.product)
const textLinesRenderValues = reactive<InputTextLinesMap>(new Map)
const textLineErrors = ref(new Map<PersonalizeLineDefId, string>())
const optionsErrors = ref(new Map<ProductOptionId, string>())
const hiddenTextLines = ref(new Map<PersonalizeLineDefId, boolean>())
const textLinesEditingStarted = ref(false)
const valid = ref(false)
const editor = ref(false)
const validated = ref(false)
const personalizeValidity = reactive<PersonalizeValidity>(getNullValidation())
const blocksVisibility = ref<Map<number, boolean>>(new Map)
const price = ref(useFragment(PriceFragmentDoc, product.value.price))

onClientMounted(() => {
    $gtm.sendEcommerceEvent('view_item', {
        ecommerce: {
            items: [
                getViewItemToTrack(product.value, price.value)
            ]
        }
    })
})
watch(product, () => {
    price.value = getFullProductPrice(product.value, props.inputData)
})
const validate = () => {
    personalizeValidity.design = validateDesign(product.value, props.inputData)
    personalizeValidity.color = validateColor(product.value, props.inputData)
    personalizeValidity.font = validateFont(product.value, props.inputData)
    personalizeValidity.textLines = validateTextLines(product.value, props.inputData)
    personalizeValidity.size = validateSize(product.value, props.inputData)
    personalizeValidity.options = validateOptions(product.value, props.inputData)
    textLineErrors.value = validatePerTextLine(product.value, props.inputData)
    optionsErrors.value = validatePerOption(product.value, props.inputData)
    valid.value = getKeys(personalizeValidity).every(key => personalizeValidity[key])
    validated.value = true
}
const availableColors = ref<Color[]>([])
const availableFonts = ref<FrontendFont[]>([])
const addToCartInternal = () => {
    validate()
    if (valid.value) {
        props.addToCart(product.value.id, getPersonalizeInputFromData(props.inputData)).then(() => {

            $gtm.sendEcommerceEvent('add_to_cart', {
                ecommerce: {
                    items: [
                        getAddToCartItemToTrack(props.inputData, product.value, price.value)
                    ]
                }
            })
        })
    }
}
const updateDesign = (design: DesignItemFragment | null) => {
    validated.value = false
    props.inputData.design = design
    editor.value = design !== null
    personalizeValidity.design = design ? validateDesign(product.value, props.inputData) : null
    if (!design?.colors?.find(color => color.id === props.inputData.color?.id)) {
        props.inputData.color = null
        personalizeValidity.color = null
    }
    if (!design?.fonts?.find(font => font.id === props.inputData.font?.id)) {
        props.inputData.font = null
        personalizeValidity.font = null
    }
    availableColors.value = design?.colors ? [...design?.colors] : []
    availableFonts.value = design?.fonts ? [...design?.fonts] : []
    blocksVisibility.value = getBlocksVisibility(product.value, props.inputData)
}
const updateColor = (color: Color | null) => {
    validated.value = false
    editor.value = true
    props.inputData.color = color
    personalizeValidity.color = color ? validateColor(product.value, props.inputData) : null
}
const updateFont = (font: FrontendFont | null) => {
    validated.value = false
    editor.value = true
    props.inputData.font = font
    personalizeValidity.font = font ? validateFont(product.value, props.inputData) : null
}
const updateTextLine = (lineId: string, value: string | null) => {
    validated.value = false
    editor.value = true
    if (!textLinesEditingStarted.value) {
        textLinesRenderValues.clear()
        textLinesEditingStarted.value = true
    }
    props.inputData.textLines.set(lineId, value)
    textLinesRenderValues.set(lineId, value)
    textLineErrors.value = validatePerTextLine(product.value, props.inputData)
    personalizeValidity.textLines = textLineErrors.value.size === 0 ? true : null
}
const updateSize = (sizeId: ProductSizeId) => {
    validated.value = false
    editor.value = true
    props.inputData.size = sizeId
    personalizeValidity.size = sizeId ? validateSize(product.value, props.inputData) : null
    price.value = getFullProductPrice(product.value, props.inputData)
}
const updateOption = (optionId: ProductOptionId, optionItemId: ProductOptionItemId) => {
    validated.value = false
    editor.value = true
    props.inputData.options.set(optionId, optionItemId)
    optionsErrors.value = validatePerOption(product.value, props.inputData)
    if (optionsErrors.value.size === 0) {
        personalizeValidity.options = true
    }
    price.value = getFullProductPrice(product.value, props.inputData)
}
const setTextLineDefaults = () => {
    const textData = new Map<PersonalizeLineDefId, string | null>(),
        hidden = new Map<PersonalizeLineDefId, boolean>()
    product.value.line_definitions?.forEach(def => {
        if (def.default_value) {
            textLinesRenderValues.set(def.id, def.default_value)
        }
        textData.set(def.id, null)
        if (def.hidden) {
            hidden.set(def.id, true)
        }
    })
    props.inputData.textLines = textData
    hiddenTextLines.value = hidden
}
const hideTextLine = (lineId: string) => {
    props.inputData.textLines.delete(lineId)
    textLineErrors.value.delete(lineId)
    textLinesRenderValues.delete(lineId)
    hiddenTextLines.value.set(lineId, true)
}
const showTextLine = () => {
    for (const def of product.value.line_definitions || []) {
        if (hiddenTextLines.value.has(def.id)) {
            hiddenTextLines.value.delete(def.id)
            return
        }
    }
}
const showTextLineDefId = (id: PersonalizeLineDefId) => {
    const def = product.value.line_definitions?.find(def => def.id === id)
    if (def) hiddenTextLines.value.delete(def.id)
}

const getBlockIndex = (id: number) => {
    let count = 0;
    for (let i = 1; i <= id; i++) {
        if (blocksVisibility.value.get(i)) {
            count++;
        }
    }
    return count;
}

blocksVisibility.value = getBlocksVisibility(product.value, props.inputData)

const usedFonts = new Map<string, FrontendFont>()
product.value.designs.forEach(designFrag => {
    const design = useFragment(DesignItemFragmentDoc, designFrag)
    design.fonts?.forEach(font => {
        usedFonts.set(font.id, font)
    })
})
setTextLineDefaults()
const primaryImage = useFragment(GalleryItemFragmentDoc, product.value.primary_image)
const meta: ResolvableMeta[] = [
    {property: "og:title", content: `${product.value.meta_title}`},
    {property: "og:description", content: `${product.value.meta_description}`},
    {property: "og:type", content: `product`},
    {property: "og:url", content: getProductLink(product.value.slug)},
    {property: "product:brand", content: `Safepets`},
    {property: "product:availability", content: `in stock`},
    {property: "product:price:amount", content: getDiscountedOrRegularPrice(price.value)},
    {property: "product:price:currency", content: `RUB`},
]
if (primaryImage) {
    meta.push({
        property: "og:image", content: getStorageUrl(primaryImage.filename)
    })
}
useHead({
    link: [
        ...[...usedFonts.values()].map(font => getRemoteFontPreloadLink(font))
    ],
    style: [
        {textContent: generateFontFace([...usedFonts.values()])}
    ],
    meta,
    script: [
        {
            innerHTML: JSON.stringify({
                '@context': 'http://schema.org',
                '@type': 'Product',
                name: product.value.name,
                description: product.value.meta_description,
                sku: product.value.sku,
                url: getProductLink(product.value.slug),
                image: primaryImage ? getStorageUrl(primaryImage.filename) : undefined,
                offers: {
                    '@type': 'Offer',
                    priceCurrency: 'RUB',
                    price: getDiscountedOrRegularPrice(price.value),
                    availability: 'http://schema.org/InStock'
                }
            }),
            type: 'application/ld+json'
        }
    ],
})
if (props.initData) {
    if (props.initData.design) updateDesign(props.initData.design)
    if (props.initData.color) updateColor(props.initData.color)
    if (props.initData.font) updateFont(props.initData.font)
    if (props.initData.textLines) {
        for (const [id, value] of props.initData.textLines) {
            updateTextLine(id, value)
            if (value) showTextLineDefId(id)
        }
    }
    if (props.initData.options) {
        for (const [id, value] of props.initData.options) {
            updateOption(id, value)
        }
    }
    if (props.initData.size) updateSize(props.initData.size)
}
</script>

<style lang="scss">
.product-page {
    @apply grid grid-cols-1 max-w-full sm:grid-cols-[max-content__1fr] gap-x-10 gap-y-2;
    .create-fields {
        @apply bg-storm-dust-50 dark:bg-storm-dust-950 p-5 my-5 flex flex-col gap-3;
        h2 {
            @apply text-2xl text-center;
        }
    }

    .product-info {
        h1 {
            font-size: 32px;
        }
    }
}
</style>
