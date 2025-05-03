<template>
    <div class="product-page" v-if="!!data?.getProductBySlug">
        <product-page-gallery @toggle-editor="editor = $event"
                              :text-lines-render-values="textLinesRenderValues"
                              :editor="editor"
                              :line-definitions="data.getProductBySlug.line_definitions ?? []"
                              :personalize-data="inputData"
                              :reverse-side-base="data.getProductBySlug.reverse_side_base"
                              :product="data.getProductBySlug"
                              :gallery="data.getProductBySlug.gallery"/>
        <div class="flex flex-col">
            <product-info :product="data.getProductBySlug"/>
            <div class="create-fields">
                <h2 class="font-iskra">Создание и предпросмотр</h2>
                <product-designs @update:design="updateDesign"
                                 :index="getBlockIndex(1)"
                                 :current-design="inputData.design"
                                 :data="data.getProductBySlug.designs" :valid="personalizeValidity.design"/>
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
                <product-text-lines v-if="inputData.design && data.getProductBySlug.line_definitions"
                                    :errors="textLineErrors"
                                    :hidden="hiddenTextLines"
                                    :values="inputData.textLines"
                                    :data="data.getProductBySlug.line_definitions" :index="getBlockIndex(4)"
                                    @hide="hideTextLine"
                                    @show="showTextLine"
                                    @update:text-line="updateTextLine"
                                    :valid="personalizeValidity.textLines"/>
                <product-sizes :index="getBlockIndex(5)"
                               :valid="personalizeValidity.size"
                               :current-size="inputData.size"
                               :key="data.getProductBySlug.key"
                               @update:size="updateSize"
                               v-if="inputData.design !== null"
                               :data="data.getProductBySlug.sizes"/>
                <product-options v-for="(option,index) in data.getProductBySlug.options"
                                 :key="data.getProductBySlug.key"
                                 :errors="optionsErrors"
                                 :index="getBlockIndex(6 + index)"
                                 v-if="inputData.design !== null"
                                 :valid="personalizeValidity.options"
                                 :values="inputData.options"
                                 @update:option="updateOption"
                                 :option="option"/>

                <labeled-price label="Итого:">
                    <block-price class="text-2xl" :key="data.getProductBySlug.key" :regular="price.regular"
                                 :is_discounted="price.is_discounted" :discounted="price.discounted"/>
                </labeled-price>

                <u-form-group
                    :error="validated && !valid ? 'Пожалуйста, исправьте некоторые ошибки выше. Они помечены красным.' : false">
                    <UButton
                        :label="addingToCart ? 'Добавляем в корзину...' : 'Создать мой адресник'"
                        :disabled="fetching||addingToCart"
                        size="sm"
                        @click="addToCart"
                        class="uppercase font-bebas-neue pt-2 max-w-max text-2xl"
                    />
                </u-form-group>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    useMutation,
    useQuery
} from '@urql/vue'
import {
    AddCartItemDocument,
    type Color,
    type DesignItemFragment,
    DesignItemFragmentDoc,
    type Font,
    PriceFragmentDoc,
    ProductBySlugDocument
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
import { useCartStore } from "~/stores/cart";
import { useFragment } from "~/gql";
import {
    generateFontFace,
    getRemoteFontPreloadLink
} from "~/utils/fonts";
import BlockPrice from "~/components/BlockPrice.vue";
import LabeledPrice from "~/components/LabeledPrice.vue";

const route = useRoute()
const productSlug = route.params.slug.toString()

const {data, error, fetching, executeQuery} = await useQuery({
    query: ProductBySlugDocument,
    variables: {slug: productSlug},
})

if (error.value) {
    console.error('GraphQL Error:', error.value)
    throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
    })
}

if (!data.value?.getProductBySlug) {
    // Если продукт не найден, выбрасываем 404 ошибку
    throw createError({statusCode: 404, statusMessage: 'Страница не найдена'})
}

const inputData = reactive<PersonalizeInputData>({
    design: null,
    color: null,
    font: null,
    textLines: new Map<PersonalizeLineDefId, string | null>(),
    size: null,
    options: new Map
})
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
const price = ref(useFragment(PriceFragmentDoc, data.value.getProductBySlug.price))
watch(data, () => {
    price.value = getFullProductPrice(data.value, inputData)
})
const validate = () => {
    personalizeValidity.design = validateDesign(data.value, inputData)
    personalizeValidity.color = validateColor(data.value, inputData)
    personalizeValidity.font = validateFont(data.value, inputData)
    personalizeValidity.textLines = validateTextLines(data.value, inputData)
    personalizeValidity.size = validateSize(data.value, inputData)
    personalizeValidity.options = validateOptions(data.value, inputData)
    textLineErrors.value = validatePerTextLine(data.value, inputData)
    optionsErrors.value = validatePerOption(data.value, inputData)
    valid.value = getKeys(personalizeValidity).every(key => personalizeValidity[key])
    validated.value = true
}
const {executeMutation: addToCartExec, fetching: addingToCart} = useMutation(AddCartItemDocument)
const cart = useCartStore()
const addToCart = () => {
    if (!data.value?.getProductBySlug) return
    validate()
    if (valid.value) {
        addToCartExec({
            productId: data.value?.getProductBySlug.id,
            quantity: 1,
            personalize: getPersonalizeInputFromData(inputData)
        }).then((result) => {
            if (result.data?.addCartItem) {
                cart.setData(result.data?.addCartItem)
                cart.open = true
            }
        })
    }
}
const availableColors = ref<Color[]>([])
const availableFonts = ref<Font[]>([])
const updateDesign = (design: DesignItemFragment | null) => {
    validated.value = false
    inputData.design = design
    editor.value = design !== null
    personalizeValidity.design = design ? validateDesign(data.value, inputData) : null
    if (!design?.colors?.find(color => color.id === inputData.color?.id)) {
        inputData.color = null
        personalizeValidity.color = null
    }
    if (!design?.fonts?.find(font => font.id === inputData.font?.id)) {
        inputData.font = null
        personalizeValidity.font = null
    }
    availableColors.value = design?.colors ? [...design?.colors] : []
    availableFonts.value = design?.fonts ? [...design?.fonts] : []
    blocksVisibility.value = getBlocksVisibility(data.value, inputData)
}
const updateColor = (color: Color | null) => {
    validated.value = false
    editor.value = true
    inputData.color = color
    personalizeValidity.color = color ? validateColor(data.value, inputData) : null
}
const updateFont = (font: Font | null) => {
    validated.value = false
    editor.value = true
    inputData.font = font
    personalizeValidity.font = font ? validateFont(data.value, inputData) : null
}
const updateTextLine = (lineId: string, value: string | null) => {
    validated.value = false
    editor.value = true
    if (!textLinesEditingStarted.value) {
        textLinesRenderValues.clear()
        textLinesEditingStarted.value = true
    }
    inputData.textLines.set(lineId, value)
    textLinesRenderValues.set(lineId, value)
    textLineErrors.value = validatePerTextLine(data.value, inputData)
    personalizeValidity.textLines = textLineErrors.value.size === 0 ? true : null
}
const updateSize = (sizeId: ProductSizeId) => {
    validated.value = false
    editor.value = true
    inputData.size = sizeId
    personalizeValidity.size = sizeId ? validateSize(data.value, inputData) : null
    price.value = getFullProductPrice(data.value, inputData)
}
const updateOption = (optionId: ProductOptionId, optionItemId: ProductOptionItemId) => {
    validated.value = false
    editor.value = true
    inputData.options.set(optionId, optionItemId)
    optionsErrors.value = validatePerOption(data.value, inputData)
    if (optionsErrors.value.size === 0) {
        personalizeValidity.options = true
    }
    price.value = getFullProductPrice(data.value, inputData)
}
const setTextLineDefaults = () => {
    data.value?.getProductBySlug?.line_definitions?.forEach(def => {
        if (def.default_value) {
            textLinesRenderValues.set(def.id, def.default_value)
        }
    })
}
const hideTextLine = (lineId: string) => {
    inputData.textLines.delete(lineId)
    textLineErrors.value.delete(lineId)
    hiddenTextLines.value.set(lineId, true)
}
const showTextLine = () => {
    for (const def of data.value?.getProductBySlug?.line_definitions || []) {
        if (hiddenTextLines.value.has(def.id)) {
            hiddenTextLines.value.delete(def.id)
            return
        }
    }
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
if (data.value.getProductBySlug) {
    const textData = new Map<PersonalizeLineDefId, string | null>(),
        hidden = new Map<PersonalizeLineDefId, boolean>()
    blocksVisibility.value = getBlocksVisibility(data.value, inputData)
    data.value?.getProductBySlug?.line_definitions?.forEach(def => {
        textData.set(def.id, null)
        if (def.hidden) {
            hidden.set(def.id, true)
        }
    })
    inputData.textLines = textData
    hiddenTextLines.value = hidden
}

const usedFonts = new Map<string, Font>()
data.value.getProductBySlug.designs.forEach(designFrag => {
    const design = useFragment(DesignItemFragmentDoc, designFrag)
    design.fonts?.forEach(font => {
        usedFonts.set(font.id, font)
    })
})
setTextLineDefaults()
useHead({
    title: data.value.getProductBySlug.meta_title,
    meta: [
        {
            name: 'description',
            content: data.value.getProductBySlug.meta_description,
        },
    ],
    link: [
        ...usedFonts.values().map(font => getRemoteFontPreloadLink(font.filename_woff2))
    ],
    style: [
        {textContent: generateFontFace([...usedFonts.values()])}
    ]
})
</script>

<style lang="scss">
.product-page {
    @apply grid grid-cols-1 max-w-full sm:grid-cols-[max-content__1fr] gap-x-10 gap-y-2;
    .create-fields {
        @apply bg-storm-dust-50 p-5 my-5 flex flex-col gap-3;
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
